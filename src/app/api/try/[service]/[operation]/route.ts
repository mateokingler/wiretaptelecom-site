import { getOperation } from "@/content/api";
import type { JsonValue, Schema } from "@/lib/openapi";

/**
 * Runs one try-it call from the reference pages against the real gateway,
 * using credentials the developer typed in. Going through our own origin
 * avoids CORS and keeps the gateway host out of the browser.
 *
 * The upstream is whatever the spec declares, and the operation has to exist
 * in the registry, so there is no arbitrary-URL surface here. Credentials pass
 * straight through and are never logged or stored.
 */
export const dynamic = "force-dynamic";

const TIMEOUT_MS = 15_000;
const MAX_ITEMS = 5;
const MAX_TEXT = 1600;
const WINDOW_MS = 10 * 60_000;
const MAX_CALLS = 5;

/**
 * Best effort only: it is per process, so it resets on deploy and does not
 * hold across instances. It exists to stop the panel being used as a free
 * sending endpoint, not as a billing control.
 */
const calls = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();

  for (const [ip, times] of calls) {
    const fresh = times.filter((time) => now - time < WINDOW_MS);
    if (fresh.length === 0) calls.delete(ip);
    else calls.set(ip, fresh);
  }

  const mine = calls.get(key) ?? [];
  if (mine.length >= MAX_CALLS) return true;

  calls.set(key, [...mine, now]);
  return false;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function bad(error: string, status = 400) {
  return Response.json({ error }, { status });
}

/**
 * Accepts only what the spec declares, within limits that keep the panel a
 * demonstration rather than a bulk sender.
 */
function checkBody(schema: Schema, body: unknown): string | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return "The request body must be an object.";
  }

  const declared = new Map((schema.properties ?? []).map((item) => [item.name, item]));

  for (const [name, value] of Object.entries(body)) {
    const property = declared.get(name);
    if (!property) return `"${name}" is not a field on this request.`;

    if (property.schema.type === "array") {
      if (!Array.isArray(value)) return `"${name}" must be an array.`;
      if (value.length > MAX_ITEMS) {
        return `The try-it panel sends at most ${MAX_ITEMS} values for "${name}". Use the API directly for more.`;
      }
      for (const item of value) {
        const problem = checkScalar(name, item);
        if (problem) return problem;
      }
      continue;
    }

    const problem = checkScalar(name, value);
    if (problem) return problem;
  }

  for (const { name, required } of schema.properties ?? []) {
    if (required && !(name in body)) return `"${name}" is required.`;
  }

  return null;
}

function checkScalar(name: string, value: unknown): string | null {
  if (typeof value === "boolean" || typeof value === "number") return null;
  if (typeof value !== "string") return `"${name}" must be a string, number, or boolean.`;

  if (value.length > MAX_TEXT) {
    return `"${name}" is longer than the ${MAX_TEXT} characters the panel allows.`;
  }
  // A plain-http URL here would have us fetch it, or have the carrier fetch it,
  // over a link nobody can vouch for.
  if (/^https?:\/\//i.test(value) && !/^https:\/\//i.test(value)) {
    return `"${name}" must use https.`;
  }

  return null;
}

type Params = { params: Promise<{ service: string; operation: string }> };

export async function POST(request: Request, { params }: Params) {
  const { service: serviceId, operation: slug } = await params;

  const match = getOperation(serviceId, slug);
  if (!match || match.operation.kind !== "operation") {
    return bad("Unknown operation.", 404);
  }

  const { service, operation } = match;
  if (!operation.requestBody) return bad("This operation takes no body.");

  let payload: { credentials?: { bearer?: string; apikey?: string }; body?: unknown };
  try {
    payload = await request.json();
  } catch {
    return bad("Could not read the request.");
  }

  const bearer = payload.credentials?.bearer?.trim() ?? "";
  const apikey = payload.credentials?.apikey?.trim() ?? "";
  const needsBearer = service.spec.security.some((scheme) => scheme.kind === "bearer");
  const queryScheme = service.spec.security.find((scheme) => scheme.kind === "query");

  if (needsBearer && !bearer) return bad("Add your bearer token.", 401);
  if (queryScheme && !apikey) return bad("Add your auth token.", 401);

  const problem = checkBody(operation.requestBody.schema, payload.body);
  if (problem) return bad(problem);

  if (rateLimited(clientKey(request))) {
    return bad(
      `The panel allows ${MAX_CALLS} live calls every ${WINDOW_MS / 60_000} minutes. Run it from your own code to keep going.`,
      429
    );
  }

  const url = new URL(`${service.spec.baseUrl}${operation.path}`);
  if (queryScheme) url.searchParams.set(queryScheme.name, apikey);

  const started = Date.now();
  const abort = AbortSignal.timeout(TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: operation.method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        ...(needsBearer ? { Authorization: `Bearer ${bearer}` } : {}),
      },
      body: JSON.stringify(payload.body),
      signal: abort,
      cache: "no-store",
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return bad(
      timedOut
        ? "The gateway did not answer in time."
        : "Could not reach the gateway. Try again in a moment.",
      504
    );
  }

  const raw = await upstream.text();
  let body: JsonValue;
  try {
    body = raw ? JSON.parse(raw) : null;
  } catch {
    body = raw;
  }

  return Response.json({
    status: upstream.status,
    statusText: upstream.statusText,
    ms: Date.now() - started,
    body,
  });
}
