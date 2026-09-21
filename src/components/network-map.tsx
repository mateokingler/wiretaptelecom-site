"use client";

import { useEffect, useRef, useState } from "react";
import { CableIcon, ShieldCheckIcon, WaypointsIcon } from "lucide-react";
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  ORIGINS,
  POPS,
  US_OUTLINE,
  US_STATES,
  type Pop,
} from "@/lib/us-map";
import { cn } from "@/lib/utils";

const distance = (ax: number, ay: number, bx: number, by: number) =>
  Math.hypot(ax - bx, ay - by);

/**
 * A call arc, bowed away from the straight line so overlapping routes stay
 * legible. Longer hops get a proportionally deeper curve.
 */
function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const lift = distance(x1, y1, x2, y2) * 0.22;
  // Perpendicular to the chord, normalised, so the bow is always "above" it.
  const nx = -(y2 - y1);
  const ny = x2 - x1;
  const length = Math.hypot(nx, ny) || 1;
  return `M ${x1} ${y1} Q ${mx + (nx / length) * lift} ${my + (ny / length) * lift} ${x2} ${y2}`;
}

const CANCELLED = Symbol("cancelled");

export function NetworkMap() {
  const container = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const [landed, setLanded] = useState(false);

  const origin = ORIGINS[index % ORIGINS.length];
  const serving = POPS.find((pop) => pop.id === origin.pop) ?? POPS[0];

  // The next-closest region is where this call would go if the serving one
  // dropped, which is the whole point of running more than one.
  const failover = POPS.filter((pop) => pop.id !== serving.id).sort(
    (a, b) =>
      distance(origin.x, origin.y, a.x, a.y) - distance(origin.x, origin.y, b.x, b.y)
  )[0];

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
        setIndex(0);
        setDrawn(true);
        setLanded(true);
        return;
      }

      for (let pass = 0; ; pass += 1) {
        setIndex(pass);
        setDrawn(false);
        setLanded(false);

        await sleep(500);
        setDrawn(true);

        await sleep(1100);
        setLanded(true);

        await sleep(2600);
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

  const facts: { label: string; value: string }[] = [
    { label: "Inbound call from", value: origin.city },
    { label: "Serving region", value: `${serving.city} · ${serving.label}` },
    { label: "If that region drops", value: `${failover.city} · ${failover.label}` },
  ];

  return (
    <div
      ref={container}
      className="relative overflow-hidden rounded-[2rem] bg-navy px-5 py-8 text-white sm:px-10 sm:py-12"
    >
      <div className="aurora absolute inset-0 opacity-40" aria-hidden />

      <p className="sr-only">
        A looping map of the continental United States showing calls arriving from cities
        across the country and routing to the nearest Wiretap region: Atlanta, which hosts
        two points of presence, Miami, or Kansas City. Each call also lists the region it
        would fall back to if the serving region went down.
      </p>

      <div className="relative grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-10">
        <div aria-hidden="true" className="relative">
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="h-auto w-full overflow-visible"
            role="presentation"
          >
            <path d={US_OUTLINE} className="fill-white/8" />
            <path
              d={US_STATES}
              fill="none"
              className="stroke-white/15"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />

            {/* Keyed on the origin so the draw animation restarts each pass. */}
            {drawn && (
              <path
                key={origin.city}
                d={arcPath(origin.x, origin.y, serving.x, serving.y)}
                pathLength={1}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                className="arc-draw stroke-brand-sky"
              />
            )}

            <circle
              cx={origin.x}
              cy={origin.y}
              r={5}
              className="fill-white transition-opacity duration-500"
            />
            <circle
              cx={origin.x}
              cy={origin.y}
              r={11}
              className="fill-none stroke-white/40"
              strokeWidth={1.5}
            />

            {POPS.map((pop) => (
              <PopMarker
                key={pop.id}
                pop={pop}
                active={pop.id === serving.id && landed}
                standby={pop.id === failover.id}
              />
            ))}
          </svg>

          {/* Labels live in HTML, not in the SVG: inside a viewBox that scales
              from ~600px to ~340px they would shrink to about six pixels. */}
          {POPS.map((pop) => (
            <span
              key={pop.id}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-full whitespace-nowrap text-[0.7rem] font-semibold transition-colors duration-500",
                pop.id === serving.id && landed ? "text-primary" : "text-white/70"
              )}
              style={{
                left: `${(pop.x / MAP_WIDTH) * 100}%`,
                top: `${((pop.y - 14) / MAP_HEIGHT) * 100}%`,
              }}
            >
              {pop.label}
            </span>
          ))}
        </div>

        <div>
          <p className="eyebrow text-brand-sky">Live routing</p>
          <h3 className="display mt-3 text-2xl sm:text-3xl">
            Four points of presence, three regions.
          </h3>
          <p className="mt-4 leading-relaxed text-white/75">
            Every trunk terminates in Atlanta, Miami, and Kansas City at once. A call
            takes the closest region, and the others are already standing by, not waiting
            to be provisioned.
          </p>

          <dl className="mt-7 space-y-3.5">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-white/12 pb-3.5"
              >
                <dt className="text-sm text-white/60">{fact.label}</dt>
                <dd className="font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 space-y-2.5 text-sm text-white/75">
            <li className="flex items-center gap-2.5">
              <CableIcon className="size-4 shrink-0 text-brand-sky" />
              Direct interconnects to mobile operators in the same buildings
            </li>
            <li className="flex items-center gap-2.5">
              <WaypointsIcon className="size-4 shrink-0 text-brand-sky" />
              Up to septuple media gateway redundancy per region
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheckIcon className="size-4 shrink-0 text-brand-sky" />
              STIR/SHAKEN signing on every outbound call
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PopMarker({
  pop,
  active,
  standby,
}: {
  pop: Pop;
  active: boolean;
  standby: boolean;
}) {
  return (
    <g>
      {active && (
        /* An SVG element scales about the viewBox origin unless the transform is
           boxed to the shape itself, which sent the ping drifting off the pin. */
        <circle
          cx={pop.x}
          cy={pop.y}
          r={18}
          className="origin-center fill-primary/25 [transform-box:fill-box] motion-safe:animate-ping"
        />
      )}
      <circle
        cx={pop.x}
        cy={pop.y}
        r={9}
        className={cn(
          "transition-all duration-500",
          active ? "fill-primary" : standby ? "fill-brand-sky/70" : "fill-white/35"
        )}
      />
      <circle cx={pop.x} cy={pop.y} r={3.5} className="fill-navy" />
    </g>
  );
}
