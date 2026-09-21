"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; title: string };

export function LegalNav({ items }: { items: Item[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    // Whichever heading sits highest in the top band of the viewport is the one
    // being read, so the marker advances as sections scroll past.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Legal sections" className="hidden lg:block">
      <div className="sticky top-24">
        <p className="eyebrow text-muted-foreground">Contents</p>
        <ul className="mt-3 space-y-1 border-l border-border">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors",
                  activeId === item.id
                    ? "border-brand-blue font-medium text-brand-blue"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
