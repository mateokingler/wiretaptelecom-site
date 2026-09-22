import { Fragment } from "react";
import Link from "next/link";
import { InfoIcon, TriangleAlertIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { headingId } from "@/lib/docs-schema";
import type { DocBlock } from "@/lib/docs-schema";
import { cn } from "@/lib/utils";

// Splits on the three inline markers while keeping the delimiters, so the
// pieces can be mapped straight to elements.
const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

/** Also used by the API reference tables, which carry the same three markers. */
export function renderInline(text: string) {
  return text
    .split(INLINE)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }

      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={index}
            className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground ring-1 ring-navy/8"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
      if (link) {
        const [, label, href] = link;
        const className =
          "font-medium text-brand-blue underline decoration-brand-blue/30 underline-offset-4 transition-colors hover:decoration-brand-blue";

        if (href.startsWith("http")) {
          return (
            <a key={index} href={href} className={className} target="_blank" rel="noreferrer">
              {label}
            </a>
          );
        }

        return (
          <Link key={index} href={href} className={className}>
            {label}
          </Link>
        );
      }

      return <Fragment key={index}>{part}</Fragment>;
    });
}

export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="max-w-2xl">
      {blocks.map((block, index) => (
        <Block key={index} block={block} first={index === 0} />
      ))}
    </div>
  );
}

function Block({ block, first }: { block: DocBlock; first: boolean }) {
  switch (block.kind) {
    case "heading":
      return (
        <h2
          id={headingId(block.text)}
          className={cn(
            "display scroll-mt-28 text-2xl sm:text-[1.75rem]",
            first ? "" : "mt-14"
          )}
        >
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className={cn("text-lg font-semibold tracking-tight", first ? "" : "mt-9")}>
          {block.text}
        </h3>
      );

    case "text":
      return (
        <p className={cn("leading-relaxed text-muted-foreground", first ? "" : "mt-5")}>
          {renderInline(block.body)}
        </p>
      );

    case "steps":
      return (
        <ol className={cn("space-y-4", first ? "" : "mt-6")}>
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-4">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-tint-sky font-mono text-xs font-semibold text-brand-blue tabular-nums">
                {index + 1}
              </span>
              <span className="leading-relaxed text-muted-foreground">
                {renderInline(item)}
              </span>
            </li>
          ))}
        </ol>
      );

    case "list":
      return (
        <ul className={cn("space-y-2.5", first ? "" : "mt-5")}>
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-3 leading-relaxed text-muted-foreground">
              <span
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-blue/60"
                aria-hidden
              />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "fields":
      return (
        <dl
          className={cn(
            "divide-y divide-border overflow-hidden rounded-2xl ring-1 ring-navy/8",
            first ? "" : "mt-6"
          )}
        >
          {block.items.map((item) => (
            <div key={item.term} className="grid gap-1 p-5 sm:grid-cols-[11rem_1fr] sm:gap-5">
              <dt className="font-semibold text-foreground">{item.term}</dt>
              <dd className="leading-relaxed text-muted-foreground">
                {renderInline(item.description)}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "note": {
      const warning = block.tone === "warning";
      const Icon = warning ? TriangleAlertIcon : InfoIcon;
      return (
        <div
          className={cn(
            "flex gap-3.5 rounded-2xl p-5",
            warning ? "bg-tint-sand ring-1 ring-primary/30" : "bg-tint-sky ring-1 ring-brand-blue/15",
            first ? "" : "mt-6"
          )}
        >
          <Icon
            className={cn("mt-0.5 size-5 shrink-0", warning ? "text-navy/70" : "text-brand-blue")}
          />
          <div>
            {block.title && <p className="font-semibold text-foreground">{block.title}</p>}
            <p className={cn("leading-relaxed text-muted-foreground", block.title && "mt-1")}>
              {renderInline(block.body)}
            </p>
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div
          className={cn(
            "overflow-x-auto rounded-2xl ring-1 ring-navy/8",
            first ? "" : "mt-6"
          )}
        >
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-muted">
                {block.columns.map((column) => (
                  <th key={column} className="px-5 py-3.5 font-semibold whitespace-nowrap">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-5 py-3.5 align-top",
                        cellIndex === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "faq":
      return (
        <Accordion className={cn("border-t border-border", first ? "" : "mt-6")}>
          {block.items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-b">
              <AccordionTrigger className="py-4 text-left text-base font-semibold hover:text-brand-blue hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                {renderInline(item.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
  }
}
