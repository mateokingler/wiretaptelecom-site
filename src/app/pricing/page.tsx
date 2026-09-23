import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckIcon,
  HeadphonesIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";
import { BillEstimator } from "@/components/bill-estimator";
import { RateComparison } from "@/components/rate-comparison";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Published rates for domestic voice across the continental US. Metered from $0.0036 per minute inbound, or unmetered at $23.99 per call path, per month.",
};

/**
 * Every figure on this page comes from the published rate card at
 * wiretaptelecom.com/pricing. Anything the rate card does not price is sent to
 * sales rather than given a number here.
 */
const meteredRates = [
  { direction: "Inbound", price: "$0.0036" },
  { direction: "Outbound", price: "$0.0054" },
];

const meteredFeatures = [
  "No monthly commitment",
  "Pay-as-you-go billing",
  "Real-time usage tracking",
  "Detailed call logs",
  "Flexible scaling",
  "Transparent pricing",
];

const unmeteredFeatures = [
  "Unlimited outbound calls",
  "Unlimited inbound calls",
  "No per-minute charges",
  "Predictable monthly billing",
  "Priority support included",
  "Advanced analytics",
];

const addOns = [
  {
    name: "Local phone number",
    price: "$1.99",
    unit: "per number, per month",
    detail: "Any standard ten-digit number, from any area code in our inventory.",
  },
  {
    name: "Toll-free number",
    price: "$2.99",
    unit: "per number, per month",
    detail: "Nationwide toll-free, active on your trunk within about a minute.",
  },
  {
    name: "Toll-free inbound calling",
    price: "$0.015",
    unit: "per minute",
    detail:
      "Minutes your callers spend reaching you on a toll-free number, billed to you instead of to them, and priced separately from the number itself.",
  },
  {
    name: "Toll-free outbound calling",
    price: "Free",
    unit: "",
    detail: "Calls placed out from a toll-free number carry no per-minute charge.",
    included: true,
  },
  {
    name: "Number porting",
    price: "$5",
    unit: "per number, once",
    detail:
      "A one-time charge on each number you bring across, with volume pricing on larger blocks. Nothing recurring for having ported in.",
  },
  {
    name: "STIR/SHAKEN signing",
    price: "Included",
    unit: "always on",
    detail: "Outbound call authentication, at no extra cost on either plan.",
    included: true,
  },
  {
    name: "Outbound caller ID (CNAM)",
    price: "$0.99",
    unit: "per number, per month",
    detail:
      "Show your business name instead of a bare number on outbound calls, priced per number rather than per account.",
  },
  {
    name: "Inbound caller ID (dip)",
    price: "$0.0031",
    unit: "per call",
    detail: "Caller detail on the way in, for screening and routing decisions.",
  },
  {
    name: "STIR/SHAKEN verification",
    price: "$0.0095",
    unit: "per inbound call",
    detail: "Check the attestation on inbound calls and surface a trust score.",
  },
  {
    name: "E-911",
    price: "$1.49",
    unit: "per location, per month",
    detail: "Registered emergency location, billed per location rather than bundled.",
  },
  {
    name: "Business texting (Core-SMS)",
    price: "$4.99",
    unit: "per month",
    detail:
      "Turns SMS and MMS on for the account. The per-message rates below are billed on top.",
  },
  {
    name: "Inbound SMS and MMS",
    price: "Free",
    unit: "on local numbers",
    detail:
      "Messages you receive on a local number are not billed, on either plan. Toll-free messaging is priced below.",
    included: true,
  },
  {
    name: "Outbound SMS",
    price: "$0.0080",
    unit: "per message",
    detail: "Sent from the portal, Email2SMS, or the API, with delivery confirmations.",
  },
  {
    name: "Outbound MMS",
    price: "$0.0120",
    unit: "per message",
    detail: "Picture and group messaging from the same registered numbers.",
  },
  {
    name: "Toll-free SMS and MMS",
    price: "$0.0120",
    unit: "per message, in or out",
    detail:
      "Texting on a toll-free number, billed the same in both directions. Toll-free traffic runs on its own carrier verification rather than 10DLC.",
  },
  {
    name: "10DLC brand registration",
    price: "$50",
    unit: "once",
    detail:
      "Registers your business with The Campaign Registry. You fill in one form and we prepare and file it, including any refiling if it comes back.",
  },
  {
    name: "10DLC campaign registration",
    price: "$5",
    unit: "per campaign, per month",
    detail:
      "Each approved campaign carries a monthly fee for as long as it is live. Carriers block messages from local numbers without one.",
  },
  {
    name: "Email-to-fax (Core-Fax)",
    price: "$19.99",
    unit: "per month",
    detail:
      "Unlimited fax numbers and email addresses, with no per-page fee. Transmission bills as voice.",
  },
];

