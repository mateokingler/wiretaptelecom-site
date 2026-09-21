import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  GaugeIcon,
  HashIcon,
  MessageSquareIcon,
  PhoneCallIcon,
  PrinterIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";
import { LogoMarquee, logoByName, logoSizes } from "@/components/logo-marquee";
import { BillEstimator } from "@/components/bill-estimator";
import { HeroDemo } from "@/components/hero-demo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const jobs = [
  {
    title: "Create a trunk",
    detail: "Name it, then choose IP authentication or registration.",
  },
  { title: "Assign DIDs", detail: "Point a number at a trunk from number management." },
  { title: "Set failover", detail: "Failover is configured on the phone number." },
  {
    title: "Read call and fax logs",
    detail: "See what completed, and what did not, from one place.",
  },
  { title: "Send SMS", detail: "Use the portal, Email2SMS, or the PBX integration." },
];

const pbx = [
  { href: "/docs/configuring-your-trunk-with-3cx-v20", name: "3CX" },
  { href: "/docs/configuring-your-trunk-with-freepbx-17-registration", name: "FreePBX" },
  { href: "/docs/configuring-your-trunk-with-yeastar-p-series", name: "Yeastar" },
  // No Asterisk-specific guide, so this goes to the generic trunk walkthrough.
  { href: "/docs/creating-a-sip-trunk", name: "Asterisk" },
];

const pillars = [
  {
    icon: ZapIcon,
    title: "Turned up the same day",
    description:
      "Create a trunk, authenticate by IP or registration, point your PBX at it, and place a call. No provisioning queue.",
  },
  {
    icon: GaugeIcon,
    title: "Scale without rebuying",
    description:
      "Add call paths, numbers, and client accounts as you win them. Move the account between metered and unmetered whenever the maths changes.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Compliance included",
    description:
      "STIR/SHAKEN signing on outbound, E911 per location, and 10DLC registration handled inside the portal.",
  },
];

const audiences = [
  {
    href: "/solutions/msps",
    title: "MSPs",
    description:
      "Sell voice to your clients at your own prices, without becoming a carrier yourself.",
    points: [
      "Buy direct, not through a reseller",
      "You set the price",
      "Multi-tenant accounts",
    ],
  },
  {
    href: "/solutions/business",
    title: "Businesses on a PBX",
    description:
      "Connect 3CX, FreePBX, Yeastar, Asterisk, or any SIP PBX without replacing the phone system.",
    points: ["Keep your PBX", "Port your numbers", "Per-PBX templates"],
  },
  {
    href: "/fax",
    title: "Teams replacing fax machines",
    description:
      "Keep the fax number. Faxes arrive as PDFs in the inbox you already use.",
    points: ["Email to fax", "Fax ATA gateway", "No page fees"],
  },
];

/** Published rates from wiretaptelecom.com/pricing. */
const rateCard = [
  { label: "Metered inbound", value: "$0.0036 / min" },
  { label: "Metered outbound", value: "$0.0054 / min" },
  { label: "Unmetered", value: "$23.99 / mo / call path" },
  { label: "Outbound caller ID (CNAM)", value: "$0.99 / mo" },
  { label: "Inbound caller ID (dip)", value: "$0.0031 / call" },
  { label: "STIR/SHAKEN verification", value: "$0.0095 / call" },
  { label: "E-911", value: "$1.49 / location" },
  { label: "Inbound SMS and MMS", value: "Free" },
  { label: "Outbound SMS", value: "$0.0080 / message" },
  { label: "Outbound MMS", value: "$0.0120 / message" },
];

const compliance = [
  {
    title: "STIR/SHAKEN",
    description:
      "Signing is included on outbound calls. Verification of inbound calls is a separate add-on.",
  },
  {
    title: "E911",
    description:
      "Emergency location service is billed per location, not buried in a bundle.",
  },
  {
    title: "10DLC",
    description: "Business texting on local numbers goes through 10DLC registration.",
  },
  {
    title: "Support",
    description: "Published support coverage is 24/7, by phone at (877) 471-3603.",
  },
];

const faqs = [
  {
    q: "What is SIP trunking, and how does it benefit MSPs?",
    a: "SIP trunking allows MSPs to deliver voice services over the internet instead of traditional phone lines. It provides cost savings, scalability, and flexibility, making it easier for MSPs to manage communications for their clients.",
  },
  {
    q: "Can I manage multiple clients from one platform?",
    a: "Absolutely! Our centralized portal is designed for MSPs to manage multiple accounts, configure SIP trunks, and monitor usage all in one place.",
  },
  {
    q: "What PBX systems are compatible with Wiretap Telecom?",
    a: "We support a wide range of PBX systems, including 3CX, FreePBX, Yeastar, Asterisk, and virtually any SIP-capable platform.",
  },
];

