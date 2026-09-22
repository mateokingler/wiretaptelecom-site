/**
 * Compiles every OpenAPI document in public/api into a typed module under
 * src/content/api, so the reference pages read plain data with no YAML parser
 * or filesystem access at runtime.
 *
 * Runs automatically before `npm run build`; run it by hand after editing a
 * spec:
 *
 *   npm run generate:api
 *
 * Anything the pages do not render is dropped here, and anything malformed
 * throws, so a broken spec fails the build instead of rendering an empty
 * table.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { parse } from "yaml";

const SPEC_DIR = "public/api";
const OUT_DIR = "src/content/api";

const METHODS = ["get", "post", "put", "patch", "delete"];
const SCALARS = ["string", "boolean", "number", "integer"];

function fail(message) {
  throw new Error(message);
}

/**
 * Resolves a local `$ref` against the document. Remote refs are refused
 * outright: the download link hands customers a single self-contained file,
 * and a remote pointer would break that.
 */
function deref(node, document, seen) {
  if (!node || typeof node !== "object" || !node.$ref) return node;

  const pointer = node.$ref;
  if (!pointer.startsWith("#/")) fail(`Only local $refs are supported, found ${pointer}`);
  if (seen.has(pointer)) fail(`Circular $ref at ${pointer}`);

  let target = document;
  for (const segment of pointer.slice(2).split("/")) {
    target = target?.[segment];
    if (target === undefined) fail(`$ref ${pointer} does not resolve`);
  }

  return deref(target, document, new Set([...seen, pointer]));
}

function toSchema(raw, document, seen = new Set()) {
  const node = deref(raw, document, seen);
  if (!node) fail("Expected a schema, found nothing");

  const type = node.type;
  if (!type) fail(`Schema is missing a type: ${JSON.stringify(node).slice(0, 120)}`);

  const schema = { type };
  if (node.description) schema.description = node.description.trim();
  if (node.example !== undefined) schema.example = node.example;

  if (type === "object") {
    const required = new Set(node.required ?? []);
    schema.properties = Object.entries(node.properties ?? {}).map(([name, value]) => ({
      name,
      required: required.has(name),
      schema: toSchema(value, document, seen),
    }));
    for (const name of required) {
      if (!node.properties?.[name]) fail(`Required property "${name}" is not declared`);
    }
  } else if (type === "array") {
    if (!node.items) fail("Array schema is missing items");
    schema.items = toSchema(node.items, document, seen);
  } else if (!SCALARS.includes(type)) {
    fail(`Unsupported schema type "${type}"`);
  }

  return schema;
}

/** `SendSMS` becomes `send-sms`, `inboundMessage` becomes `inbound-message`. */
function slugify(operationId) {
  return operationId
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function jsonBody(container, document) {
  const schema = container?.content?.["application/json"]?.schema;
  return schema ? toSchema(schema, document) : undefined;
}

function toOperation(kind, path, method, raw, document) {
  if (!raw.operationId) fail(`${path} ${method} is missing an operationId`);
  if (!raw.summary) fail(`${raw.operationId} is missing a summary`);

  const operation = {
    id: raw.operationId,
    slug: slugify(raw.operationId),
    kind,
    method,
    path: kind === "webhook" ? "" : path,
    summary: raw.summary,
    description: (raw.description ?? "").trim(),
    responses: Object.entries(raw.responses ?? {}).map(([status, response]) => {
      const schema = jsonBody(response, document);
      return {
        status,
        description: (response.description ?? "").trim(),
        ...(schema ? { schema } : {}),
      };
    }),
  };

  const requestSchema = jsonBody(raw.requestBody, document);
  if (requestSchema) {
    operation.requestBody = {
      description: (raw.requestBody.description ?? "").trim(),
      required: raw.requestBody.required === true,
      schema: requestSchema,
    };
  }

  // Credentials are declared once at the document level. A per-operation
  // override would silently not render, so say so rather than lose it.
  if (raw.security) fail(`${raw.operationId} overrides security, which is not supported`);
  if (raw.parameters?.length) {
    fail(`${raw.operationId} declares parameters, which are not supported yet`);
  }

  return operation;
}

function collect(source, document, kind) {
  return Object.entries(source ?? {}).flatMap(([key, item]) =>
    Object.entries(item)
      .filter(([method]) => METHODS.includes(method))
      .map(([method, raw]) => toOperation(kind, key, method, raw, document))
  );
}

function toSecurity(document) {
  const requirements = document.security ?? [];
  if (requirements.length !== 1) {
    fail("Expected exactly one security requirement object listing every scheme");
  }

  return Object.keys(requirements[0]).map((id) => {
    const scheme = document.components?.securitySchemes?.[id];
    if (!scheme) fail(`Security scheme "${id}" is not declared`);

    if (scheme.type === "http" && scheme.scheme === "bearer") {
      return { id, kind: "bearer", name: "Authorization", description: text(scheme.description) };
    }
    if (scheme.type === "apiKey" && scheme.in === "query") {
      return { id, kind: "query", name: scheme.name, description: text(scheme.description) };
    }
    fail(`Security scheme "${id}" is not a bearer token or a query parameter`);
  });
}

function text(value) {
  return (value ?? "").trim();
}

function compile(file) {
  const specPath = `/api/${file}`;
  const document = parse(readFileSync(join(SPEC_DIR, file), "utf8"));

  const server = document.servers?.[0]?.url;
  if (!server) fail(`${file} declares no server`);
  if (document.servers.length > 1) fail(`${file} declares more than one server`);

  return {
    title: document.info.title,
    summary: text(document.info.summary),
    description: text(document.info.description),
    version: document.info.version,
    baseUrl: server.replace(/\/$/, ""),
    security: toSecurity(document),
    operations: collect(document.paths, document, "operation"),
    webhooks: collect(document.webhooks, document, "webhook"),
    specPath,
  };
}

const specs = readdirSync(SPEC_DIR).filter((file) => file.endsWith(".yaml"));
if (specs.length === 0) fail(`No .yaml specs found in ${SPEC_DIR}`);

for (const file of specs) {
  const name = basename(file, ".yaml");
  const spec = compile(file);

  const out = `/**
 * Generated by scripts/generate-openapi.mjs from ${SPEC_DIR}/${file}.
 * Do not edit: change the spec and run \`npm run generate:api\`.
 */
import type { ApiSpec } from "@/lib/openapi";

export const spec: ApiSpec = ${JSON.stringify(spec, null, 2)};
`;

  writeFileSync(join(OUT_DIR, `${name}.generated.ts`), out, "utf8");
  const count = spec.operations.length + spec.webhooks.length;
  console.log(`${file} -> ${OUT_DIR}/${name}.generated.ts (${count} operations)`);
}
