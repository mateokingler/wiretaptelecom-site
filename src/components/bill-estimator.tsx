"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Published rates from wiretaptelecom.com/pricing.
 * Domestic voice, continental US (lower 48).
 */
const RATES = {
  unmeteredPerPath: 23.99,
  meteredInbound: 0.0036,
  meteredOutbound: 0.0054,
  // Inbound messaging is free, so only outbound needs a rate.
  outboundSms: 0.008,
  outboundMms: 0.012,
  localNumber: 1.99,
};

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const count = new Intl.NumberFormat("en-US");

type SliderProps = {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
};

function Slider({ label, hint, value, min, max, step, display, onChange }: SliderProps) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <span className="font-mono text-sm font-semibold tabular-nums">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2.5 w-full accent-brand-blue"
      />
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export function BillEstimator() {
  const [paths, setPaths] = useState(10);
  const [numbers, setNumbers] = useState(10);
  const [inbound, setInbound] = useState(6000);
  const [outbound, setOutbound] = useState(9000);
  const [sms, setSms] = useState(1000);
  const [mms, setMms] = useState(100);

  const meteredVoice = inbound * RATES.meteredInbound + outbound * RATES.meteredOutbound;
  const unmeteredVoice = paths * RATES.unmeteredPerPath;

  const addOns =
    numbers * RATES.localNumber + sms * RATES.outboundSms + mms * RATES.outboundMms;

  const meteredTotal = meteredVoice + addOns;
  const unmeteredTotal = unmeteredVoice + addOns;
  const meteredWins = meteredTotal <= unmeteredTotal;
  const savings = Math.abs(meteredTotal - unmeteredTotal);

  // Minutes at which unmetered overtakes metered, holding the current in/out mix.
  const totalMinutes = inbound + outbound;
  const outShare = totalMinutes === 0 ? 0.5 : outbound / totalMinutes;
  const blendedRate =
    (1 - outShare) * RATES.meteredInbound + outShare * RATES.meteredOutbound;
  const breakEven = Math.round(unmeteredVoice / blendedRate);

  const voiceLines = meteredWins
    ? [
        {
          label: `Inbound · ${count.format(inbound)} min × $0.0036`,
          value: inbound * RATES.meteredInbound,
        },
        {
          label: `Outbound · ${count.format(outbound)} min × $0.0054`,
          value: outbound * RATES.meteredOutbound,
        },
      ]
    : [
        {
          label: `${count.format(paths)} call ${paths === 1 ? "path" : "paths"} × $23.99`,
          value: unmeteredVoice,
        },
      ];

  const addOnLines = [
    numbers > 0 && {
      label: `${count.format(numbers)} local ${numbers === 1 ? "number" : "numbers"} × $1.99`,
      value: numbers * RATES.localNumber,
    },
    sms > 0 && {
      label: `Outbound SMS · ${count.format(sms)} × $0.0080`,
      value: sms * RATES.outboundSms,
    },
    mms > 0 && {
      label: `Outbound MMS · ${count.format(mms)} × $0.0120`,
      value: mms * RATES.outboundMms,
    },
  ].filter(Boolean) as { label: string; value: number }[];

  const total = meteredWins ? meteredTotal : unmeteredTotal;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8 sm:p-10">
        <h3 className="text-lg font-semibold">Your usage</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Drag to match a typical month. Nothing is sent anywhere.
        </p>

        {/* Spreads the controls down the card so it keeps pace with the taller summary. */}
        <div className="mt-8 flex flex-1 flex-col justify-between gap-7">
          <Slider
            label="Concurrent call paths"
            hint="How many calls run at once at your busiest moment."
            value={paths}
            min={1}
            max={60}
            step={1}
            display={count.format(paths)}
            onChange={setPaths}
          />
          <Slider
            label="Local phone numbers"
            hint="$1.99 per number, per month. Toll-free numbers are $2.99."
            value={numbers}
            min={0}
            max={250}
            step={1}
            display={count.format(numbers)}
            onChange={setNumbers}
          />
          <Slider
            label="Inbound minutes"
            hint="Billed at $0.0036 per minute on the metered plan."
            value={inbound}
            min={0}
            max={120000}
            step={500}
            display={`${count.format(inbound)} min`}
            onChange={setInbound}
          />
          <Slider
            label="Outbound minutes"
            hint="Billed at $0.0054 per minute on the metered plan."
            value={outbound}
            min={0}
            max={120000}
            step={500}
            display={`${count.format(outbound)} min`}
            onChange={setOutbound}
          />
          <Slider
            label="Outbound SMS"
            hint="$0.0080 per message sent. Messages you receive are free."
            value={sms}
            min={0}
            max={25000}
            step={250}
            display={count.format(sms)}
            onChange={setSms}
          />
          <Slider
            label="Outbound MMS"
            hint="$0.0120 per picture or group message sent."
            value={mms}
            min={0}
            max={10000}
            step={100}
            display={count.format(mms)}
            onChange={setMms}
          />
        </div>
      </div>

      <div className="flex flex-col rounded-[1.75rem] bg-navy p-8 text-white sm:p-10">
        <h3 className="text-lg font-semibold">Estimated monthly bill</h3>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { name: "Metered", value: meteredTotal, best: meteredWins },
            { name: "Unmetered", value: unmeteredTotal, best: !meteredWins },
          ].map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl p-4 ring-1 transition-colors",
                plan.best ? "bg-white/10 ring-primary/60" : "ring-white/15"
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-white/55">
                {plan.name}
              </p>
              <p className="mt-2 text-2xl font-semibold tabular-nums">
                {usd.format(plan.value)}
              </p>
              {plan.best && (
                <p className="mt-1.5 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-primary">
                  <CheckIcon className="size-3" />
                  Lower for you
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm text-white/70">
          {savings < 0.005 ? (
            <>Both plans cost about the same at this usage.</>
          ) : (
            <>
              {meteredWins ? "Metered" : "Unmetered"} saves you{" "}
              <span className="font-semibold text-white">{usd.format(savings)}</span> a
              month. {meteredWins ? "Unmetered wins above" : "Metered wins below"} roughly{" "}
              <span className="font-semibold text-white">{count.format(breakEven)}</span>{" "}
              minutes at {count.format(paths)} call {paths === 1 ? "path" : "paths"}.
            </>
          )}
        </p>

        <dl className="mt-7 space-y-2.5 border-t border-white/15 pt-6 text-sm">
          {[...voiceLines, ...addOnLines].map((line) => (
            <div key={line.label} className="flex items-baseline gap-4">
              <dt className="text-white/65">{line.label}</dt>
              <dd className="ml-auto shrink-0 font-mono tabular-nums">
                {usd.format(line.value)}
              </dd>
            </div>
          ))}
          <div className="flex items-baseline gap-4">
            <dt className="text-white/65">Inbound SMS and MMS</dt>
            <dd className="ml-auto shrink-0 font-semibold text-primary">Free</dd>
          </div>
          <div className="flex items-baseline gap-4">
            <dt className="text-white/65">STIR/SHAKEN signing</dt>
            <dd className="ml-auto shrink-0 font-semibold text-primary">Included</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-baseline gap-4 border-t border-white/15 pt-5">
          <p className="font-semibold">Total · {meteredWins ? "metered" : "unmetered"}</p>
          <p className="ml-auto text-3xl font-semibold tabular-nums">
            {usd.format(total)}
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-white/50">
          Estimate only, using published rates for domestic voice across the continental
          US. Taxes, regulatory fees, toll-free calling, and one-time porting are not
          included.{" "}
          <Link href="/pricing" className="underline underline-offset-2 hover:text-white">
            See the full rate card
          </Link>
          .
        </p>

        <Button size="lg" className="mt-7 w-full" render={<Link href="/talk-to-sales" />}>
          Talk to sales
        </Button>
      </div>
    </div>
  );
}