function TrunkVisual() {
  return (
    <div className="space-y-2.5">
      {[
        { label: "main-trunk", state: "IP auth" },
        { label: "branch-02", state: "Register" },
        { label: "failover", state: "Standby" },
      ].map((row, index) => (
        <div
          key={row.label}
          className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-2.5 shadow-sm ring-1 ring-navy/5"
        >
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ background: index === 2 ? "var(--primary)" : "var(--brand-blue)" }}
          />
          <span className="font-mono text-xs text-foreground">{row.label}</span>
          <span className="ml-auto text-[0.7rem] font-semibold text-muted-foreground">
            {row.state}
          </span>
        </div>
      ))}
    </div>
  );
}

function NumbersVisual() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {["+1 415 •••", "+1 877 •••", "+1 312 •••", "+1 646 •••"].map((n, index) => (
        <div
          key={n}
          className="rounded-xl bg-white/80 px-3 py-3 shadow-sm ring-1 ring-navy/5"
        >
          <p className="font-mono text-xs text-foreground">{n}</p>
          <p className="mt-1 text-[0.7rem] font-semibold text-muted-foreground">
            {index % 2 === 0 ? "Local" : "Toll-free"}
          </p>
        </div>
      ))}
    </div>
  );
}

function MessagingVisual() {
  return (
    <div className="space-y-2.5">
      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/85 px-3.5 py-2.5 text-xs shadow-sm ring-1 ring-navy/5">
        Your ticket #4182 is scheduled for Tuesday.
      </div>
      <div className="ml-auto max-w-[72%] rounded-2xl rounded-br-md bg-navy px-3.5 py-2.5 text-xs text-white shadow-sm">
        Confirmed, thanks.
      </div>
      <p className="pt-0.5 text-[0.7rem] font-semibold text-muted-foreground">
        Sent via Email2SMS · 10DLC registered
      </p>
    </div>
  );
}

function FaxVisual() {
  return (
    <div className="rounded-xl bg-white/85 p-4 shadow-sm ring-1 ring-navy/5">
      <div className="flex items-center gap-2">
        <PrinterIcon className="size-4 text-brand-blue" />
        <span className="text-xs font-semibold">signed-order.pdf</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[0.7rem] font-semibold text-brand-blue">
          <CheckIcon className="size-3" />
          Delivered
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        {["w-full", "w-11/12", "w-4/5", "w-9/12"].map((w) => (
          <div key={w} className={`h-1.5 rounded-full bg-navy/10 ${w}`} />
        ))}
      </div>
    </div>
  );
}

