import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckIcon } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { SalesForm } from "@/components/sales-form";
import { LogoMarquee } from "@/components/logo-marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Talk to sales",
  description:
    "Tell us what you run today and a US-based telecom specialist will come back with pricing for your actual traffic, a porting plan, and a trunk for your PBX.",
};

const assurances = [
  "Pricing quoted on your real inbound and outbound minutes",
  "Works with 3CX, FreePBX, Yeastar, Asterisk, and any SIP PBX",
  "STIR/SHAKEN signing included at no extra cost",
];

const steps = [
  {
    title: "We read your numbers",
    detail:
      "Minutes, call paths, and the systems you run today. Enough to tell whether metered or unmetered is cheaper for you.",
  },
  {
    title: "A specialist calls you",
    detail:
      "A telecom engineer on our US team, not a script. Bring your PBX questions, your porting list, and your current invoice.",
  },
  {
    title: "You get a trunk and a plan",
    detail:
      "Credentials configured for your PBX, a porting schedule for your existing numbers, and pricing in writing.",
  },
];

const rates = [
  { label: "Metered inbound", value: "$0.0036 / min" },
  { label: "Metered outbound", value: "$0.0054 / min" },
  { label: "Unmetered", value: "$23.99 / mo / call path" },
  { label: "Outbound SMS", value: "$0.0080 / message" },
  { label: "Outbound MMS", value: "$0.0120 / message" },
  { label: "Inbound SMS and MMS", value: "Free" },
];

const faqs = [
  {
    q: "Do I have to sign a contract?",
    a: "The metered plan has no monthly commitment, so you pay only for the minutes you use. Unmetered is billed per call path, per month.",
  },
  {
    q: "Can I keep my existing numbers?",
    a: "Yes. Port local and toll-free numbers you already own, in bulk if you need to. We prepare the paperwork and schedule the cutover with you so there is no gap in service.",
  },
  {
    q: "Which phone systems do you support?",
    a: "We publish setup guides for 3CX, FreePBX, Yeastar, and Asterisk, and we work with any SIP PBX. Authenticate by IP address or registration, whichever your system prefers.",
  },
  {
    q: "What does support look like after I sign?",
    a: "In-house US support by phone and chat, included. You reach telecom specialists directly rather than a tiered ticket queue.",
  },
];

export default function Page() {
  return (
    <>
      <section className="pt-6 pb-16 lg:pb-24">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-10 text-white sm:px-12 lg:px-14 tall:py-20">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            {/*
              Explicit grid placement so the form sits directly under the headline
              on mobile, but still runs alongside the full copy column on desktop.
            */}
            <div className="relative grid gap-8 lg:grid-cols-[1fr_26rem] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-6 tall:gap-y-10">
              <div className="lg:col-start-1 lg:row-start-1">
                <h1 className="display max-w-xl text-4xl sm:text-5xl tall:text-6xl">
                  Talk to a telecom specialist, not a chatbot.
                </h1>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75 tall:mt-6">
                  Tell us what you run today and we will come back with pricing for your
                  actual traffic, on a trunk configured for your PBX.
                </p>
              </div>

              <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <SalesForm />
              </div>

              {/*
                Row 2 is the flexible track, so it absorbs whatever extra height the
                taller form column adds. The list stays up under the intro and the
                phone card holds the bottom edge, so the slack lands between them
                rather than as a gap under the column.
              */}
              <div className="lg:col-start-1 lg:row-start-2 lg:flex lg:h-full lg:flex-col lg:justify-between">
                <ul className="space-y-3 lg:space-y-2.5 tall:space-y-4">
                  {assurances.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80">
                      <CheckIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 rounded-2xl bg-white/8 p-5 ring-1 ring-white/15 lg:mt-6 tall:mt-8 tall:p-6">
                  <p className="text-sm text-white/70">
                    Prefer to just call? US-based specialists, business hours.
                  </p>
                  <PhoneLink
                    icon
                    iconClassName="size-5"
                    className="mt-1.5 inline-flex items-center gap-2.5 text-2xl font-semibold tracking-tight transition-colors hover:text-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background py-10" aria-label="Compatible platforms">
        <p className="shell mb-8 text-center text-sm font-medium text-muted-foreground">
          Already running one of these? We have a setup guide for it
        </p>
        <LogoMarquee />
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="next-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">What happens next</p>
            <h2 id="next-title" className="display mt-4 text-4xl sm:text-5xl">
              Three steps, no runaround.
            </h2>
          </div>
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-muted-foreground">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="rates-title">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">No mystery pricing</p>
            <h2 id="rates-title" className="display mt-4 text-4xl sm:text-5xl">
              You can see the rates before you call.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Our rate card is published. Run your own numbers through the estimator, then
              talk to us about the parts that are specific to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#pricing-title"
                className="text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
              >
                Estimate your monthly bill
              </Link>
              <span className="text-sm text-muted-foreground" aria-hidden>
                ·
              </span>
              <Link
                href="/pricing"
                className="text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
              >
                See the full rate card
              </Link>
            </div>
          </div>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {rates.map((rate) => (
              <div key={rate.label} className="rounded-2xl bg-card p-6 ring-1 ring-navy/8">
                <dt className="text-sm text-muted-foreground">{rate.label}</dt>
                <dd className="mt-1.5 text-xl font-semibold tracking-tight">{rate.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="sales-faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">FAQ</p>
            <h2 id="sales-faq-title" className="display mt-4 text-4xl sm:text-5xl">
              Before you ask.
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

      {/* Zoho web-to-lead analytics. Required by the CRM form. */}
      <Script
        id="wf_anal"
        strategy="afterInteractive"
        src="https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=ed2037c9df6b64d3fc208b3aa335168471d3eaeec49dfd4d16d4646ff9ae56f121ed5b1ab0f0e4e2d401a6dddbf52ac8gid2779172aabfd5456617ed21f94346497b69896ef45124e7a3b2b3a70b4b66027gid3eef927a611fb37eeaa6dc25ee2497464717747a18943a7fc94c75a50a652d7agidc9f57c1dbb08195c93858f7f74df3b4f4d735484eb863b8be97463fcfa57a4d5&tw=8f8b9dfb321886fce431c2df03e0c83639e7e25eda2c322f58761a526d832f4c&version=v2"
      />
    </>
  );
}
