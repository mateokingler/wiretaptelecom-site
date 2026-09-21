"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  KeyRoundIcon,
  type LucideIcon,
  MessageSquareIcon,
  PhoneIcon,
  PrinterIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BLOCK = 8;

type Pool = {
  id: string;
  tab: string;
  areaCode: string;
  region: string;
  kind: "Local" | "Toll-free";
  /** Inventory figure shown against the search, purely illustrative. */
  available: string;
  exchange: string;
  first: number;
};

const pools: Pool[] = [
  {
    id: "816",
    tab: "816",
    areaCode: "816",
    region: "Kansas City, MO",
    kind: "Local",
    available: "1,284",
    exchange: "555",
    first: 140,
  },
  {
    id: "305",
    tab: "305",
    areaCode: "305",
    region: "Miami, FL",
    kind: "Local",
    available: "2,061",
    exchange: "555",
    first: 310,
  },
  {
    id: "833",
    tab: "833",
    areaCode: "833",
    region: "Nationwide",
    kind: "Toll-free",
    available: "4,730",
    exchange: "555",
    first: 100,
  },
];

const services: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "voice", label: "Voice", icon: PhoneIcon },
  { id: "fax", label: "Fax", icon: PrinterIcon },
  { id: "sms", label: "SMS and MMS", icon: MessageSquareIcon },
];

type Phase = "searching" | "results" | "selecting" | "buying" | "active" | "protected";

/** Phases after the purchase button is pressed, used to style the cart button. */
const committed: Phase[] = ["buying", "active", "protected"];

const CANCELLED = Symbol("cancelled");

/** Dashed rather than parenthesised so the digits fit a half-width tile on mobile. */
function numbersIn(pool: Pool) {
  return Array.from(
    { length: BLOCK },
    (_, i) => `${pool.areaCode}-${pool.exchange}-0${pool.first + i}`
  );
}

