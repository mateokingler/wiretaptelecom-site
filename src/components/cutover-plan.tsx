"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, PhoneMissedIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL = 42;

const steps = [
  "Test trunk",
  "Routes built once",
  "Port window",
  "Old trunk off",
] as const;

type Phase = {
  step: number;
  /** Numbers living on our network rather than the carrier being left. */
  ported: number;
  routes: number;
  answered: number;
  caption: string;
  hold: number;
};

const phases: Phase[] = [
  {
    step: 0,
    ported: 0,
    routes: 0,
    answered: 0,
    caption: "A free trunk, built beside the carrier you are still paying",
    hold: 1700,
  },
  {
    step: 1,
    ported: 0,
    routes: TOTAL,
    answered: 46,
    caption: "Temporary numbers present as the real ones, so calls land early",
    hold: 2100,
  },
  {
    step: 2,
    ported: 16,
    routes: TOTAL,
    answered: 118,
    caption: "FOC day: numbers move in batches while the phones keep ringing",
    hold: 1500,
  },
  {
    step: 2,
    ported: TOTAL,
    routes: TOTAL,
    answered: 173,
    caption: "As each number lands, the temporary path retires itself",
    hold: 1800,
  },
  {
    step: 3,
    ported: TOTAL,
    routes: TOTAL,
    answered: 268,
    caption: "Old trunk disconnected. One carrier, one invoice",
    hold: 3200,
  },
];

const CANCELLED = Symbol("cancelled");

export function CutoverPlan() {
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
        // Land on the finished cutover so the point survives without motion.
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

  const phase = phases[index];
  const moved = (phase.ported / TOTAL) * 100;

  const figures = [
    {
      value: `${phase.routes}`,
      label: "Inbound routes built",
      note: phase.routes === 0 ? "Waiting on the trunk" : "None of them throwaway",
    },
    {
      value: `${phase.answered}`,
      label: "Calls answered on the new trunk",
      note:
        phase.answered === 0
          ? "Nothing routed here yet"
          : phase.step >= 3
            ? "Across the whole cutover"
            : "Before the port even completed",
    },
  ];

  return (
    <div
      ref={container}
      className="overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-navy/8"
    >
      <p className="sr-only">
        A looping walkthrough of a 42-number cutover. A test trunk is built alongside the
        business&apos;s current carrier, then all 42 inbound routes are built once on the
        new trunk, with temporary numbers presented to the PBX as the permanent ones so
        calls arrive before the port completes. On FOC day the numbers move in batches and
        the temporary path retires itself as each one lands. The old trunk is then
        disconnected. No calls are missed at any stage.
      </p>

      <div aria-hidden="true">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border bg-muted/60 px-4 py-3">
          <span className="min-w-0">
            <span className="block truncate text-xs font-semibold">
              Cutover plan · Meridian Fabrication
            </span>
            <span className="block truncate text-[0.65rem] text-muted-foreground">
              42 numbers · 8 call paths · one PBX staying put
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[0.7rem] font-semibold text-emerald-800">
            <PhoneMissedIcon className="size-3.5" />0 calls missed
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <ol className="grid gap-2 sm:grid-cols-4">
            {steps.map((step, i) => {
              const done = i < phase.step;
              const active = i === phase.step;
              return (
                <li
                  key={step}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors duration-500",
                    active && "bg-navy text-white",
                    done && "bg-tint-sky text-navy-soft",
                    !active && !done && "bg-muted text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full text-[0.6rem]",
                      active && "bg-white/15 text-white",
                      done && "bg-brand-blue text-white",
                      !active && !done && "bg-navy/8 text-navy-soft"
                    )}
                  >
                    {done ? <CheckIcon className="size-3" /> : i + 1}
                  </span>
                  <span className="truncate">{step}</span>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 rounded-2xl bg-muted p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-sm font-semibold">Where the numbers live</span>
              <span className="font-mono text-sm">
                {phase.ported} of {TOTAL} moved
              </span>
            </div>

            <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-navy/10">
              <span
                className="bg-brand-blue transition-[width] duration-700 ease-out"
                style={{ width: `${moved}%` }}
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.7rem] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-brand-blue" />
                On our network
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-navy/20" />
                Still with the carrier you are leaving
              </span>
            </div>
          </div>

          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {figures.map((figure) => (
              <div key={figure.label} className="rounded-2xl bg-muted p-5">
                <dt className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
                  {figure.label}
                </dt>
                <dd className="display mt-2 text-2xl text-brand-blue">{figure.value}</dd>
                <dd className="mt-1 text-[0.7rem] text-muted-foreground">
                  {figure.note}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
            {phase.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
