import type { Metadata } from "next";
import Link from "next/link";
import {
  ActivityIcon,
  ArrowRightIcon,
  CalendarCheckIcon,
  CheckIcon,
  GaugeIcon,
  HashIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  type LucideIcon,
  MessageSquareIcon,
  PhoneCallIcon,
  PlugZapIcon,
  PrinterIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { CutoverPlan } from "@/components/cutover-plan";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Businesses",
  description:
    "Trunk the PBX you already own, port your numbers, and add texting or fax only if you need them. One account for every line the business runs, bought direct from the carrier.",
};

const heroStats = [
  { value: "5 minutes", label: "From sign-up to your first call" },
  { value: "One bill", label: "Trunks, numbers, texting, and fax" },
  { value: "No term", label: "Month to month on everything" },
  { value: "Any PBX", label: "That speaks SIP, including yours" },
];

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: PlugZapIcon,
    title: "Keep the phone system you bought",
    body: "3CX, FreePBX, Yeastar, Asterisk, or anything else that speaks RFC 3261. Your extensions, dial plan, voicemail, and handsets are untouched — we replace the carrier underneath them, not the system your staff already know.",
  },
  {
    icon: GaugeIcon,
    title: "Calls that hand off cleanly",
    body: "We sit in the same data centers as the mobile network operators, so your calls reach them over direct interconnects instead of transiting a chain of wholesalers. Fewer hops is fewer places for a call to arrive late or not at all.",
  },
  {
    icon: LayoutDashboardIcon,
    title: "One portal for all of it",
    body: "Buy numbers, build trunks, set E911 addresses, send texts, and read call logs in the same place. Nothing here needs a ticket and a two-day wait to change.",
  },
  {
    icon: ActivityIcon,
    title: "See the call, not a theory",
    body: "Real-time SIP tracing shows you exactly what happened on the call someone is complaining about, which is usually enough to end the argument about whose fault it was.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Compliance you do not administer",
    body: "STIR/SHAKEN signing is on by default at no charge, so your calls arrive attested rather than flagged. E911 is $1.49 a location, and we file the robocall mitigation paperwork a carrier is required to file.",
  },
  {
    icon: LifeBuoyIcon,
    title: "A specialist, not a tiered queue",
    body: "Call the support line and you reach a US-based telecom specialist who can pull the trace on the call you are asking about, rather than a script that asks whether you have rebooted the phone.",
  },
];

const startSteps = [
  {
    title: "Open the account",
    body: "Register online or call us. There is no contract to sign, no minimum, and no commitment to anything beyond the month you are in.",
  },
  {
    title: "A short call from your account manager",
    body: "Every carrier has to know who it is carrying traffic for, so we do KYC as a quick introductory call rather than a form that disappears into a queue. You come out of it with a person to ring.",
  },
  {
    title: "Build the trunk and point the PBX",
    body: "Create the trunk in the portal, authenticate by registration or by IP, and follow the guide for your PBX. Most businesses are passing calls the same afternoon they start.",
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
      "One trunk for the whole business, with failover set per number and no charge for having it.",
    cost: "$0.0036 a minute metered, or $23.99 a call path un-metered",
    href: "/sip-trunking",
  },
  {
    icon: HashIcon,
    name: "Phone numbers",
    summary:
      "Local numbers from every LATA and toll-free, live in seconds, or bring the ones you have.",
    cost: "$1.99 local, $2.99 toll-free, $5 a port however many numbers",
    href: "/phone-numbers",
  },
  {
    icon: MessageSquareIcon,
    name: "SMS and MMS",
    summary:
      "Texting on the numbers customers already call, with the 10DLC registration filed for you.",
    cost: "$0.0080 outbound, inbound free",
    href: "/sms-mms",
  },
  {
    icon: PrinterIcon,
    name: "Fax",
    summary:
      "Email to fax and back, or a gateway for the machine one department refuses to give up.",
    cost: "$19.99 a month, and nobody counts pages",
    href: "/fax",
  },
];

