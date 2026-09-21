"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

export function DocToc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    // The top band of the viewport is the "reading line": whichever heading sits
    // highest within it wins, so the marker advances as sections scroll past.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-18 max-h-[calc(100vh-4.5rem)] overflow-y-auto py-10 pl-4">
        <p className="eyebrow text-muted-foreground">On this page</p>
        <ul className="mt-3 space-y-1 border-l border-border">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors",
                  activeId === heading.id
                    ? "border-brand-blue font-medium text-brand-blue"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
