"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { docCategories } from "@/lib/docs-schema";
import type { DocArticle } from "@/lib/docs-schema";
import { cn } from "@/lib/utils";

type Props = { articles: DocArticle[] };

function Tree({ articles, onNavigate }: Props & { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation">
      <Link
        href="/docs"
        onClick={onNavigate}
        className={cn(
          "block rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
          pathname === "/docs"
            ? "bg-tint-sky text-brand-blue-ink"
            : "text-foreground hover:bg-muted"
        )}
      >
        All documentation
      </Link>

      <div className="mt-6 space-y-6">
        {docCategories.map((category) => {
          const inCategory = articles.filter((article) => article.category === category.id);
          if (inCategory.length === 0) return null;

          return (
            <div key={category.id}>
              <p className="eyebrow px-3 text-muted-foreground">{category.title}</p>
              <ul className="mt-2 space-y-0.5">
                {inCategory.map((article) => {
                  const href = `/docs/${article.slug}`;
                  const active = pathname === href;
                  return (
                    <li key={article.slug}>
                      <Link
                        href={href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm leading-snug transition-colors",
                          active
                            ? "bg-tint-sky font-semibold text-brand-blue-ink"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {article.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export function DocsSidebar({ articles }: Props) {
  return (
    <aside className="hidden lg:block">
      {/* Sits under the 4.5rem sticky header and scrolls on its own. */}
      <div className="sticky top-18 max-h-[calc(100vh-4.5rem)] overflow-y-auto py-10 pr-4">
        <Tree articles={articles} />
      </div>
    </aside>
  );
}

export function DocsSidebarMobile({ articles }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" size="sm" className="lg:hidden" />}>
        <MenuIcon className="size-4" />
        Browse docs
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(100%,20rem)] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Documentation</SheetTitle>
        </SheetHeader>
        <div className="px-2 pb-10">
          <Tree articles={articles} onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