const faqs = [
  {
    q: "Do we have to replace our phone system?",
    a: "No. We are the carrier that sits underneath it. If your PBX speaks SIP — 3CX, FreePBX, Yeastar, Asterisk, a hosted system, an SBC — it connects here by registration or by IP peering, and we publish step-by-step guides and importable templates for the common ones. Nobody has to relearn a handset.",
  },
  {
    q: "Will we lose calls on the day we move?",
    a: "There is no reason to. The trunk is built and tested while your current carrier is still live, and you can take inbound calls on the new trunk before the port completes: we present temporary numbers to your PBX as the permanent ones, so you build the inbound routes you intend to keep and not a set of throwaways. When the numbers land the temporary path stops on its own.",
  },
  {
    q: "Can we keep our numbers?",
    a: "Yes. Porting is $5 per port order rather than per number, so moving forty numbers costs the same as moving one. We handle the LOA, the losing carrier, and NPAC, and a porting specialist stays on the order rather than handing it to a queue. Once the numbers are here you can set a port-out PIN so nobody can take them from you the same way.",
  },
  {
    q: "What will it actually cost?",
    a: "Domestic voice is either metered at $0.0036 inbound and $0.0054 outbound per minute, or un-metered at $23.99 a call path per month — chosen at the account level, not per trunk. Numbers are $1.99 a month, toll-free $2.99, E911 $1.49 a location, and STIR/SHAKEN signing is free. The estimator on the pricing page will do the arithmetic against your own call volume.",
  },
  {
    q: "Is there a contract?",
    a: "No term, no minimum, and no early termination fee. Everything is month to month, so you can add call paths for a busy season and take them off again afterwards without renegotiating anything.",
  },
  {
    q: "What happens with 911?",
    a: "You register an address for each location and assign your numbers to it, which puts a dispatchable location in front of the call taker for $1.49 a location a month. We are NG911 capable, so where the local authority has moved to an i3 network your calls ride it.",
  },
  {
    q: "Who answers when something breaks at 4pm?",
    a: "A US-based telecom specialist on the support line, or the help desk if it can wait. You will not be routed through a tier-one script first, and the person you reach can look at the SIP trace for the call in question while you are still on the phone.",
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
                Keep the phone system.{" "}
                <span className="inline-block text-brand-blue">
                  Change what is behind it.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Wiretap is the carrier under your PBX: trunks, numbers, texting, fax, and
                E911 on one account, bought direct instead of through whoever is reselling
                it to you now. The handsets on the desks stay exactly where they are.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
                <Button size="lg" variant="outline" render={<Link href="#cutover" />}>
                  See how the move works
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

      <section
        id="cutover"
        className="scroll-mt-24 pb-20 lg:pb-28"
        aria-labelledby="cutover-title"
      >
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Changing carriers</p>
            <h2 id="cutover-title" className="display mt-4 text-4xl sm:text-5xl">
              Nobody needs to be here on a Sunday.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The reason businesses stay on a carrier they have stopped liking is the
              move. So we stage it: the new trunk runs alongside the old one, your PBX
              starts taking real calls before the numbers move, and the port itself
              becomes the least eventful part of the week.
            </p>
          </div>

          <div className="mt-12">
            <CutoverPlan />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button render={<Link href="/talk-to-sales" />}>Plan your cutover</Button>
            <Link
              href="/docs/port-numbers-to-wiretap-telecom"
              className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
            >
              How porting actually runs
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="features-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Why buy direct</p>
            <h2 id="features-title" className="display mt-4 text-4xl sm:text-5xl">
              The carrier, not the layer above it.
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

      <section className="py-20 lg:py-28" aria-labelledby="start-title">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="eyebrow text-brand-blue">Getting started</p>
              <h2 id="start-title" className="display mt-4 text-4xl sm:text-5xl">
                Calling in five minutes.
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Three things stand between you and your first call, and one of them is a
                phone call with us. There is nothing to install and no engineer to
                schedule.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button render={<Link href="/talk-to-sales" />}>Talk to sales</Button>
                <Link
                  href="/docs/creating-a-sip-trunk"
                  className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
                >
                  Read the trunk guide
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <ol className="space-y-5">
              {startSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-5 rounded-[1.5rem] bg-muted p-7 sm:gap-6"
                >
                  <span className="display flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm text-white">
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

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="add-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">What you can add</p>
            <h2 id="add-title" className="display mt-4 text-4xl sm:text-5xl">
              Only the parts you actually use.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Nothing here is bundled into a seat license. Take the trunk on its own, or
              put texting and fax on the same numbers and the same invoice.
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
              Estimate your monthly bill
            </Button>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarCheckIcon className="size-4 text-brand-blue" />
              Month to month on all of it
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="business-faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">FAQ</p>
            <h2 id="business-faq-title" className="display mt-4 text-4xl sm:text-5xl">
              Before you give notice.
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
                Send us the bill you pay now.
              </h2>
              <p className="mt-6 text-lg text-white/75">
                We will price the same service at our published rates, stand up a free
                test trunk against your PBX so you can hear the difference, and plan the
                port around a date that suits you. None of that costs anything.
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
