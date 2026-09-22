"use client";

import { useId, useMemo, useState } from "react";
import { LoaderCircleIcon, PlusIcon, SendIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { CodeBlock } from "@/components/api/code-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  APIKEY_PLACEHOLDER,
  BEARER_PLACEHOLDER,
  SAMPLE_LANGUAGES,
  renderSample,
} from "@/lib/api-samples";
import { exampleBody } from "@/lib/openapi";
import type { JsonValue, Operation, Schema, SecurityScheme } from "@/lib/openapi";
import { cn } from "@/lib/utils";

type FieldValue = string | string[];

function initialValues(schema: Schema): Record<string, FieldValue> {
  const values: Record<string, FieldValue> = {};

  for (const { name, schema: field } of schema.properties ?? []) {
    if (field.type === "array") {
      const example = field.example;
      values[name] = Array.isArray(example) ? example.map(String) : [""];
    } else {
      values[name] = field.example === undefined ? "" : String(field.example);
    }
  }

  return values;
}

/** Drops blanks, so an untouched optional field never reaches the gateway. */
function buildBody(schema: Schema, values: Record<string, FieldValue>): JsonValue {
  const body: { [key: string]: JsonValue } = {};

  for (const { name, schema: field } of schema.properties ?? []) {
    const value = values[name];

    if (Array.isArray(value)) {
      const items = value.map((item) => item.trim()).filter(Boolean);
      if (items.length > 0) body[name] = items;
      continue;
    }

    const trimmed = value?.trim();
    if (!trimmed) continue;

    if (field.type === "boolean") body[name] = trimmed === "true";
    else if (field.type === "number" || field.type === "integer") body[name] = Number(trimmed);
    else body[name] = trimmed;
  }

  return body;
}

type LiveResult = {
  status: number;
  statusText: string;
  ms: number;
  body: JsonValue;
};

type Props = {
  serviceId: string;
  operation: Operation;
  baseUrl: string;
  security: SecurityScheme[];
};

