"use client";

import { useEffect, useRef, useState } from "react";
import {
  BuildingIcon,
  CheckIcon,
  PhoneForwardedIcon,
  RadioTowerIcon,
  SmartphoneIcon,
  TriangleAlertIcon,
  ZapIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type LaneState = "live" | "standby" | "failed" | "probing";

type Phase = {
  id: string;
  /** State of the primary, backup, and forward lanes, in that order. */
  lanes: [LaneState, LaneState, LaneState];
  /** Where the call is being delivered right now. */
  landing: { icon: LucideIcon; label: string; sub: string; tone: "ok" | "warn" };
  banner: { tone: "ok" | "warn" | "bad"; text: string };
  hold: number;
};

const OFFICE = "Main office PBX · 203.0.113.24";
const MOBILE = "On-call mobile · +1 816 555 0142";

/**
 * One full outage cycle: healthy, primary cut, backup takes over, site goes
 * dark entirely, calls forward off-net, then everything recovers on its own.
 */
const phases: Phase[] = [
  {
    id: "normal",
    lanes: ["live", "standby", "standby"],
    landing: { icon: BuildingIcon, label: OFFICE, sub: "Primary circuit", tone: "ok" },
    banner: { tone: "ok", text: "All calls delivering over the primary trunk" },
    hold: 3400,
  },
  {
    id: "cut",
    lanes: ["failed", "standby", "standby"],
    landing: { icon: BuildingIcon, label: OFFICE, sub: "Circuit lost", tone: "warn" },
    banner: { tone: "bad", text: "Primary circuit lost — fiber cut at the site" },
    hold: 1500,
  },
  {
    id: "detect",
    lanes: ["failed", "probing", "standby"],
    landing: { icon: BuildingIcon, label: OFFICE, sub: "Rerouting", tone: "warn" },
    banner: { tone: "warn", text: "Outage detected, moving calls to the backup trunk" },
    hold: 1600,
  },
  {
    id: "backup",
    lanes: ["failed", "live", "standby"],
    landing: { icon: BuildingIcon, label: OFFICE, sub: "Backup circuit", tone: "ok" },
    banner: { tone: "ok", text: "Calls delivering over the backup trunk" },
    hold: 3400,
  },
  {
    id: "site-down",
    lanes: ["failed", "failed", "probing"],
    landing: { icon: BuildingIcon, label: OFFICE, sub: "Site offline", tone: "warn" },
    banner: { tone: "bad", text: "Site lost power — both circuits are down" },
    hold: 1800,
  },
  {
    id: "forward",
    lanes: ["failed", "failed", "live"],
    landing: { icon: SmartphoneIcon, label: MOBILE, sub: "Failover forward", tone: "ok" },
    banner: { tone: "ok", text: "Calls forwarding off-net to the on-call mobile" },
    hold: 3600,
  },
  {
    id: "restore",
    lanes: ["probing", "standby", "standby"],
    landing: { icon: BuildingIcon, label: OFFICE, sub: "Recovering", tone: "warn" },
    banner: { tone: "warn", text: "Power restored — primary circuit coming back" },
    hold: 1800,
  },
];

const lanes: { id: string; icon: LucideIcon; name: string; detail: string }[] = [
  { id: "primary", icon: ZapIcon, name: "Primary trunk", detail: "Fiber · 203.0.113.24" },
  { id: "backup", icon: RadioTowerIcon, name: "Backup trunk", detail: "Secondary circuit" },
  {
    id: "forward",
    icon: PhoneForwardedIcon,
    name: "Failover forward",
    detail: "Off-net to mobile",
  },
];

const laneChip: Record<LaneState, { label: string; className: string }> = {
  live: { label: "Carrying calls", className: "bg-emerald-100 text-emerald-800" },
  standby: { label: "Standby", className: "bg-navy/8 text-muted-foreground" },
  failed: { label: "Down", className: "bg-red-100 text-red-800" },
  probing: { label: "Taking over", className: "bg-amber-100 text-amber-900" },
};

const bannerTone = {
  ok: { className: "bg-emerald-50 text-emerald-900 ring-emerald-200", dot: "bg-emerald-500" },
  warn: { className: "bg-amber-50 text-amber-900 ring-amber-200", dot: "bg-amber-500" },
  bad: { className: "bg-red-50 text-red-900 ring-red-200", dot: "bg-red-500" },
};

const CANCELLED = Symbol("cancelled");

export function FailoverDemo() {
  const container = useRef<HTMLDivElement>(null);
  // Set by the button so the next loop starts at the cut rather than the top.
  const jumpToCut = useRef(false);
  const [inView, setInView] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [index, setIndex] = useState(0);

  const phase = phases[index];

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
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
        // Show the moment that makes the point, with no motion.
        setIndex(phases.findIndex((p) => p.id === "backup"));
        return;
      }

      let start = jumpToCut.current ? 1 : 0;
      jumpToCut.current = false;

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
  const LandingIcon = phase.landing.icon;

  return (
    <div
      ref={container}
      className="overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-navy/8"
    >
      <p className="sr-only">
        A looping demonstration of voice failover. Calls run over the primary trunk until
        the circuit is cut, at which point they move automatically to the backup trunk.
        When the whole site loses power, calls forward off-net to an on-call mobile, and
        everything returns to the primary trunk once the outage clears. Failover is not
        billed.
      </p>

      {/* The control stays outside the aria-hidden region below: a focusable
          button inside it would be unreachable to assistive tech. */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/60 px-5 py-3.5">
        <p
          aria-hidden="true"
          className="hidden font-mono text-[0.7rem] text-muted-foreground sm:block"
        >
          portal.wiretaptelecom.com / routing / failover
        </p>
        <button
          type="button"
          onClick={() => {
            jumpToCut.current = true;
            setTrigger((value) => value + 1);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-navy-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <TriangleAlertIcon aria-hidden="true" className="size-3.5" />
          Cut the circuit
          <span className="sr-only"> and replay the failover demonstration</span>
        </button>
      </div>

      <div aria-hidden="true">
        <div className="p-5 sm:p-6">
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

          <ul className="mt-5 space-y-2.5">
            {lanes.map((lane, laneIndex) => {
              const state = phase.lanes[laneIndex];
              const Icon = lane.icon;
              const chip = laneChip[state];
              return (
                <li
                  key={lane.id}
                  className={cn(
                    "grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 rounded-xl border px-3.5 py-3 transition-colors duration-500 sm:grid-cols-[13rem_1fr_auto]",
                    state === "failed"
                      ? "border-red-200 bg-red-50/40"
                      : state === "live"
                        ? "border-emerald-200 bg-emerald-50/40"
                        : state === "probing"
                          ? "border-amber-200 bg-amber-50/40"
                          : "border-border"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                        state === "live"
                          ? "bg-emerald-500 text-white"
                          : state === "failed"
                            ? "bg-red-500 text-white"
                            : state === "probing"
                              ? "bg-amber-500 text-white"
                              : "bg-navy/8 text-muted-foreground"
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">
                        {lane.name}
                      </span>
                      <span className="block truncate text-[0.7rem] text-muted-foreground">
                        {lane.detail}
                      </span>
                    </span>
                  </div>

                  {/* The track: a dot runs it when live, it breaks when failed. */}
                  <div className="col-span-2 sm:col-span-1">
                    <div className="relative h-1.5 overflow-hidden rounded-full bg-navy/8">
                      {state === "failed" ? (
                        <div className="absolute inset-0 flex items-center">
                          <span className="h-1.5 w-[42%] rounded-full bg-red-300" />
                          <span className="grow" />
                          <span className="h-1.5 w-[42%] rounded-full bg-red-300" />
                        </div>
                      ) : state === "live" ? (
                        <span className="packet absolute top-0 h-1.5 w-1/3 rounded-full bg-emerald-500" />
                      ) : state === "probing" ? (
                        <span className="absolute inset-0 animate-pulse rounded-full bg-amber-400/60" />
                      ) : null}
                    </div>
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
          </ul>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3.5 py-3 transition-colors duration-500",
                phase.landing.tone === "ok" ? "bg-muted" : "bg-amber-50"
              )}
            >
              <LandingIcon className="size-4 shrink-0 text-brand-blue" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">
                  {phase.landing.label}
                </span>
                <span className="block text-[0.7rem] text-muted-foreground">
                  Delivering via {phase.landing.sub.toLowerCase()}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-brand-blue/8 px-3.5 py-3 text-sm font-semibold text-navy-soft">
              <CheckIcon className="size-4" />
              Failover cost $0.00
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
