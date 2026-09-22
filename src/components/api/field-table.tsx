import { renderInline } from "@/components/docs/doc-blocks";
import { flattenSchema } from "@/lib/openapi";
import type { Schema } from "@/lib/openapi";
import { cn } from "@/lib/utils";

/**
 * One row per field, with nested objects indented under their parent. Rows are
 * a definition list rather than a table: the type and the required flag sit
 * beside the name on wide screens and wrap under it on a phone, which a table
 * cannot do.
 */
export function FieldTable({ schema }: { schema: Schema }) {
  const rows = flattenSchema(schema);
  if (rows.length === 0) return null;

  return (
    <dl className="divide-y divide-border overflow-hidden rounded-2xl ring-1 ring-navy/8">
      {rows.map((row) => (
        <div
          key={row.path}
          className="grid gap-1.5 p-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-6"
        >
          {/* Nesting indents the name alone, so every description still starts
              on the same line down the page. */}
          <dt
            className="flex flex-wrap items-baseline gap-x-2 gap-y-1"
            style={row.depth > 0 ? { paddingLeft: `${row.depth * 1.25}rem` } : undefined}
          >
            <code className="font-mono text-sm font-semibold text-foreground">{row.name}</code>
            <span className="font-mono text-xs text-muted-foreground">{row.type}</span>
            {row.required && (
              <span className="eyebrow text-[0.625rem] text-brand-blue">Required</span>
            )}
          </dt>
          <dd className="text-sm leading-relaxed text-muted-foreground">
            {row.description && <p>{renderInline(row.description)}</p>}
            {row.example !== undefined && row.example !== "" && (
              <p className={cn("text-[0.8125rem]", row.description && "mt-1.5")}>
                Example:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground ring-1 ring-navy/8">
                  {row.example}
                </code>
              </p>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
