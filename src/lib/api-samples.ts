import type { JsonValue } from "@/lib/openapi";

/**
 * Renders a request as copyable code in a few languages. Credentials are
 * always placeholders, never whatever someone typed into the try-it panel, so
 * a sample is safe to paste into a chat or a repository.
 */

export const SAMPLE_LANGUAGES = [
  { id: "curl", label: "cURL" },
  { id: "js", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "php", label: "PHP" },
] as const;

export type SampleLanguage = (typeof SAMPLE_LANGUAGES)[number]["id"];

export type SampleRequest = {
  method: string;
  /** Base URL and path, without the query string. */
  url: string;
  /** Query parameters, already in placeholder form. */
  query: Record<string, string>;
  /** Placeholder for the bearer token, or undefined if the call needs none. */
  bearer?: string;
  body?: JsonValue;
};

export const BEARER_PLACEHOLDER = "YOUR_BEARER_TOKEN";
export const APIKEY_PLACEHOLDER = "YOUR_AUTH_TOKEN";

function withQuery({ url, query }: SampleRequest): string {
  const entries = Object.entries(query);
  if (entries.length === 0) return url;
  return `${url}?${entries.map(([key, value]) => `${key}=${value}`).join("&")}`;
}

/** Indents every line after the first, for embedding a body inside a call. */
function indent(text: string, spaces: number): string {
  const pad = " ".repeat(spaces);
  return text.split("\n").join(`\n${pad}`);
}

function json(body: JsonValue | undefined): string {
  return JSON.stringify(body ?? {}, null, 2);
}

function curl(request: SampleRequest): string {
  const lines = [`curl -X ${request.method} '${withQuery(request)}'`];
  if (request.bearer) lines.push(`  -H 'Authorization: Bearer ${request.bearer}'`);
  if (request.body !== undefined) {
    lines.push("  -H 'Content-Type: application/json'");
    lines.push(`  -d '${json(request.body)}'`);
  }
  return lines.join(" \\\n");
}

function javascript(request: SampleRequest): string {
  const headers = [
    ...(request.bearer ? [`    Authorization: "Bearer ${request.bearer}",`] : []),
    ...(request.body !== undefined ? ['    "Content-Type": "application/json",'] : []),
  ];

  return [
    `const response = await fetch("${withQuery(request)}", {`,
    `  method: "${request.method}",`,
    ...(headers.length ? ["  headers: {", ...headers, "  },"] : []),
    ...(request.body !== undefined
      ? [`  body: JSON.stringify(${indent(json(request.body), 2)}),`]
      : []),
    "});",
    "",
    "const result = await response.json();",
  ].join("\n");
}

function python(request: SampleRequest): string {
  const args = [`    "${request.url}",`];
  if (Object.keys(request.query).length > 0) {
    const pairs = Object.entries(request.query)
      .map(([key, value]) => `"${key}": "${value}"`)
      .join(", ");
    args.push(`    params={${pairs}},`);
  }
  if (request.bearer) {
    args.push(`    headers={"Authorization": "Bearer ${request.bearer}"},`);
  }
  if (request.body !== undefined) {
    args.push(`    json=${indent(pythonValue(request.body), 4)},`);
  }

  return [
    "import requests",
    "",
    `response = requests.${request.method.toLowerCase()}(`,
    ...args,
    ")",
    "",
    "print(response.json())",
  ].join("\n");
}

function pythonValue(value: JsonValue, depth = 0): string {
  const pad = "    ".repeat(depth + 1);
  const close = "    ".repeat(depth);

  if (value === null) return "None";
  if (typeof value === "boolean") return value ? "True" : "False";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return JSON.stringify(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => `${pad}${pythonValue(item, depth + 1)},`);
    return ["[", ...items, `${close}]`].join("\n");
  }

  const entries = Object.entries(value);
  if (entries.length === 0) return "{}";
  const items = entries.map(([key, item]) => `${pad}"${key}": ${pythonValue(item, depth + 1)},`);
  return ["{", ...items, `${close}}`].join("\n");
}

function php(request: SampleRequest): string {
  const headers = [
    ...(request.bearer ? [`        "Authorization: Bearer ${request.bearer}",`] : []),
    ...(request.body !== undefined ? ['        "Content-Type: application/json",'] : []),
  ];

  return [
    "<?php",
    `$ch = curl_init("${withQuery(request)}");`,
    "",
    "curl_setopt_array($ch, [",
    "    CURLOPT_RETURNTRANSFER => true,",
    `    CURLOPT_CUSTOMREQUEST => "${request.method}",`,
    ...(headers.length ? ["    CURLOPT_HTTPHEADER => [", ...headers, "    ],"] : []),
    ...(request.body !== undefined
      ? [`    CURLOPT_POSTFIELDS => json_encode(${indent(phpValue(request.body), 4)}),`]
      : []),
    "]);",
    "",
    "$response = curl_exec($ch);",
    "curl_close($ch);",
    "",
    "print_r(json_decode($response, true));",
  ].join("\n");
}

function phpValue(value: JsonValue, depth = 0): string {
  const pad = "    ".repeat(depth + 1);
  const close = "    ".repeat(depth);

  if (value === null) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return JSON.stringify(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => `${pad}${phpValue(item, depth + 1)},`);
    return ["[", ...items, `${close}]`].join("\n");
  }

  const entries = Object.entries(value);
  if (entries.length === 0) return "[]";
  const items = entries.map(([key, item]) => `${pad}"${key}" => ${phpValue(item, depth + 1)},`);
  return ["[", ...items, `${close}]`].join("\n");
}

const renderers: Record<SampleLanguage, (request: SampleRequest) => string> = {
  curl,
  js: javascript,
  python,
  php,
};

export function renderSample(language: SampleLanguage, request: SampleRequest): string {
  return renderers[language](request);
}
