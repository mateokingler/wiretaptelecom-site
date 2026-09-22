/**
 * The shape the reference pages read from, and the helpers that turn a schema
 * into something renderable.
 *
 * This is deliberately a narrow subset of OpenAPI rather than the whole spec:
 * scripts/generate-openapi.mjs resolves every `$ref`, drops what we do not
 * render, and emits modules typed as `ApiSpec`. A spec that grows a feature
 * this type does not cover will fail the build rather than render half of it.
 */

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type SchemaType = "object" | "array" | "string" | "boolean" | "number" | "integer";

export type Schema = {
  type: SchemaType;
  description?: string;
  example?: JsonValue;
  /** Present when `type` is `object`, in the order the spec declares them. */
  properties?: SchemaProperty[];
  /** Present when `type` is `array`. */
  items?: Schema;
};

export type SchemaProperty = {
  name: string;
  required: boolean;
  schema: Schema;
};

/**
 * Both of ours are required together, so this carries no "optional" flag. The
 * `name` is the query parameter for `query` schemes and unused for `bearer`.
 */
export type SecurityScheme = {
  id: string;
  kind: "bearer" | "query";
  name: string;
  description: string;
};

export type ApiResponse = {
  status: string;
  description: string;
  schema?: Schema;
};

export type Operation = {
  /** The spec's operationId, used as the allowlist key by the try-it proxy. */
  id: string;
  /** URL segment, derived from the operationId. */
  slug: string;
  /** Webhooks are inbound, so they get a different page treatment. */
  kind: "operation" | "webhook";
  method: "get" | "post" | "put" | "patch" | "delete";
  /** Empty for webhooks, which have no path on our side. */
  path: string;
  summary: string;
  description: string;
  requestBody?: { description: string; required: boolean; schema: Schema };
  responses: ApiResponse[];
};

export type ApiSpec = {
  title: string;
  summary: string;
  description: string;
  version: string;
  baseUrl: string;
  security: SecurityScheme[];
  operations: Operation[];
  webhooks: Operation[];
  /** Public path of the YAML this was generated from, for the download link. */
  specPath: string;
};

/** `string`, `string[]`, `object[]`, and so on. */
export function typeLabel(schema: Schema): string {
  if (schema.type === "array") {
    return schema.items ? `${typeLabel(schema.items)}[]` : "array";
  }
  return schema.type;
}

export type FieldRow = {
  /** Dotted path, unique within a table, so it doubles as the React key. */
  path: string;
  name: string;
  /** Nesting level, rendered as indentation. */
  depth: number;
  type: string;
  required: boolean;
  description?: string;
  example?: string;
};

/**
 * Walks an object schema into flat rows, descending into nested objects and
 * into the item schema of object arrays. Arrays of scalars stay one row: their
 * item type is already in the type label.
 */
export function flattenSchema(schema: Schema): FieldRow[] {
  const rows: FieldRow[] = [];

  function walk(current: Schema, prefix: string, depth: number) {
    for (const property of current.properties ?? []) {
      const path = prefix ? `${prefix}.${property.name}` : property.name;
      const child = property.schema;

      rows.push({
        path,
        name: property.name,
        depth,
        type: typeLabel(child),
        required: property.required,
        description: child.description,
        example: formatExample(child.example),
      });

      if (child.type === "object") {
        walk(child, path, depth + 1);
      } else if (child.type === "array" && child.items?.type === "object") {
        walk(child.items, `${path}[]`, depth + 1);
      }
    }
  }

  walk(schema, "", 0);
  return rows;
}

function formatExample(value: JsonValue | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

/**
 * Builds a sample body out of the per-field examples, which is what the docs
 * show before anyone runs a live call. Fields with no example are skipped
 * rather than filled with a placeholder, so nothing in the sample is invented.
 */
/** Field types the try-it form knows how to render an input for. */
const EDITABLE: SchemaType[] = ["string", "number", "integer", "boolean"];

/**
 * True when every top-level field of the request body is something the form
 * can render. Rather than draw a half-usable panel for an operation with
 * nested objects in its body, the page leaves the panel out and shows the code
 * samples on their own.
 */
export function isTryable(operation: Operation): boolean {
  if (operation.kind !== "operation") return false;
  const properties = operation.requestBody?.schema.properties;
  if (!properties) return false;

  return properties.every(({ schema }) => {
    const type = schema.type === "array" ? schema.items?.type : schema.type;
    return type !== undefined && EDITABLE.includes(type);
  });
}

export function exampleBody(schema: Schema): JsonValue | undefined {
  if (schema.example !== undefined) return schema.example;

  if (schema.type === "object") {
    const out: { [key: string]: JsonValue } = {};
    for (const property of schema.properties ?? []) {
      const value = exampleBody(property.schema);
      if (value !== undefined) out[property.name] = value;
    }
    return Object.keys(out).length > 0 ? out : undefined;
  }

  if (schema.type === "array") {
    const item = schema.items ? exampleBody(schema.items) : undefined;
    return item === undefined ? undefined : [item];
  }

  return undefined;
}
