import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  BadgePercentIcon,
  CheckIcon,
  FileTextIcon,
  HashIcon,
  KeyRoundIcon,
  LayersIcon,
  LifeBuoyIcon,
  type LucideIcon,
  MessageSquareIcon,
  NetworkIcon,
  PhoneCallIcon,
  PrinterIcon,
  ReceiptIcon,
  WalletIcon,
} from "lucide-react";
import { PartnerConsole } from "@/components/partner-console";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "MSPs",
  description:
    "Sell voice, numbers, messaging, and fax to your clients. Set your own prices with P2Lite, hold every client account in one console, and buy direct from the carrier instead of through a reseller.",
};

const heroStats = [
  { value: "One console", label: "Every client account, cost against retail" },
  { value: "$0", label: "Extra per trunk or per client account" },
  { value: "15%", label: "Of recurring, or price it yourself instead" },
  { value: "Since 2012", label: "A debt-free carrier, never a reseller" },
];

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: NetworkIcon,
    title: "No reseller in the call path",
    body: "We are a carrier service provider with our own number resources and direct PSTN access. Every middle layer between you and the network adds margin to your cost and hops to your calls, and those hops are where the outages live.",
  },
  {
    icon: LifeBuoyIcon,
    title: "A specialist, not a tiered queue",
    body: "When a client's calls fail you are the one standing in front of them, so the support line reaches a US-based telecom specialist who can read the trace on the call you are asking about.",
  },
  {
    icon: FileTextIcon,
    title: "Quote it without asking us",
    body: "P2Lite lets you build the quote, set the price on every line above the floor, publish it, and email it yourself. When your client approves, the account is created automatically and KYC starts.",
  },
  {
    icon: ReceiptIcon,
    title: "Telecom tax, handled",
    body: "When we bill your client, our billing system knows both your cost and your retail price. Tax is calculated on what they actually pay and appears on their invoice, so the filing is not your problem.",
  },
  {
    icon: KeyRoundIcon,
    title: "Approve access once, not per ticket",
    body: "Approve the porting agreement a single time and you can submit ports for any account you hold. Once a client approves your access to their account, you are in from then on with your own credentials.",
  },
  {
    icon: LayersIcon,
    title: "Growth that costs nothing to hold",
    body: "Add as many trunks and client accounts as you win, at no extra charge for having them. Everything is month to month, so you are never reselling a term you are locked into yourself.",
  },
];

const models: { icon: LucideIcon; name: string; body: string; note: string }[] = [
  {
    icon: BadgePercentIcon,
    name: "Take the commission",
    body: "We bill your client directly at our published rates and pay you 15% of their monthly recurring charges. You never touch an invoice, a card payment, or a tax filing.",
    note: "Simplest to start",
  },
  {
    icon: WalletIcon,
    name: "Set your own margin",
    body: "Add a managed services fee to the quote you send and you receive that instead of the 15%. You decide the number, and your client sees one price for the whole service you provide.",
    note: "You control the price",
  },
  {
    icon: ReceiptIcon,
    name: "Bill them yourself",
    body: "We bill you rather than your client, and you invoice them however you like. You own the billing relationship outright, and telecom tax moves with it — either paid by you or covered by an exemption certificate we keep on file.",
    note: "Full ownership",
  },
];

type Product = {
  icon: LucideIcon;
  name: string;
  summary: string;
  cost: string;
  href: string;
};

const products: Product[] = [
  {
    icon: PhoneCallIcon,
    name: "SIP trunking",
    summary:
      "IP or registration authentication against any SIP PBX, with failover configured per number.",
    cost: "From $0.0036 a minute, or $23.99 a call path un-metered",
    href: "/sip-trunking",
  },
  {
    icon: HashIcon,
    name: "Phone numbers",
    summary:
      "Local and toll-free from every LATA, live within seconds, with port-out PIN protection.",
    cost: "$1.99 local, $2.99 toll-free, $5 a port however many numbers",
    href: "/phone-numbers",
  },
  {
    icon: MessageSquareIcon,
    name: "SMS and MMS",
    summary:
      "Texting on the numbers your clients already answer, with 10DLC registration filed for them.",
    cost: "$0.0080 outbound, inbound free",
    href: "/sms-mms",
  },
  {
    icon: PrinterIcon,
    name: "Fax",
    summary:
      "Email to fax and back, or a gateway for the machine a client refuses to give up.",
    cost: "$19.99 a month, and nobody counts pages",
    href: "/fax",
  },
];

