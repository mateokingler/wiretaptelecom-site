import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowRightLeftIcon,
  BadgeCheckIcon,
  CheckIcon,
  GaugeIcon,
  HashIcon,
  LayersIcon,
  type LucideIcon,
  MapPinnedIcon,
  PhoneForwardedIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  ZapIcon,
} from "lucide-react";
import { NumberSearch } from "@/components/number-search";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Phone numbers",
  description:
    "Local and toll-free numbers from every LATA and virtually every US area code. Buy one or thousands, use them within seconds, and port your existing numbers in with a named expert on the job.",
};

const heroStats = [
  { value: "$1.99", label: "Per local number, per month" },
  { value: "Every LATA", label: "And virtually every US area code" },
  { value: "Seconds", label: "From purchase to a working number" },
  { value: "1–7 days", label: "Typical port completion window" },
];

const numberFeatures: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MapPinnedIcon,
    title: "Inventory almost everywhere",
    body: "Numbers from every LATA and virtually every area code in the United States. Search a rate center, take a single number or a contiguous block of hundreds, and keep the run intact for the departments that need it.",
  },
  {
    icon: ZapIcon,
    title: "Working in seconds, not days",
    body: "Numbers activate within seconds of purchase no matter how many you buy, and there is no activation fee. Assign one to a trunk and it takes calls before you have finished closing the tab.",
  },
  {
    icon: LayersIcon,
    title: "One number, three services",
    body: "The same number can carry voice, fax, and SMS and MMS at once. No second number for texting, no separate fax line, no explaining to customers which one to use for what.",
  },
  {
    icon: SlidersHorizontalIcon,
    title: "Bulk edits that finish",
    body: "Change routing on one number or on thousands from the same screen. Repointing a whole block to a different trunk is a bulk edit that completes in seconds, not a ticket and a wait.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Nobody walks off with them",
    body: "Set a blanket port-out PIN across the account or a unique PIN per number, so a number cannot leave without the authorization you control. Slamming and social-engineered ports stop at the PIN.",
  },
  {
    icon: PhoneForwardedIcon,
    title: "Local presence, flat rate",
    body: "Buy a local number, use it as your outbound caller ID, and you are calling that market as a local. Outbound costs the same per minute across the street or across the country.",
  },
];

type Product = {
  icon: LucideIcon;
  name: string;
  summary: string;
  points: string[];
  link?: { href: string; label: string };
};

const products: Product[] = [
  {
    icon: HashIcon,
    name: "Standard numbers",
    summary:
      "Ordinary ten-digit local numbers at $1.99 a month, from inventory covering every LATA and virtually every area code.",
    points: [
      "Issued under our own FCC numbering authorization",
      "Local presence in the markets you sell into",
      "Contiguous runs for departments and DID blocks",
      "Flat inbound per-minute rate, no surprises",
    ],
    link: { href: "/sip-trunking", label: "Put them on a trunk" },
  },
  {
    icon: BadgeCheckIcon,
    name: "Toll-free numbers",
    summary:
      "Nationwide toll-free at $2.99 a month, live on your trunk about a minute after you click buy.",
    points: [
      "We are the RespOrg of record on every one",
      "800, 833, 844, 855, 866, 877, and 888 prefixes",
      "$0.015 a minute inbound, outbound free",
      "Vanity numbers when inventory allows it",
      "Toll-free caller ID for voice, fax, and messaging",
    ],
  },
  {
    icon: PhoneForwardedIcon,
    name: "Local and long distance",
    summary:
      "One rate for outbound calling anywhere in the lower 48, so distance stops being a billing category.",
    points: [
      "Same per-minute rate local or long distance",
      "Forward local to long distance and back again",
      "Your caller ID decides how local you look",
    ],
  },
  {
    icon: GaugeIcon,
    name: "Bulk purchasing",
    summary:
      "Search, filter, and buy thousands of numbers in one pass, then provision them all before you leave the page.",
    points: [
      "Advanced search and sort across the inventory",
      "Pick numbers individually or take the block",
      "Every number activates within seconds",
    ],
    link: { href: "/sms-mms", label: "Turn on texting" },
  },
  {
    icon: ArrowRightLeftIcon,
    name: "Number portability",
    summary:
      "Bring the numbers your customers already dial, with a named porting expert on the submission from day one.",
    points: [
      "One-time porting fee, with volume pricing on larger blocks",
      "One-page RespOrg form for toll-free ports",
      "Bulk ports across multiple losing carriers at once",
    ],
    link: {
      href: "/docs/port-numbers-to-wiretap-telecom",
      label: "How porting works",
    },
  },
  {
    icon: SlidersHorizontalIcon,
    name: "Number management",
    summary:
      "The day-to-day settings behind your numbers, all of them self-service in the portal.",
    points: [
      "Set the billing telephone number for the account",
      "Default area code for seven-digit dialing",
      "Flexible inbound prefix: ten-digit, leading 1, or E.164",
    ],
    link: { href: "/docs/manage-your-btn", label: "Manage your BTN" },
  },
];

