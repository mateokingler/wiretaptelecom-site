"use client";

import { useEffect, useRef, useState } from "react";
import { LayersIcon, LockIcon, ReceiptIcon, UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Client = {
  name: string;
  initials: string;
  detail: string;
  /** Every cost figure comes from the published rate card: $23.99 a call path,
   *  $1.99 a number. Retail is whatever the partner decides to charge. */
  cost: number;
  retail: number;
};

const clients: Client[] = [
  {
    name: "Halvorsen Dental",
    initials: "HD",
    detail: "9 numbers · 6 call paths",
    cost: 161.85,
    retail: 249,
  },
  {
    name: "Ridgeline Logistics",
    initials: "RL",
    detail: "32 numbers · 14 call paths",
    cost: 399.54,
    retail: 615,
  },
  {
    name: "Cooper & Vance LLP",
    initials: "CV",
    detail: "12 numbers · 4 call paths",
    cost: 119.84,
    retail: 189,
  },
];

const totals = clients.reduce(
  (sum, client) => ({
    cost: sum.cost + client.cost,
    retail: sum.retail + client.retail,
  }),
  { cost: 0, retail: 0 }
);

const columns = [
  { key: "retail", label: "You charge" },
  { key: "cost", label: "Your cost" },
  { key: "margin", label: "Margin" },
] as const;

const phases = [
  { caption: "Opening the partner dashboard", hold: 900 },
  { caption: "Every client account in one console", hold: 800 },
  { caption: "Every client account in one console", hold: 800 },
  { caption: "Every client account in one console", hold: 1000 },
  { caption: "Your price, minus your cost, per account", hold: 1600 },
  { caption: "One invoice from us, whatever the client count", hold: 3000 },
] as const;

const FIRST_ROW_AT = 1;
const MARGIN_AT = 4;
const TOTAL_AT = 5;

const money = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

const CANCELLED = Symbol("cancelled");

export function PartnerConsole() {
  const container = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    const timers: number[] = [];

    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        timers.push(
          window.setTimeout(() => (cancelled ? reject(CANCELLED) : resolve()), ms)
        );
      });

    const play = async () => {
      await sleep(0);

      if (reduced) {
        // Land on the finished state so the point survives without motion.
        setIndex(phases.length - 1);
        return;
      }

      for (;;) {
        for (let i = 0; i < phases.length; i += 1) {
          setIndex(i);
          await sleep(phases[i].hold);
        }
      }
    };

    play().catch((error) => {
      if (error !== CANCELLED) throw error;
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView]);

  const showMargin = index >= MARGIN_AT;
  const showTotal = index >= TOTAL_AT;
  const held = clients.filter((_, row) => index >= FIRST_ROW_AT + row).length;

  return (
    <div
      ref={container}
      className="overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-navy/8"
    >
      <p className="sr-only">
        A looping demonstration of the Core-MSP partner dashboard. Three client accounts
        belonging to one partner are listed in a single console, each showing what the
        partner charges the client, what the account costs the partner at our published
        rates, and the margin between the two. The partner keeps $371.77 a month across
        the three, billed to them on one invoice, and telecom taxes are calculated on the
        retail price and included on the client&apos;s invoice.
      </p>

      <div aria-hidden="true">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border bg-muted/60 px-4 py-3">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-navy text-[0.6rem] font-bold text-white">
              MSP
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold">
                Core-MSP partner dashboard
              </span>
              <span className="block truncate text-[0.65rem] text-muted-foreground">
                Northgate IT · Partner account
              </span>
            </span>
          </span>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-navy/8 px-3 py-1.5 text-[0.7rem] font-semibold text-navy-soft">
            <UsersIcon className="size-3.5" />
            {held === 0 ? "Loading accounts…" : `${held} client accounts`}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="hidden items-center gap-4 px-4 pb-2 sm:flex">
            <span className="flex-1 text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase">
              Client account
            </span>
            {columns.map((column) => (
              <span
                key={column.key}
                className="w-24 text-right text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {column.label}
              </span>
            ))}
          </div>

          <ul className="space-y-2.5">
            {clients.map((client, row) => {
              const visible = index >= FIRST_ROW_AT + row;
              const margin = client.retail - client.cost;
              const values = {
                retail: money(client.retail),
                cost: money(client.cost),
                margin: `+${money(margin)}`,
              };
              return (
                <li
                  key={client.name}
                  className={cn(
                    "rounded-2xl p-4 ring-1 transition-colors duration-500",
                    visible ? "bg-card ring-border" : "bg-muted/50 ring-transparent"
                  )}
                >
                  {/* A skeleton rather than an invisible row, so the console never
                      looks like it failed to load. */}
                  {!visible && (
                    <div className="flex animate-pulse items-center gap-3 motion-reduce:animate-none">
                      <span className="size-8 shrink-0 rounded-full bg-navy/10" />
                      <span className="flex-1 space-y-2">
                        <span className="block h-3 w-36 max-w-[45%] rounded-full bg-navy/10" />
                        <span className="block h-2 w-28 max-w-[35%] rounded-full bg-navy/8" />
                      </span>
                    </div>
                  )}

                  <div
                    className={cn(
                      "flex flex-wrap items-center gap-x-4 gap-y-3",
                      !visible && "hidden"
                    )}
                  >
                    <span className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-tint-sky text-[0.65rem] font-bold text-navy-soft">
                        {client.initials}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">
                          {client.name}
                        </span>
                        <span className="block truncate text-[0.65rem] text-muted-foreground">
                          {client.detail}
                        </span>
                      </span>
                    </span>

                    {/* contents at sm+ folds these back into the row so they line up
                        under the headers; below that they take a row of their own. */}
                    <span className="flex w-full gap-3 sm:contents">
                      {columns.map((column) => (
                        <span
                          key={column.key}
                          className={cn(
                            "flex-1 sm:w-24 sm:flex-none sm:text-right",
                            column.key === "margin" &&
                              "transition-opacity duration-500 " +
                                (showMargin ? "opacity-100" : "opacity-0")
                          )}
                        >
                          <span className="block text-[0.6rem] text-muted-foreground sm:hidden">
                            {column.label}
                          </span>
                          <span
                            className={cn(
                              "block font-mono text-sm",
                              column.key === "margin"
                                ? "font-semibold text-emerald-700"
                                : "text-foreground"
                            )}
                          >
                            {values[column.key]}
                          </span>
                        </span>
                      ))}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-2xl bg-navy px-5 py-4 text-white">
            <span className="text-xs text-white/70">
              {showTotal
                ? `${clients.length} accounts · ${money(totals.retail)} billed · ${money(totals.cost)} at our rates`
                : "Across every account you hold"}
            </span>
            <span className="text-lg font-semibold">
              {showTotal ? (
                <>
                  {money(totals.retail - totals.cost)}
                  <span className="text-sm font-normal text-white/70">
                    {" "}
                    a month, yours
                  </span>
                </>
              ) : (
                <span className="text-sm font-normal text-white/70">Totalling…</span>
              )}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-[0.7rem] font-medium text-muted-foreground">
              <ReceiptIcon className="size-3.5" />
              Taxes on their invoice, not yours
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-[0.7rem] font-medium text-muted-foreground">
              <LayersIcon className="size-3.5" />
              No charge for holding an account
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-[0.7rem] font-medium text-muted-foreground">
              <LockIcon className="size-3.5" />
              Account access approved once
            </span>
          </div>

          <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
            {phases[index].caption}
          </p>
        </div>
      </div>
    </div>
  );
}
