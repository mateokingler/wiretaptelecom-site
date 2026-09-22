"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "idle" | "busy" | "warn" | "done";

/** `at` is the millisecond offset into the loop when the stage begins. */
type Stage = { at: number; label: string; tone: Tone };

type Fax = {
  id: string;
  direction: "out" | "in";
  party: string;
  pages: number;
  stages: Stage[];
};

const faxes: Fax[] = [
  {
    id: "out-1",
    direction: "out",
    party: "305-555-0148",
    pages: 6,
    stages: [
      { at: 0, label: "Queued from fax@core-fax.com", tone: "idle" },
      { at: 700, label: "Cover page merged into one document", tone: "busy" },
      { at: 1600, label: "Dialing the destination", tone: "busy" },
      { at: 2600, label: "Transmitting over T.38", tone: "busy" },
      { at: 5200, label: "Delivered, confirmation emailed", tone: "done" },
    ],
  },
  {
    id: "out-2",
    direction: "out",
    party: "816-555-0132",
    pages: 2,
    stages: [
      { at: 400, label: "Queued from the portal", tone: "idle" },
      { at: 1100, label: "Converted to fax format", tone: "busy" },
      { at: 2000, label: "Dialing the destination", tone: "busy" },
      { at: 3400, label: "Far end did not answer on route A", tone: "warn" },
      { at: 4300, label: "Retrying on route B", tone: "warn" },
      { at: 5600, label: "Transmitting over T.38", tone: "busy" },
      { at: 7600, label: "Delivered on the second attempt", tone: "done" },
    ],
  },
  {
    id: "in-1",
    direction: "in",
    party: "404-555-0190",
    pages: 4,
    stages: [
      { at: 1200, label: "Inbound call on a dedicated number", tone: "idle" },
      { at: 2100, label: "Fax tone detected", tone: "busy" },
      { at: 3200, label: "Converting to PDF", tone: "busy" },
      { at: 5000, label: "Emailed to 3 addresses", tone: "done" },
    ],
  },
];

const LOOP = 10600;
const STEP = 100;

/** Swaps at the point the second fax gives up on its first route. */
const ROUTE_SWITCH = 4300;

const toneChip: Record<Tone, string> = {
  idle: "bg-navy/8 text-muted-foreground",
  busy: "bg-tint-sky text-navy-soft",
  warn: "bg-amber-100 text-amber-900",
  done: "bg-emerald-100 text-emerald-800",
};

const toneBar: Record<Tone, string> = {
  idle: "bg-navy/25",
  busy: "bg-brand-blue",
  warn: "bg-amber-500",
  done: "bg-emerald-500",
};

const statusWord: Record<Tone, string> = {
  idle: "Queued",
  busy: "In flight",
  warn: "Retrying",
  done: "Delivered",
};

function stateOf(fax: Fax, elapsed: number) {
  let index = -1;
  for (let i = 0; i < fax.stages.length; i += 1) {
    if (elapsed >= fax.stages[i].at) index = i;
  }
  if (index < 0) {
    return { stage: null, tone: "idle" as Tone, progress: 0, started: false };
  }
  const stage = fax.stages[index];
  return {
    stage,
    tone: stage.tone,
    progress: (index / (fax.stages.length - 1)) * 100,
    started: true,
  };
}

export function FaxTracker() {
  const container = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [elapsed, setElapsed] = useState(0);

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
    let interval = 0;

    const start = window.setTimeout(() => {
      if (reduced) {
        // Land on the finished state so the point survives without motion.
        setElapsed(LOOP);
        return;
      }

      setElapsed(0);
      interval = window.setInterval(() => {
        setElapsed((value) => (value + STEP) % LOOP);
      }, STEP);
    }, 0);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [inView, trigger]);

  const route = elapsed >= ROUTE_SWITCH ? "pstn-route-b" : "pstn-route-a";
  const delivered = faxes.filter((fax) => stateOf(fax, elapsed).tone === "done").length;

  return (
    <div
      ref={container}
      className="overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-navy/8"
    >
      <p className="sr-only">
        A looping demonstration of the Core-Fax tracker. Three faxes move through the
        network at once: an outbound fax whose cover page is merged before sending, a
        second outbound fax that fails on one route and is automatically retried on
        another until it delivers, and an inbound fax that is detected, converted to PDF,
        and emailed to everyone assigned to the number. No fax is charged a page fee.
      </p>

      {/* Kept outside the aria-hidden mock below, where a focusable control would be
          unreachable to assistive tech. */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/60 px-4 py-2.5">
        <span className="font-mono text-[0.7rem] text-muted-foreground">
          portal.wiretaptelecom.com / core-fax / fax-tracker
        </span>
        <button
          type="button"
          onClick={() => setTrigger((value) => value + 1)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-navy-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <RotateCcwIcon aria-hidden="true" className="size-3.5" />
          Replay
          <span className="sr-only"> the fax tracker from the beginning</span>
        </button>
      </div>

      <div aria-hidden="true" className="p-5 sm:p-6">
        <ul className="space-y-3">
          {faxes.map((fax) => {
            const { stage, tone, progress, started } = stateOf(fax, elapsed);
            const Icon = fax.direction === "out" ? ArrowUpRightIcon : ArrowDownLeftIcon;
            return (
              <li
                key={fax.id}
                className={cn(
                  "rounded-2xl p-4 ring-1 transition-colors duration-300",
                  started ? "bg-card ring-border" : "bg-muted/50 ring-transparent"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                        fax.direction === "out"
                          ? "bg-navy text-white"
                          : "bg-tint-sky text-navy-soft"
                      )}
                    >
                      <Icon className="size-3.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-xs font-medium">
                        {fax.direction === "out" ? "To " : "From "}
                        {fax.party}
                      </span>
                      <span className="block text-[0.65rem] text-muted-foreground">
                        {fax.pages} pages
                      </span>
                    </span>
                  </span>

                  <span
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-[0.7rem] font-semibold transition-colors duration-300",
                      started ? toneChip[tone] : "bg-navy/8 text-muted-foreground"
                    )}
                  >
                    {started ? statusWord[tone] : "Waiting"}
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy/8">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      toneBar[tone]
                    )}
                    style={{ width: `${started ? progress : 0}%` }}
                  />
                </div>

                <p
                  className={cn(
                    "mt-2 text-[0.7rem] transition-colors duration-300",
                    tone === "warn" && started
                      ? "font-medium text-amber-900"
                      : "text-muted-foreground"
                  )}
                >
                  {started && stage ? stage.label : "Waiting for the next job"}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "gw-04.kcmo", title: "Gateway" },
              { label: route, title: "Route" },
              { label: "816-555-0140", title: "Fax header" },
            ].map((chip) => (
              <span
                key={chip.title}
                className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-mono text-[0.7rem] text-muted-foreground"
              >
                <span className="font-sans font-semibold text-foreground">
                  {chip.title}
                </span>
                {chip.label}
              </span>
            ))}
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-semibold transition-colors duration-300",
                delivered > 0
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <ShieldCheckIcon className="size-3.5" />
              {delivered} of 3 delivered
            </span>
          </div>

          <div className="rounded-xl bg-brand-blue/8 px-3.5 py-3 text-sm font-semibold text-navy-soft">
            $0.00 in page fees
            <span className="font-normal text-muted-foreground"> · billed as voice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