const faqs = [
  {
    q: "Do I have to become a carrier to sell voice?",
    a: "No, and you should not want to. A managed service provider that starts routing calls through its own infrastructure becomes a carrier service reseller, which raises the retail cost for the client and puts the account at risk when something in the middle breaks. Selling a carrier's products and adding your managed service on top gets you the margin without any of the regulatory weight — no OCN, no number pooling, no robocall mitigation filing.",
  },
  {
    q: "How do I price my clients?",
    a: "With P2Lite, in the portal. You add a trunking product and whatever else the deal needs, then adjust the price on every line and on the toll rates. Each one has a floor price you can see and cannot go below, and everything above it is yours. Publish the quote, email it from the portal, and the account is created automatically when your client approves.",
  },
  {
    q: "Who deals with telecom taxes?",
    a: "It depends on who sends the invoice. If we bill your client, we handle it — our billing system knows your cost and your retail price, calculates the tax on what they actually pay, and puts it on their bill. If you would rather we bill you and you bill them, the tax becomes yours to pay, or you give us the documentation showing you are exempt.",
  },
  {
    q: "What happens when I collect a payment directly?",
    a: "Apply it to the right account and the books settle themselves. Say you charge a client $4.00 for a number that costs you $1.00: collect that payment directly and your partner account is charged the $1.00 you owe us. If the payment comes through the portal instead, we owe you the $3.00, which lands as a credit and is disbursed once your account passes a small threshold.",
  },
  {
    q: "Do I need a new approval every time I port a number or open an account?",
    a: "No. The porting agreement is approved once, after which you can submit ports for any account you hold, with no letter of authorisation request each time. Account access works the same way — a client approves your access once and you can get into their account whenever you need to, using your own login.",
  },
  {
    q: "What does it cost to take on another client?",
    a: "Nothing for the account itself. You can turn up as many trunks and as many end-user accounts as you want at no extra charge, and there is no term contract on either side. You pay for what those clients actually use, at the rates on our published rate card.",
  },
  {
    q: "I already get commission on some accounts. Do I have to move them?",
    a: "No. You can run the commission model and the partner program side by side, and existing accounts stay exactly where they are unless you decide to import them. Nothing about joining forces you to restructure what already works.",
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
                Sell voice{" "}
                <span className="inline-block text-brand-blue">
                  without becoming a carrier.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                You keep the client, the pricing, and the margin. We keep the numbering
                authority, the interconnects, the compliance filings, and the tax engine —
                the parts that cost a fortune to run and that no client has ever paid
                anyone extra for.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
                <Button size="lg" variant="outline" render={<Link href="#earning" />}>
                  See how partners get paid
                </Button>
              </div>
            </div>

            {/* gap-px over a tinted backdrop draws the hairline rules between cells. */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] bg-navy/10 shadow-xl shadow-navy/10 ring-1 ring-navy/10">
              {heroStats.map((stat) => (
                <div key={stat.label} className="bg-card p-6">
                  <dt className="display text-2xl text-brand-blue">{stat.value}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="console-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Core-MSP partner program</p>
            <h2 id="console-title" className="display mt-4 text-4xl sm:text-5xl">
              Every client, and what each one earns.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              One dashboard for every account you hold. What the client pays and what the
              account costs you at our published rates sit on the same row, so the margin
              is never a spreadsheet you have to keep up to date on the side.
            </p>
          </div>

          <div className="mt-12">
            <PartnerConsole />
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="features-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Why partner with us</p>
            <h2 id="features-title" className="display mt-4 text-4xl sm:text-5xl">
              Buy from the carrier, not the layer above it.
            </h2>
          </div>
          <dl className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
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
        id="earning"
        className="scroll-mt-24 py-20 lg:py-28"
        aria-labelledby="earning-title"
      >
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="eyebrow text-brand-blue">Getting paid</p>
              <h2 id="earning-title" className="display mt-4 text-4xl sm:text-5xl">
                Three ways, and you pick per deal.
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Some accounts are worth a clean commission and no paperwork. Others are
                worth owning end to end because the managed service around the voice is
                the real product. You do not have to choose one model for your whole book.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button render={<Link href="/talk-to-sales" />}>Talk to sales</Button>
                <Link
                  href="/docs/p2lite-quotes"
                  className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
                >
                  See how quoting works
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Alternatives rather than steps, so these carry icons instead of the
                numerals the porting and sending sections use. */}
            <ul className="space-y-5">
              {models.map((model) => {
                const Icon = model.icon;
                return (
                  <li
                    key={model.name}
                    className="flex gap-5 rounded-[1.5rem] bg-muted p-7 sm:gap-6"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="text-lg font-semibold">{model.name}</span>
                        <span className="rounded-full bg-card px-2.5 py-1 text-[0.7rem] font-semibold text-navy-soft ring-1 ring-navy/8">
                          {model.note}
                        </span>
                      </span>
                      <span className="mt-2 block leading-relaxed text-muted-foreground">
                        {model.body}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="sell-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">What you can sell</p>
            <h2 id="sell-title" className="display mt-4 text-4xl sm:text-5xl">
              Four products, one rate card.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              These are your costs, published. Whatever you add on top is the part your
              client is paying you for.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.name}
                  href={product.href}
                  className="group flex flex-col rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8 transition-shadow hover:shadow-lg hover:shadow-navy/5"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-tint-sky text-brand-blue">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{product.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {product.summary}
                  </p>
                  <p className="mt-5 flex gap-2.5">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                    <span className="text-sm leading-relaxed font-medium">
                      {product.cost}
                    </span>
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                    Read the detail
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button render={<Link href="/pricing#estimator" />}>
              Estimate a client bill
            </Button>
            <Link
              href="/docs/what-is-a-carrier-service"
              className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
            >
              How to tell a carrier from a reseller
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="msp-faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">FAQ</p>
            <h2 id="msp-faq-title" className="display mt-4 text-4xl sm:text-5xl">
              Before you move a client.
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
                Bring us one client to start.
              </h2>
              <p className="mt-6 text-lg text-white/75">
                Send us what you pay for them today and we will price the same service at
                our rates, stand up a free test trunk against their PBX, and walk you
                through the partner console before you commit to anything.
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
