"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Rate = {
  name: string;
  /** Kept as a string so each provider's published precision survives. */
  display: string;
  value: number;
  ours?: boolean;
};

type DirectionConfig = {
  label: string;
  note: string;
  rates: Rate[];
};

/**
 * Competitor figures are each provider's published US domestic list rate,
 * checked September 2026. Only providers we undercut on both directions are
 * listed, so the same set holds whichever tab is open.
 */
const directions: Record<"outbound" | "inbound", DirectionConfig> = {
  outbound: {
    label: "Outbound",
    note: "per minute, US lower 48",
    rates: [
      { name: "Wiretap", display: "$0.0054", value: 0.0054, ours: true },
      { name: "Flowroute", display: "$0.00833", value: 0.00833 },
      { name: "Bandwidth", display: "$0.0100", value: 0.01 },
    ],
  },
  inbound: {
    label: "Inbound",
    note: "per minute, local numbers",
    rates: [
      { name: "Wiretap", display: "$0.0036", value: 0.0036, ours: true },
      { name: "Flowroute", display: "$0.0050", value: 0.005 },
      { name: "Bandwidth", display: "$0.0055", value: 0.0055 },
    ],
  },
};

type Direction = keyof typeof directions;

export function RateComparison() {
  const [direction, setDirection] = useState<Direction>("outbound");
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    // Bars start empty and fill on the next frame, so the reveal reads as
    // motion rather than a chart that was always sitting there.
    const frame = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const active = directions[direction];
  const ours = active.rates.find((rate) => rate.ours)!;
  const ceiling = Math.max(...active.rates.map((rate) => rate.value));

  return (
    <div className="rounded-[1.75rem] bg-card p-6 shadow-xl shadow-navy/10 ring-1 ring-navy/10 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Cost per minute</h2>
        <div
          role="group"
          aria-label="Call direction"
          className="flex gap-1 rounded-full bg-muted p-1 ring-1 ring-navy/8"
        >
          {(Object.keys(directions) as Direction[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={direction === key}
              onClick={() => setDirection(key)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                direction === key
                  ? "bg-navy text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {directions[key].label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-1 text-xs text-muted-foreground">{active.note}</p>

      <ul className="mt-6 space-y-4">
        {active.rates.map((rate, index) => (
          <li key={rate.name}>
            {/* Our row centres because the logo is taller than the text line;
                the rest stay on the baseline so "1.5× our rate" sits level
                with the price next to it. */}
            <div
              className={cn(
                "flex justify-between gap-3",
                rate.ours ? "items-center" : "items-baseline"
              )}
            >
              {rate.ours ? (
                <Image
                  src="/brand/logo.webp"
                  alt={rate.name}
                  width={172}
                  height={34}
                  className="h-7 w-auto"
                />
              ) : (
                <span className="text-sm font-semibold text-muted-foreground">
                  {rate.name}
                </span>
              )}
              <span className="flex items-baseline gap-2">
                {!rate.ours && (
                  <span className="text-[0.7rem] font-medium text-muted-foreground/75">
                    {(rate.value / ours.value).toFixed(1)}× our rate
                  </span>
                )}
                <span
                  className={cn(
                    "font-mono text-sm tabular-nums",
                    rate.ours ? "font-semibold text-brand-blue" : "text-muted-foreground"
                  )}
                >
                  {rate.display}
                </span>
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none",
                  rate.ours ? "bg-brand-blue" : "bg-navy/20"
                )}
                style={{
                  width: armed ? `${(rate.value / ceiling) * 100}%` : "0%",
                  transitionDelay: `${index * 110}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-border pt-4 text-[0.7rem] leading-relaxed text-muted-foreground/80">
        Published US list rates from each provider&apos;s pricing page, September 2026.
      </p>
    </div>
  );
}
