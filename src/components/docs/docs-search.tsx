"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { docCategoryById } from "@/lib/docs-schema";
import type { DocArticle } from "@/lib/docs-schema";

type SearchRow = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  haystack: string;
};

export function DocsSearch({ articles }: { articles: DocArticle[] }) {
  const [query, setQuery] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // The panel overlays the section below it, so clicking away has to close it.
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setDismissed(true);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const rows = useMemo<SearchRow[]>(
    () =>
      articles.map((article) => ({
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        category: docCategoryById.get(article.category)?.title ?? "",
        haystack: [
          article.title,
          article.summary,
          docCategoryById.get(article.category)?.title ?? "",
          ...(article.keywords ?? []),
        ]
          .join(" ")
          .toLowerCase(),
      })),
    [articles]
  );

  // Every term has to appear somewhere, so "3cx sms" narrows instead of widening.
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results =
    terms.length === 0 ? [] : rows.filter((row) => terms.every((t) => row.haystack.includes(t)));
  const open = terms.length > 0 && !dismissed;

  return (
    <div className="relative" ref={containerRef}>
      <label htmlFor="docs-search" className="sr-only">
        Search documentation
      </label>
      <SearchIcon
        className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input
        id="docs-search"
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setDismissed(false);
        }}
        onFocus={() => setDismissed(false)}
        onKeyDown={(event) => {
          // A search input clears itself on Escape. Spend the first Escape on
          // closing the panel so the query survives; a second one still clears.
          if (event.key === "Escape" && open) {
            event.preventDefault();
            setDismissed(true);
          }
        }}
        placeholder="Search guides, settings, and error messages"
        autoComplete="off"
        className="h-14 w-full rounded-full bg-white pr-5 pl-13 text-base text-foreground shadow-lg shadow-navy/10 outline-none ring-1 ring-navy/10 placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-brand-blue"
      />

      {open && (
        <div className="absolute inset-x-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-2xl bg-white text-left shadow-2xl shadow-navy/20 ring-1 ring-navy/10">
          {results.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted-foreground">
              No guides match “{query}”. Try a PBX name, a feature, or an error message.
            </p>
          ) : (
            <ul className="max-h-96 divide-y divide-border overflow-y-auto">
              {results.map((row) => (
                <li key={row.slug}>
                  <Link
                    href={`/docs/${row.slug}`}
                    className="group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-muted"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground">
                        {row.title}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                        {row.summary}
                      </span>
                    </span>
                    <span className="eyebrow ml-auto hidden shrink-0 pt-1 text-muted-foreground/70 sm:block">
                      {row.category}
                    </span>
                    <ArrowRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