const portingSteps = [
  {
    title: "Check it before you commit",
    body: "Run the numbers through our portability checker, free and available any time. You find out what can move, what cannot, and which carrier currently holds each number before anyone signs anything.",
  },
  {
    title: "One submission, however messy",
    body: "Thousands of numbers spread across several losing carriers still go in as a single port request. We fill in the gaps, chase the rejections, and keep the whole batch moving together.",
  },
  {
    title: "Built before the numbers land",
    body: "Provision routing, trunks, and services against your numbers in the portal ahead of the port date. When the port completes, the configuration is already there and nothing goes dark.",
  },
  {
    title: "Your date, where we can get it",
    body: "In most cases we schedule the port for the day and time you ask for, so the cutover happens when your team is around rather than whenever the losing carrier feels like it.",
  },
];

const costs = [
  {
    name: "Local number",
    price: "$1.99",
    unit: "per month",
    detail:
      "Any standard ten-digit number, from any area code in the inventory, on a flat monthly rate.",
  },
  {
    name: "Toll-free number",
    price: "$2.99",
    unit: "per month",
    detail: "Nationwide toll-free on the 800, 833, 844, 855, 866, 877, and 888 prefixes.",
  },
  {
    name: "Number porting",
    price: "One-time",
    unit: "on the rate card",
    detail:
      "A single charge to bring your numbers across, with volume pricing on larger blocks. Nothing recurring for having ported in.",
  },
  {
    name: "Activation",
    price: "Free",
    unit: "",
    detail:
      "No setup charge and no minimum order, whether you buy one number or several thousand.",
    highlight: true,
  },
  {
    name: "Outbound caller ID (CNAM)",
    price: "$0.99",
    unit: "per number, per month",
    detail:
      "Show your business name instead of a bare number on outbound calls, priced per number rather than per account.",
  },
  {
    name: "E-911",
    price: "$1.49",
    unit: "per location, per month",
    detail: "A registered emergency location, billed per location rather than bundled.",
  },
];

const faqs = [
  {
    q: "How quickly can I use a number after buying it?",
    a: "Within seconds, and that holds whether you bought one number or several thousand. There is no activation fee and no provisioning window. Assign the number to a trunk in the portal and it is taking calls immediately.",
  },
  {
    q: "Can one number do voice, fax, and SMS at the same time?",
    a: "Yes. Voice, fax, and SMS and MMS can all be enabled on the same number from the portal, individually or across a whole block at once. You do not need a separate number per service, and customers only ever have one number to remember.",
  },
  {
    q: "How long does porting take, and will my calls drop?",
    a: "Most ports complete in one to seven business days, depending on how complex the order is and how the losing carrier behaves. There is no downtime provided your trunk and routing are set up in advance, which is exactly what pre-port provisioning is for — you build the configuration before the numbers arrive.",
  },
  {
    q: "Can I port a large batch from several different carriers?",
    a: "Yes. Thousands of numbers spread across multiple losing carriers can go in as a single submission, and we manage the process for you. Toll-free numbers need only a one-page RespOrg form from your side.",
  },
  {
    q: "What stops someone porting my numbers away?",
    a: "Port-out PIN protection. You can set a blanket PIN across the account or a unique PIN for each individual number, so no number leaves without the authorization you control. It is the practical defense against both accidental ports and deliberate slamming.",
  },
  {
    q: "Can I get an 800 number or a vanity number?",
    a: "Often, yes. True 800 numbers are scarce these days, but our industry reach means we can usually find a workable toll-free option, and we are happy to hunt for a vanity number. Vanity inventory is never something anyone can guarantee in advance.",
  },
  {
    q: "What do numbers cost?",
    a: "Local numbers are $1.99 per number per month and toll-free numbers are $2.99. Porting in from another carrier carries a one-time fee, listed on the pricing page, with volume pricing on larger blocks. There are no activation fees and no minimum order, so a single number costs the same per month as the thousandth one. Inbound minutes bill separately at your account plan rate, metered or un-metered, apart from toll-free numbers, where inbound runs $0.015 a minute and outbound is free.",
  },
];