const productTiles = [
  {
    href: "/sip-trunking",
    icon: PhoneCallIcon,
    title: "SIP trunking",
    description:
      "Authenticate by IP or registration, set failover on a number, and start from a PBX template.",
    tint: "var(--tint-sky)",
    visual: <TrunkVisual />,
  },
  {
    href: "/phone-numbers",
    icon: HashIcon,
    title: "Phone numbers",
    description:
      "Order local and toll-free numbers, port the ones you already have, or buy them in bulk.",
    tint: "var(--tint-sand)",
    visual: <NumbersVisual />,
  },
  {
    href: "/sms-mms",
    icon: MessageSquareIcon,
    title: "SMS and MMS",
    description:
      "Send from the portal or Email2SMS, and register business traffic with 10DLC before it ships.",
    tint: "var(--tint-mist)",
    visual: <MessagingVisual />,
  },
  {
    href: "/fax",
    icon: PrinterIcon,
    title: "Fax",
    description:
      "Send and receive fax by email, the portal, or the machine you already have. No page fees.",
    tint: "var(--tint-slate)",
    visual: <FaxVisual />,
  },
];

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="aurora absolute inset-0 opacity-70" aria-hidden />
        <div className="shell relative grid items-center gap-14 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-28 xl:grid-cols-[1.18fr_0.82fr]">
          <div>
            {/* Both lines are long enough to wrap mid-phrase, so the ramp is tuned to
                the width of "Human-grade support." at each breakpoint, not to a scale. */}
            <h1 className="display max-w-2xl text-[2rem] sm:text-5xl lg:text-[2.75rem] xl:text-[4rem]">
              Carrier-grade voice.
              <br />
              Human-grade support.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Trunking, numbers, messaging, and fax for MSPs and businesses running 3CX,
              FreePBX, Yeastar, or any SIP PBX. One portal, one invoice, published rates.
            </p>
            <div className="mt-9">
              <Button size="lg" render={<Link href="/talk-to-sales" />}>
                Talk to sales
              </Button>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-8 rounded-[3rem] bg-white/5 blur-2xl"
              aria-hidden
            />
            <HeroDemo />
          </div>
        </div>
      </section>

      <section
        className="border-b border-border bg-background py-10"
        aria-label="Compatible platforms"
      >
        <p className="shell mb-8 text-center text-sm font-medium text-muted-foreground">
          Drops into the phone systems you already install, and any other SIP PBX
        </p>
        <LogoMarquee />
      </section>

      <section id="products" className="py-20 lg:py-28" aria-labelledby="products-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Products</p>
            <h2 id="products-title" className="display mt-4 text-4xl sm:text-5xl">
              Manage all your business needs on one platform.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Trunking, numbers, messaging, and fax, on one portal, one invoice, and one
              support number.
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {productTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link
                  key={tile.href}
                  href={tile.href}
                  className="group flex flex-col justify-between gap-8 rounded-[1.75rem] p-8 ring-1 ring-navy/5 transition-transform duration-300 hover:-translate-y-1 sm:p-10"
                  style={{ background: tile.tint }}
                >
                  <div>
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-navy text-white">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                      {tile.title}
                    </h3>
                    <p className="mt-3 max-w-md text-muted-foreground">
                      {tile.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-ink">
                      Learn more
                      <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                  <div className="pt-2">{tile.visual}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="pillars-title">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-16 text-white sm:px-14 lg:px-16">
            <div className="aurora absolute inset-0 opacity-40" aria-hidden />
            <div className="relative">
              <div className="max-w-2xl">
                <p className="eyebrow text-primary">The network</p>
                <h2 id="pillars-title" className="display mt-4 text-4xl sm:text-5xl">
                  Built for the people who install it.
                </h2>
                <p className="mt-5 text-lg text-white/70">
                  Not a reseller dashboard bolted onto someone else&apos;s carrier.
                  Trunks, numbers, and logs live in one place, and a human answers the
                  phone.
                </p>
              </div>
              <div className="mt-14 grid gap-10 border-t border-white/15 pt-12 md:grid-cols-3">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title}>
                      <Icon className="size-6 text-primary" />
                      <h3 className="mt-4 text-xl font-semibold tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-white/70">{pillar.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-12">
                <Button
                  size="lg"
                  variant="onDark"
                  render={<Link href="/talk-to-sales" />}
                >
                  Talk to sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="who" className="bg-muted py-20 lg:py-28" aria-labelledby="who-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Who it&apos;s for</p>
            <h2 id="who-title" className="display mt-4 text-4xl sm:text-5xl">
              Find yourself on this list.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              The product underneath is the same. The starting point is not.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {audiences.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8 transition-shadow duration-300 hover:shadow-xl hover:shadow-navy/5"
              >
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.description}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <CheckIcon className="size-4 shrink-0 text-brand-blue" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-brand-blue">
                  Explore
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="portal-title">
        <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">The portal</p>
            <h2 id="portal-title" className="display mt-4 text-4xl sm:text-5xl">
              Run the whole thing from a browser.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Trunks, numbers, failover, logs, and texting each have a screen. Nothing
              here waits on a developer.
            </p>
            <ol className="mt-10 space-y-1">
              {jobs.map((job, index) => (
                <li key={job.title} className="flex gap-4 rounded-2xl p-4 hover:bg-muted">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-tint-sky text-sm font-semibold text-brand-blue">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-semibold">{job.title}</span>
                    <span className="block text-sm text-muted-foreground">
                      {job.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow text-brand-blue">Integrations</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">
              Works with the PBX you already have.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Templates and setup notes for the systems MSPs actually install.
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {pbx.map((item) => {
                const logo = logoByName.get(item.name)!;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex min-h-40 flex-col justify-between rounded-[1.5rem] bg-muted p-6 ring-1 ring-navy/5 transition-colors hover:bg-tint-sky"
                    >
                      <span className="flex h-12 items-center">
                        <Image
                          src={logo.src}
                          alt=""
                          width={logo.width}
                          height={logo.height}
                          sizes={logoSizes(logo, 48)}
                          unoptimized={logo.src.endsWith(".svg")}
                          className="max-h-12 w-auto max-w-full object-contain"
                        />
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold">
                        {item.name}
                        <ArrowRightIcon className="size-4 text-brand-blue transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="pricing-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Pricing</p>
            <h2 id="pricing-title" className="display mt-4 text-4xl sm:text-5xl">
              Predictable voice, usage-based add-ons.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Domestic voice covers the continental United States. Estimate a month below,
              then see the full rate card.
            </p>
          </div>
          <div className="mt-14">
            <BillEstimator />
          </div>
          <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {rateCard.map((rate) => (
              <div key={rate.label}>
                <dt className="text-sm text-muted-foreground">{rate.label}</dt>
                <dd className="mt-1 font-semibold">{rate.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <Button variant="outline" size="lg" render={<Link href="/pricing" />}>
              See the full rate card
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="compliance-title">
        <div className="shell grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-brand-blue">Compliance</p>
            <h2 id="compliance-title" className="display mt-4 text-4xl sm:text-5xl">
              Ships with the service.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              These are part of the offer, not a separate product line you get upsold
              later.
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {compliance.map((item) => (
              <div key={item.title} className="border-t border-border pt-5">
                <dt className="font-semibold">{item.title}</dt>
                <dd className="mt-2 text-muted-foreground">{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-brand-blue">FAQ</p>
            <h2 id="faq-title" className="display mt-4 text-4xl sm:text-5xl">
              Common questions.
            </h2>
          </div>
          <Accordion className="border-t border-border">
            {faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`} className="border-b">
                <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline hover:text-brand-blue">
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
                Clear lines.
                <br />
                Predictable bills.
              </h2>
              <p className="mt-6 text-lg text-white/75">
                Book time with us. We will look at the PBX you run, the numbers you need
                to port, and what it costs.
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