export function NumberSearch() {
  const container = useRef<HTMLDivElement>(null);
  // Set by the area-code tabs so the next loop starts on the pool you picked.
  const startAt = useRef(0);
  const [inView, setInView] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("searching");
  const [revealed, setRevealed] = useState(0);
  const [selected, setSelected] = useState(0);
  const [activated, setActivated] = useState(0);
  const [lit, setLit] = useState(0);

  const pool = pools[index];
  const numbers = numbersIn(pool);
  const bought = committed.includes(phase);

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
        setIndex(startAt.current);
        setPhase("protected");
        setRevealed(BLOCK);
        setSelected(BLOCK);
        setActivated(BLOCK);
        setLit(services.length);
        return;
      }

      let i = startAt.current;
      startAt.current = 0;

      for (;;) {
        setIndex(i);
        setPhase("searching");
        setRevealed(0);
        setSelected(0);
        setActivated(0);
        setLit(0);
        await sleep(1000);

        setPhase("results");
        for (let n = 1; n <= BLOCK; n += 1) {
          setRevealed(n);
          await sleep(70);
        }
        await sleep(750);

        setPhase("selecting");
        for (let n = 1; n <= BLOCK; n += 1) {
          setSelected(n);
          await sleep(90);
        }
        await sleep(600);

        setPhase("buying");
        await sleep(1100);

        setPhase("active");
        for (let n = 1; n <= BLOCK; n += 1) {
          setActivated(n);
          await sleep(70);
        }
        for (let s = 1; s <= services.length; s += 1) {
          setLit(s);
          await sleep(340);
        }
        await sleep(1400);

        setPhase("protected");
        await sleep(2600);

        i = (i + 1) % pools.length;
      }
    };

    play().catch((error) => {
      if (error !== CANCELLED) throw error;
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, trigger]);

  const status: { tone: "idle" | "busy" | "done"; text: string } = {
    searching: {
      tone: "idle" as const,
      text: `Searching ${pool.areaCode} for contiguous ${pool.kind.toLowerCase()} numbers`,
    },
    results: {
      tone: "idle" as const,
      text: `${pool.available} numbers available in ${pool.areaCode}`,
    },
    selecting: {
      tone: "idle" as const,
      text: `Selecting a contiguous block of ${BLOCK}`,
    },
    buying: { tone: "busy" as const, text: `Purchasing ${BLOCK} numbers` },
    active: {
      tone: "done" as const,
      text: `${BLOCK} numbers live on the network`,
    },
    protected: {
      tone: "done" as const,
      text: "Port-out PINs set, routed to trunk-01",
    },
  }[phase];

  return (
    <div
      ref={container}
      className="overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-navy/8"
    >
      <p className="sr-only">
        A looping demonstration of buying phone numbers in the Wiretap portal. A search of
        an area code returns available numbers, a contiguous block of eight is selected
        and purchased, and the numbers become active within seconds with voice, fax, and
        SMS and MMS enabled on each one and port-out PIN protection applied.
      </p>

      {/* The tab strip stays outside the aria-hidden mock below, where focusable
          controls would be unreachable to assistive tech. */}
      <div className="flex gap-1 overflow-x-auto border-b border-border bg-muted/60 px-3 py-2.5">
        {pools.map((item, itemIndex) => {
          const active = itemIndex === index;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                startAt.current = itemIndex;
                setTrigger((value) => value + 1);
              }}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
                active
                  ? "bg-navy text-white"
                  : "text-muted-foreground hover:bg-navy/8 hover:text-foreground"
              )}
            >
              <SearchIcon aria-hidden="true" className="size-3.5" />
              {item.tab}
              <span className="sr-only">
                {" "}
                — search {item.kind.toLowerCase()} numbers in {item.region}
              </span>
            </button>
          );
        })}
      </div>

      <div aria-hidden="true" className="p-5 sm:p-6">
        <div className="rounded-2xl border border-border">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="flex gap-1">
              {["bg-red-300", "bg-amber-300", "bg-emerald-300"].map((dot) => (
                <span key={dot} className={cn("size-2 rounded-full", dot)} />
              ))}
            </span>
            <span className="truncate font-mono text-[0.7rem] text-muted-foreground">
              portal.wiretaptelecom.com / numbers / search
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 font-mono text-xs">
              <SearchIcon className="size-3.5 text-muted-foreground" />
              {pool.areaCode}
            </span>
            <span className="rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground">
              {pool.kind}
            </span>
            <span className="rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground">
              {pool.region}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-tint-sky px-3 py-1.5 text-xs font-semibold text-navy-soft">
              <CheckIcon className="size-3.5" />
              Contiguous
            </span>
            <span className="ml-auto text-xs text-muted-foreground">
              {phase === "searching" ? "Searching…" : `${pool.available} available`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
            {numbers.map((number, n) => {
              const isLive = n < activated;
              const isPicked = !isLive && n < selected;
              const isShown = n < revealed;
              return (
                <div
                  key={number}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2.5 ring-1 transition-colors duration-300",
                    !isShown && "animate-pulse bg-muted ring-transparent",
                    isShown && !isPicked && !isLive && "bg-card ring-border",
                    isPicked && "bg-tint-sky ring-brand-blue/35",
                    isLive && "bg-emerald-50 ring-emerald-200"
                  )}
                  // Offset the pulses so an empty grid reads as a search in progress.
                  style={isShown ? undefined : { animationDelay: `${n * 90}ms` }}
                >
                  {isShown ? (
                    <>
                      <span
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                          isLive
                            ? "bg-emerald-600 text-white"
                            : isPicked
                              ? "bg-brand-blue text-white"
                              : "ring-1 ring-border ring-inset"
                        )}
                      >
                        {(isPicked || isLive) && <CheckIcon className="size-2.5" />}
                      </span>
                      <span className="min-w-0">
                        {/* Shrunk on narrow screens so the last digits, the only
                            thing telling the numbers apart, never truncate. */}
                        <span className="block truncate font-mono text-[0.7rem] font-medium sm:text-xs">
                          {number}
                        </span>
                        <span
                          className={cn(
                            "block text-[0.6rem] transition-colors duration-300",
                            isLive
                              ? "font-semibold text-emerald-800"
                              : "text-muted-foreground"
                          )}
                        >
                          {isLive ? "Active" : isPicked ? "In cart" : "Available"}
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="size-4 shrink-0 rounded-full bg-navy/10" />
                      <span className="min-w-0 flex-1 space-y-1.5 py-0.5">
                        <span className="block h-2.5 w-24 max-w-full rounded-full bg-navy/10" />
                        <span className="block h-2 w-10 rounded-full bg-navy/8" />
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
            <span className="text-xs text-muted-foreground">
              {bought ? `${BLOCK} numbers purchased` : `${selected} of ${BLOCK} selected`}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300",
                bought ? "bg-navy/8 text-muted-foreground" : "bg-navy text-white"
              )}
            >
              <ShoppingCartIcon className="size-3.5" />
              {phase === "buying"
                ? "Purchasing…"
                : bought
                  ? "Purchased"
                  : `Buy ${BLOCK} numbers`}
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {services.map((service, s) => {
              const on = s < lit;
              const Icon = service.icon;
              return (
                <span
                  key={service.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-500",
                    on
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-navy/8 text-muted-foreground"
                  )}
                >
                  <Icon className="size-3.5" />
                  {service.label}
                </span>
              );
            })}
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-opacity duration-500",
                "bg-emerald-100 text-emerald-800",
                phase === "protected" ? "opacity-100" : "opacity-0"
              )}
            >
              <KeyRoundIcon className="size-3.5" />
              Port-out PIN
            </span>
          </div>

          <div
            className={cn(
              "rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors duration-500",
              status.tone === "done"
                ? "bg-emerald-50 text-emerald-900"
                : status.tone === "busy"
                  ? "bg-amber-50 text-amber-900"
                  : "bg-brand-blue/8 text-navy-soft"
            )}
          >
            {status.text}
          </div>
        </div>
      </div>
    </div>
  );
}