export default function Page() {
  return (
    <>
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
                Numbers you own, <span className="text-brand-blue">live in seconds.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Local and toll-free numbers from every LATA and virtually every US area
                code. Buy one or a contiguous block of a thousand, put them on a trunk
                right away, and bring the numbers you already have with you.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
                <Button size="lg" variant="outline" render={<Link href="#porting" />}>
                  Port your numbers in
                </Button>
              </div>
            </div>

            {/* gap-px over a tinted backdrop draws the hairline rules between cells. */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] bg-navy/10 shadow-xl shadow-navy/10 ring-1 ring-navy/10">
              {heroStats.map((stat) => (
                <div key={stat.label} className="bg-card p-6">
                  <dt className="display text-3xl text-brand-blue">{stat.value}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="search-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Buying numbers</p>
            <h2 id="search-title" className="display mt-4 text-4xl sm:text-5xl">
              Search, buy, and start taking calls.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Pick an area code, take the contiguous block you want, and the numbers are
              on the network before you have left the page — with voice, fax, and
              messaging switched on and port-out protection already applied.
            </p>
          </div>

          <div className="mt-12">
            <NumberSearch />
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="features-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Why our numbers</p>
            <h2 id="features-title" className="display mt-4 text-4xl sm:text-5xl">
              Built for one number or ten thousand.
            </h2>
          </div>
          <dl className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {numberFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-navy text-white">
                    <Icon className="size-5" />
                  </span>
                  <dt className="mt-6 text-lg font-semibold">{feature.title}</dt>
                  <dd className="mt-3 leading-relaxed text-muted-foreground">
                    {feature.body}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section
        id="porting"
        className="scroll-mt-24 py-20 lg:py-28"
        aria-labelledby="porting-title"
      >
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="eyebrow text-brand-blue">Number portability</p>
              <h2 id="porting-title" className="display mt-4 text-4xl sm:text-5xl">
                Bring the numbers with you.
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Changing carrier should not mean changing the number on your vehicles,
                your invoices, and every listing you have ever paid for. Porting is the
                part of the move that goes wrong most often, so it is the part we do not
                leave to a form.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button render={<Link href="/talk-to-sales" />}>Start a port</Button>
                <Link
                  href="/docs/port-numbers-to-wiretap-telecom"
                  className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
                >
                  Read the porting guide
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <ol className="space-y-5">
              {portingSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-5 rounded-[1.5rem] bg-muted p-7 sm:gap-6"
                >
                  <span className="display flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-base text-white">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold">{step.title}</span>
                    <span className="mt-2 block leading-relaxed text-muted-foreground">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="family-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">The whole numbering stack</p>
            <h2 id="family-title" className="display mt-4 text-4xl sm:text-5xl">
              Everything with a number on it.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Each of these stands on its own, and they all share one portal, one invoice,
              and one support number. The numbers are ours to issue: NECA recognizes us as
              an IPES with FCC numbering authorization, and on toll-free we are the
              RespOrg of record rather than renting that from another carrier.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.name}
                  className="flex flex-col rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-tint-sky text-brand-blue">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{product.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {product.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {product.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {product.link && (
                    <Link
                      href={product.link.href}
                      className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue"
                    >
                      {product.link.label}
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="cost-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">What numbers cost</p>
            <h2 id="cost-title" className="display mt-4 text-4xl sm:text-5xl">
              $1.99 a number, published.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Local numbers are $1.99 a month and toll-free $2.99, with no activation fee
              and no minimum order. Inbound minutes bill at your account plan rate,
              metered or un-metered.
            </p>
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] bg-navy/10 ring-1 ring-navy/10 sm:grid-cols-2 lg:grid-cols-3">
            {costs.map((cost) => (
              <div key={cost.name} className="flex flex-col bg-card p-7">
                <dt className="text-sm font-semibold">{cost.name}</dt>
                <dd className="mt-4 flex flex-1 flex-col">
                  <span className="flex items-baseline gap-1.5">
                    <span
                      className={
                        cost.highlight
                          ? "display text-3xl text-emerald-700"
                          : "display text-3xl text-brand-blue"
                      }
                    >
                      {cost.price}
                    </span>
                    {cost.unit && (
                      <span className="text-xs text-muted-foreground">{cost.unit}</span>
                    )}
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {cost.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button render={<Link href="/pricing#estimator" />}>
              Estimate your bill
            </Button>
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
            >
              See the full rate card, including voice
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="numbers-faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">FAQ</p>
            <h2 id="numbers-faq-title" className="display mt-4 text-4xl sm:text-5xl">
              Before you buy the block.
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

      <section className="py-20 lg:py-28">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-20 text-center text-white sm:px-14">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
                Send us your number list.
              </h2>
              <p className="mt-6 text-lg text-white/75">
                Tell us which numbers you hold and which ones you still need. We will run
                the portability check, price the move, and give you a port date your team
                can actually be around for.
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