const included = [
  {
    icon: HeadphonesIcon,
    title: "In-house US support",
    detail:
      "Phone and live chat with telecom specialists, included on both plans. No tiered ticket queue between you and someone who knows SIP.",
  },
  {
    icon: ZapIcon,
    title: "Free service activations",
    detail:
      "Other carriers bill a setup fee on every number you buy. Ours go live within seconds of purchase, whether you take one or ten thousand, and standing up another trunk costs nothing either.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise-grade security",
    detail:
      "Call authentication, STIR/SHAKEN compliance, and fraud protection on the infrastructure your traffic runs over.",
  },
];

const faqs = [
  {
    q: "Which plan is cheaper for me?",
    a: "It depends on how busy your call paths are. Metered wins when paths sit idle much of the day; unmetered wins once each path carries enough minutes to pass $23.99 a month. The estimator above works out the crossover point for your own inbound and outbound mix.",
  },
  {
    q: "Can I mix metered and unmetered?",
    a: "No. The plan is set at the account level, so everything on the account bills the same way rather than being chosen trunk by trunk. The estimator above prices your whole account both ways, and you can move between plans as your volume changes.",
  },
  {
    q: "Is there a contract or a minimum?",
    a: "No contract either way, and you can move between plans as your volume changes. Metered has no term, though it does carry a $15.99 monthly minimum, so a very quiet month bills at least that much. Unmetered is billed per call path, per month, and you can change your path count whenever your traffic does.",
  },
  {
    q: "What is not included in these rates?",
    a: "The plan rates cover domestic voice for the continental US (lower 48). Phone numbers, porting, toll-free minutes, and the other add-ons are listed above and billed on top. Taxes, regulatory fees, calls to Alaska and Hawaii, and international calling are quoted separately. Ask us for a full quote covering everything you actually use.",
  },
  {
    q: "What does 10DLC cost?",
    a: "Fifty dollars once to register your brand with The Campaign Registry, then $5 a month for each campaign you keep live. We prepare and file both, and refile at no extra charge if a campaign comes back. Registration is only needed for texting from local numbers; toll-free messaging uses its own verification instead.",
  },
  {
    q: "How does STIR/SHAKEN billing work?",
    a: "Signing your outbound calls is always on and free. Verification of inbound calls is the optional part, billed at $0.0095 per call, because it involves a lookup on every call that arrives.",
  },
  {
    q: "What happens to my existing numbers?",
    a: "Port them across, in bulk if you need to. The one-time porting fee is in the add-ons above, with volume pricing once the block gets large enough to ask about. We prepare the paperwork and schedule the cutover so there is no gap in service, and your numbers keep working through the move.",
  },
];