export function TryIt({ serviceId, operation, baseUrl, security }: Props) {
  const schema = operation.requestBody!.schema;
  const fieldId = useId();

  const [values, setValues] = useState(() => initialValues(schema));
  const [live, setLive] = useState(false);
  const [bearer, setBearer] = useState("");
  const [apikey, setApikey] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LiveResult | null>(null);
  const [showing, setShowing] = useState<"example" | "live">("example");

  const queryScheme = security.find((scheme) => scheme.kind === "query");
  const hasBearer = security.some((scheme) => scheme.kind === "bearer");

  const body = useMemo(() => buildBody(schema, values), [schema, values]);

  const request = useMemo(
    () => ({
      method: operation.method.toUpperCase(),
      url: `${baseUrl}${operation.path}`,
      query: queryScheme ? { [queryScheme.name]: APIKEY_PLACEHOLDER } : {},
      bearer: hasBearer ? BEARER_PLACEHOLDER : undefined,
      body,
    }),
    [baseUrl, body, hasBearer, operation.method, operation.path, queryScheme]
  );

  const exampleResponse = useMemo(() => {
    const success = operation.responses.find((response) => response.status.startsWith("2"));
    const sample = success?.schema ? exampleBody(success.schema) : undefined;
    return sample === undefined ? null : JSON.stringify(sample, null, 2);
  }, [operation.responses]);

  const missing = (schema.properties ?? [])
    .filter(({ name, required }) => {
      if (!required) return false;
      const value = values[name];
      return Array.isArray(value) ? value.every((item) => !item.trim()) : !value?.trim();
    })
    .map(({ name }) => name);

  async function send() {
    setError(null);

    if (missing.length > 0) {
      setError(`Fill in ${missing.join(", ")} before sending.`);
      return;
    }
    if (hasBearer && !bearer.trim()) {
      setError("Add your bearer token.");
      return;
    }
    if (queryScheme && !apikey.trim()) {
      setError("Add your auth token.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch(`/api/try/${serviceId}/${operation.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credentials: { bearer: bearer.trim(), apikey: apikey.trim() },
          body,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "The request failed.");
        return;
      }

      setResult(payload as LiveResult);
      setShowing("live");
    } catch {
      setError("Could not reach the gateway. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  const shown = showing === "live" && result ? result : null;

  return (
    <div className="overflow-hidden rounded-3xl ring-1 ring-navy/8">
      <div className="border-b border-border bg-muted px-6 py-5">
        <p className="font-semibold">Request builder</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Edit the fields and the samples rewrite themselves. Turn on live mode to run
          the call against your own account.
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Both tracks need min-w-0: a grid item is sized by its content by
            default, which lets a long sample line push the whole panel wider
            than the page instead of scrolling inside its own box. */}
        <div className="min-w-0 space-y-5 border-b border-border p-6 lg:border-r lg:border-b-0">
          {(schema.properties ?? []).map(({ name, required, schema: field }) => (
            <Field
              key={name}
              id={`${fieldId}-${name}`}
              name={name}
              required={required}
              schema={field}
              value={values[name]}
              onChange={(value) => setValues((current) => ({ ...current, [name]: value }))}
            />
          ))}

          <div className="rounded-2xl bg-muted p-4">
            <Label className="items-start gap-2.5 font-normal">
              <input
                type="checkbox"
                checked={live}
                onChange={(event) => setLive(event.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-brand-blue"
              />
              <span className="text-sm leading-snug">
                <span className="font-semibold">Live mode</span>
                <span className="mt-1 block text-muted-foreground">
                  Sends a real message from your account, to real handsets, billed at
                  your normal rate.
                </span>
              </span>
            </Label>

            {live && (
              <div className="mt-4 space-y-3">
                {hasBearer && (
                  <Credential
                    id={`${fieldId}-bearer`}
                    label="Bearer token"
                    value={bearer}
                    onChange={setBearer}
                  />
                )}
                {queryScheme && (
                  <Credential
                    id={`${fieldId}-apikey`}
                    label="Auth token"
                    value={apikey}
                    onChange={setApikey}
                  />
                )}
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Both come from Company Settings → API Keys in the portal. They stay in
                  this browser tab, are forwarded once to run the call, and are never
                  stored.
                </p>
                <Button size="sm" onClick={send} disabled={sending}>
                  {sending ? (
                    <LoaderCircleIcon className="size-4 animate-spin" />
                  ) : (
                    <SendIcon className="size-4" />
                  )}
                  {sending ? "Sending" : "Send request"}
                </Button>
              </div>
            )}

            {error && (
              <p className="mt-3 flex items-start gap-2 text-sm text-destructive">
                <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" />
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="min-w-0 space-y-4 p-6">
          <Tabs defaultValue="curl" className="min-w-0">
            <TabsList variant="line" className="h-auto w-full justify-start gap-3 p-0">
              {SAMPLE_LANGUAGES.map((language) => (
                <TabsTrigger
                  key={language.id}
                  value={language.id}
                  // The primitive's resting color lands just under 4.5:1.
                  className="flex-none text-muted-foreground"
                >
                  {language.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {SAMPLE_LANGUAGES.map((language) => (
              <TabsContent key={language.id} value={language.id} className="mt-3">
                <CodeBlock
                  code={renderSample(language.id, request)}
                  label={language.label}
                />
              </TabsContent>
            ))}
          </Tabs>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold">Response</p>
              {result && (
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 font-semibold",
                      result.status < 300
                        ? "bg-tint-mist text-navy-soft"
                        : "bg-destructive/10 text-destructive"
                    )}
                  >
                    {/* HTTP/2 drops the reason phrase, so it is often blank. */}
                    {[result.status, result.statusText].filter(Boolean).join(" ")}
                  </span>
                  <span className="text-muted-foreground">{result.ms} ms</span>
                  <button
                    type="button"
                    onClick={() => setShowing(shown ? "example" : "live")}
                    className="font-medium text-brand-blue underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue"
                  >
                    {shown ? "Show example" : "Show result"}
                  </button>
                </div>
              )}
            </div>
            <div className="mt-3">
              {shown ? (
                <CodeBlock
                  code={JSON.stringify(shown.body, null, 2)}
                  language="json"
                  label="Your account"
                />
              ) : exampleResponse ? (
                <CodeBlock code={exampleResponse} language="json" label="Example" />
              ) : (
                <p className="text-sm text-muted-foreground">
                  This call returns no body.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Credential({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Input
        id={id}
        type="password"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-9 font-mono"
      />
    </div>
  );
}

function Field({
  id,
  name,
  required,
  schema,
  value,
  onChange,
}: {
  id: string;
  name: string;
  required: boolean;
  schema: Schema;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
}) {
  const header = (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <Label htmlFor={id} className="font-mono text-sm">
        {name}
      </Label>
      {required && <span className="eyebrow text-[0.625rem] text-brand-blue">Required</span>}
    </div>
  );

  if (schema.type === "array" && Array.isArray(value)) {
    return (
      <div>
        {header}
        <div className="mt-1.5 space-y-2">
          {value.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                // The visible label names the first row; the rest are numbered
                // so a screen reader can tell them apart.
                id={index === 0 ? id : undefined}
                aria-label={index === 0 ? undefined : `${name} ${index + 1}`}
                value={item}
                spellCheck={false}
                onChange={(event) => {
                  const next = [...value];
                  next[index] = event.target.value;
                  onChange(next);
                }}
                className="h-9 font-mono"
              />
              {value.length > 1 && (
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, at) => at !== index))}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">Remove {name} entry</span>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...value, ""])}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-ink"
          >
            <PlusIcon className="size-3.5" />
            Add another
          </button>
        </div>
      </div>
    );
  }

  const single = typeof value === "string" ? value : "";

  if (schema.type === "boolean") {
    return (
      <Label className="gap-2.5">
        <input
          type="checkbox"
          checked={single === "true"}
          onChange={(event) => onChange(String(event.target.checked))}
          className="size-4 accent-brand-blue"
        />
        <span className="font-mono text-sm">{name}</span>
      </Label>
    );
  }

  return (
    <div>
      {header}
      <Input
        id={id}
        value={single}
        spellCheck={false}
        inputMode={schema.type === "string" ? undefined : "numeric"}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-9 font-mono"
      />
    </div>
  );
}
