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
import type { ApiNavSection } from "@/content/api";
import { cn } from "@/lib/utils";

function Tree({
  sections,
  onNavigate,
}: {
  sections: ApiNavSection[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="API reference">
      <Link
        href="/developers"
        onClick={onNavigate}
        className={cn(
          "block rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
          pathname === "/developers"
            ? "bg-tint-sky text-brand-blue-ink"
            : "text-foreground hover:bg-muted"
        )}
      >
        Overview
      </Link>

      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <div key={section.id}>
            <p className="eyebrow px-3 text-muted-foreground">{section.title}</p>
            <ul className="mt-2 space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm leading-snug transition-colors",
                        active
                          ? "bg-tint-sky font-semibold text-brand-blue-ink"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[0.625rem] font-semibold uppercase",
                          active ? "text-brand-blue-ink" : "text-muted-foreground"
                        )}
                      >
                        {item.method}
                      </span>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function ApiSidebar({ sections }: { sections: ApiNavSection[] }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-18 max-h-[calc(100vh-4.5rem)] overflow-y-auto py-10 pr-4">
        <Tree sections={sections} />
      </div>
    </aside>
  );
}

export function ApiSidebarMobile({ sections }: { sections: ApiNavSection[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" size="sm" className="lg:hidden" />}>
        <MenuIcon className="size-4" />
        Browse API
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(100%,20rem)] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>API reference</SheetTitle>
        </SheetHeader>
        <div className="px-2 pb-10">
          <Tree sections={sections} onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