export default function Page() {
  return (
    <>
      {/* Deliberately not the navy card the other heroes use, so it does not
          collide with the navy plan card directly below it. */}
      <section className="relative isolate overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div
          className="absolute -top-48 right-[-18%] -z-10 size-[34rem] rounded-full opacity-[0.13] blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--brand-sky), transparent 68%)",
          }}
          aria-hidden
        />

        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_24rem] lg:gap-16">
            <div>
              <h1 className="display text-4xl sm:text-5xl lg:text-6xl">
                The whole rate card, <span className="text-brand-blue">in public.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Metered or unmetered voice for the lower 48, with the add-ons most
                carriers make you ask about priced right here. Alaska, Hawaii,
                international, and taxes are quoted separately.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
                <Button size="lg" variant="outline" render={<Link href="#estimator" />}>
                  Estimate your bill
                </Button>
              </div>
            </div>

            <RateComparison />
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="plans-title">
        <div className="shell">
          <h2 id="plans-title" className="sr-only">
            Voice plans
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-navy p-8 text-white sm:p-10">
              <div className="aurora absolute inset-0 opacity-45" aria-hidden />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">Metered</h3>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-navy">
                    Most popular
                  </span>
                </div>
                <p className="mt-2 text-white/70">
                  Pay for the minutes you use, above a $15.99 monthly minimum.
                </p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  {meteredRates.map((rate) => (
                    <div
                      key={rate.direction}
                      className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/15"
                    >
                      <dt className="text-xs font-semibold uppercase tracking-wide text-white/55">
                        {rate.direction}
                      </dt>
                      <dd className="mt-2">
                        <span className="text-3xl font-semibold tracking-tight tabular-nums">
                          {rate.price}
                        </span>
                        <span className="ml-1.5 text-sm text-white/60">/ min</span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {meteredFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-white/80"
                    >
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <Button
                    size="lg"
                    className="w-full"
                    render={<Link href="/talk-to-sales" />}
                  >
                    Talk to sales
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8 sm:p-10">
              <h3 className="text-xl font-semibold">Unmetered</h3>
              <p className="mt-2 text-muted-foreground">
                Unlimited calling and a bill you can forecast.
              </p>

              <div className="mt-8 rounded-2xl bg-muted p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Per call path
                </p>
                <p className="mt-2">
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">
                    $23.99
                  </span>
                  <span className="ml-1.5 text-sm text-muted-foreground">/ month</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  A call path is one simultaneous call. Size it to your busiest moment.
                </p>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {unmeteredFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  render={<Link href="/talk-to-sales" />}
                >
                  Talk to sales
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Plans are set at the account level: you run everything metered or everything
            unmetered, not one plan per trunk. You can move between them as your volume
            changes.
          </p>
        </div>
      </section>

      <section
        id="estimator"
        className="scroll-mt-24 bg-muted py-20 lg:py-28"
        aria-labelledby="estimator-title"
      >
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Estimator</p>
            <h2 id="estimator-title" className="display mt-4 text-4xl sm:text-5xl">
              Find out which plan is cheaper for you.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Enter a typical month. We will price it both ways and show you the point
              where unmetered starts to win.
            </p>
          </div>
          <div className="mt-14">
            <BillEstimator />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="addons-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Add-ons</p>
            <h2 id="addons-title" className="display mt-4 text-4xl sm:text-5xl">
              Every extra, with the price next to it.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Add what you need to a trunk and drop it when you do not. Everything below
              is billed on the same invoice as your voice.
            </p>
          </div>

          <dl className="mt-14 border-t border-border">
            {addOns.map((addOn) => (
              <div
                key={addOn.name}
                className="grid gap-2 border-b border-border py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10"
              >
                <div>
                  <dt className="font-semibold">{addOn.name}</dt>
                  <p className="mt-1.5 max-w-xl text-muted-foreground">{addOn.detail}</p>
                </div>
                <dd className="sm:text-right">
                  <span
                    className={cn(
                      "text-xl font-semibold tracking-tight tabular-nums",
                      addOn.included && "text-brand-blue"
                    )}
                  >
                    {addOn.price}
                  </span>
                  {addOn.unit && (
                    <span className="block text-sm text-muted-foreground sm:mt-0.5">
                      {addOn.unit}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Plan rates cover domestic voice across the continental US (lower 48). Taxes,
            regulatory fees, calls to Alaska and Hawaii, and international calling are
            quoted separately.
          </p>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="included-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">No extra cost</p>
            <h2 id="included-title" className="display mt-4 text-4xl sm:text-5xl">
              Things other carriers charge for.
            </h2>
          </div>
          <dl className="mt-14 grid gap-5 md:grid-cols-3">
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-navy text-white">
                    <Icon className="size-5" />
                  </span>
                  <dt className="mt-6 text-lg font-semibold">{item.title}</dt>
                  <dd className="mt-3 text-muted-foreground">{item.detail}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="pricing-faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">FAQ</p>
            <h2 id="pricing-faq-title" className="display mt-4 text-4xl sm:text-5xl">
              Questions about the bill.
            </h2>
          </div>
          <Accordion className="border-t border-border">
            {faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`} className="border-b">
                <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:text-brand-blue hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-base text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-20 text-center text-white sm:px-14">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
                Bring us your last invoice.
              </h2>
              <p className="mt-6 text-lg text-white/75">
                We will price your actual minutes against both plans and tell you which
                one you should be on, even if the answer is a smaller bill than you
                expected.
              </p>
              <div className="mt-10 flex justify-center">
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
