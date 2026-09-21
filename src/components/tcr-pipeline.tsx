"use client";

import { useEffect, useRef, useState } from "react";
import {
  BadgeCheckIcon,
  BuildingIcon,
  CheckIcon,
  FileTextIcon,
  type LucideIcon,
  RotateCcwIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StepState = "pending" | "active" | "done" | "rejected";

type Phase = {
  id: string;
  /** State of the five registration steps, in order. */
  steps: [StepState, StepState, StepState, StepState, StepState];
  /** Whether AT&T, Verizon, and T-Mobile have cleared the campaign. */
  carriers: [boolean, boolean, boolean];
  banner: { tone: "ok" | "warn" | "bad"; text: string };
  /** The rejection reason, shown against the carrier review step. */
  reason?: string;
  hold: number;
};

const steps: { id: string; icon: LucideIcon; name: string; detail: string }[] = [
  {
    id: "brand",
    icon: BuildingIcon,
    name: "Brand filed",
    detail: "Acme Plumbing LLC · EIN and website",
  },
  {
    id: "vetting",
    icon: ScanSearchIcon,
    name: "Brand vetted",
    detail: "Independent vetting sets the trust score",
  },
  {
    id: "campaign",
    icon: FileTextIcon,
    name: "Campaign filed",
    detail: "Customer care · opt-in, HELP, STOP",
  },
  {
    id: "carriers",
    icon: ShieldCheckIcon,
    name: "Carrier review",
    detail: "The mobile operators approve or reject",
  },
  {
    id: "live",
    icon: BadgeCheckIcon,
    name: "Campaign live",
    detail: "Numbers attached, throughput set",
  },
];

const carriers = ["AT&T", "Verizon", "T-Mobile"];

/**
 * One full registration, including the rejection most brands hit on the first
 * pass. The reason is real: missing opt-out language in the sample messages is
 * among the most common causes of a campaign being sent back.
 */
const phases: Phase[] = [
  {
    id: "submitted",
    steps: ["pending", "pending", "pending", "pending", "pending"],
    carriers: [false, false, false],
    banner: { tone: "ok", text: "Brand and campaign forms submitted in the portal" },
    hold: 2400,
  },
  {
    id: "brand",
    steps: ["active", "pending", "pending", "pending", "pending"],
    carriers: [false, false, false],
    banner: { tone: "warn", text: "Filing the brand with The Campaign Registry" },
    hold: 1700,
  },
  {
    id: "vetting",
    steps: ["done", "active", "pending", "pending", "pending"],
    carriers: [false, false, false],
    banner: { tone: "warn", text: "Brand accepted — third-party vetting under way" },
    hold: 1900,
  },
  {
    id: "campaign",
    steps: ["done", "done", "active", "pending", "pending"],
    carriers: [false, false, false],
    banner: { tone: "warn", text: "Trust score assigned — filing the campaign" },
    hold: 1800,
  },
  {
    id: "review",
    steps: ["done", "done", "done", "active", "pending"],
    carriers: [false, false, false],
    banner: { tone: "warn", text: "Campaign with the carriers for review" },
    hold: 2100,
  },
  {
    id: "rejected",
    steps: ["done", "done", "done", "rejected", "pending"],
    carriers: [false, false, false],
    banner: { tone: "bad", text: "Rejected — the campaign comes back with a reason" },
    reason: "Sample messages omit STOP opt-out language",
    hold: 2900,
  },
  {
    id: "refile",
    steps: ["done", "done", "done", "active", "pending"],
    carriers: [false, false, false],
    banner: { tone: "warn", text: "We tell you exactly what to change, then refile" },
    hold: 2300,
  },
  {
    id: "att",
    steps: ["done", "done", "done", "active", "pending"],
    carriers: [true, false, false],
    banner: { tone: "warn", text: "Carriers clearing the campaign one by one" },
    hold: 900,
  },
  {
    id: "verizon",
    steps: ["done", "done", "done", "active", "pending"],
    carriers: [true, true, false],
    banner: { tone: "warn", text: "Carriers clearing the campaign one by one" },
    hold: 900,
  },
  {
    id: "approved",
    steps: ["done", "done", "done", "done", "active"],
    carriers: [true, true, true],
    banner: { tone: "ok", text: "Approved on every major carrier" },
    hold: 1400,
  },
  {
    id: "live",
    steps: ["done", "done", "done", "done", "done"],
    carriers: [true, true, true],
    banner: { tone: "ok", text: "Campaign live — your numbers are sending A2P traffic" },
    hold: 4200,
  },
];

const REJECTION_INDEX = phases.findIndex((phase) => phase.id === "rejected");

const bannerTone = {
  ok: { className: "bg-emerald-50 text-emerald-900 ring-emerald-200", dot: "bg-emerald-500" },
  warn: { className: "bg-amber-50 text-amber-900 ring-amber-200", dot: "bg-amber-500" },
  bad: { className: "bg-red-50 text-red-900 ring-red-200", dot: "bg-red-500" },
};

const stepChip: Record<StepState, { label: string; className: string }> = {
  pending: { label: "Waiting", className: "bg-navy/8 text-muted-foreground" },
  active: { label: "In review", className: "bg-amber-100 text-amber-900" },
  done: { label: "Cleared", className: "bg-emerald-100 text-emerald-800" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
};

const CANCELLED = Symbol("cancelled");

export function TcrPipeline() {
  const container = useRef<HTMLDivElement>(null);
  // Set by the button so the next loop opens on the rejection rather than the top.
  const jumpToRejection = useRef(false);
  const [inView, setInView] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [index, setIndex] = useState(0);

  const phase = phases[index];

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
        setIndex(jumpToRejection.current ? REJECTION_INDEX : phases.length - 1);
        jumpToRejection.current = false;
        return;
      }

      let start = jumpToRejection.current ? REJECTION_INDEX : 0;
      jumpToRejection.current = false;

      for (;;) {
        for (let i = start; i < phases.length; i += 1) {
          setIndex(i);
          await sleep(phases[i].hold);
        }
        start = 0;
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

  const tone = bannerTone[phase.banner.tone];

  return (
    <div
      ref={container}
      className="overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-navy/8"
    >
      <p className="sr-only">
        A looping demonstration of 10DLC registration. The brand is filed with The
        Campaign Registry and vetted, the campaign is filed, and the carriers review it.
        The first submission is rejected for omitting STOP opt-out language from the
        sample messages; we give you the specific reason, refile, and the campaign is
        approved on AT&amp;T, Verizon, and T-Mobile, at which point your numbers can send
        A2P traffic.
      </p>

      {/* The control stays outside the aria-hidden region below: a focusable
          button inside it would be unreachable to assistive tech. */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/60 px-5 py-3.5">
        <p
          aria-hidden="true"
          className="hidden font-mono text-[0.7rem] text-muted-foreground sm:block"
        >
          portal.wiretaptelecom.com / core-sms / tcr form
        </p>
        <button
          type="button"
          onClick={() => {
            jumpToRejection.current = true;
            setTrigger((value) => value + 1);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-navy-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <RotateCcwIcon aria-hidden="true" className="size-3.5" />
          Show me a rejection
          <span className="sr-only"> and replay the registration from that point</span>
        </button>
      </div>

      <div aria-hidden="true" className="p-5 sm:p-6">
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium ring-1 transition-colors duration-500",
            tone.className
          )}
        >
          <span className="relative flex size-2.5 shrink-0">
            <span
              className={cn(
                "absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:hidden",
                tone.dot
              )}
            />
            <span className={cn("relative inline-flex size-2.5 rounded-full", tone.dot)} />
          </span>
          {phase.banner.text}
        </div>

        <ol className="mt-5 space-y-2.5">
          {steps.map((step, stepIndex) => {
            const state = phase.steps[stepIndex];
            const Icon = step.icon;
            const chip = stepChip[state];
            const isCarrierStep = step.id === "carriers";
            return (
              <li
                key={step.id}
                className={cn(
                  "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2.5 rounded-xl border px-3.5 py-3 transition-colors duration-500 sm:grid-cols-[16rem_1fr_auto]",
                  state === "rejected"
                    ? "border-red-200 bg-red-50/40"
                    : state === "done"
                      ? "border-emerald-200 bg-emerald-50/40"
                      : state === "active"
                        ? "border-amber-200 bg-amber-50/40"
                        : "border-border"
                )}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                      state === "done"
                        ? "bg-emerald-500 text-white"
                        : state === "rejected"
                          ? "bg-red-500 text-white"
                          : state === "active"
                            ? "bg-amber-500 text-white"
                            : "bg-navy/8 text-muted-foreground"
                    )}
                  >
                    {state === "done" ? (
                      <CheckIcon className="size-4" />
                    ) : state === "rejected" ? (
                      <XIcon className="size-4" />
                    ) : (
                      <Icon className="size-4" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">
                      {step.name}
                    </span>
                    <span className="block truncate text-[0.7rem] text-muted-foreground">
                      {step.detail}
                    </span>
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  {isCarrierStep ? (
                    <div className="flex flex-wrap gap-1.5">
                      {carriers.map((carrier, carrierIndex) => {
                        const cleared = phase.carriers[carrierIndex];
                        return (
                          <span
                            key={carrier}
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold transition-colors duration-500",
                              cleared
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-navy/8 text-muted-foreground"
                            )}
                          >
                            {cleared && <CheckIcon className="size-3" />}
                            {carrier}
                          </span>
                        );
                      })}
                      {phase.reason && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-[0.7rem] font-semibold text-red-800">
                          {phase.reason}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="relative h-1.5 overflow-hidden rounded-full bg-navy/8">
                      {state === "done" ? (
                        <span className="absolute inset-0 rounded-full bg-emerald-400" />
                      ) : state === "active" ? (
                        <span className="absolute inset-0 animate-pulse rounded-full bg-amber-400/60" />
                      ) : null}
                    </div>
                  )}
                </div>

                <span
                  className={cn(
                    "col-start-2 row-start-1 justify-self-end rounded-full px-2.5 py-1 text-[0.7rem] font-semibold transition-colors duration-500 sm:col-start-3 sm:row-start-auto",
                    chip.className
                  )}
                >
                  {chip.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
