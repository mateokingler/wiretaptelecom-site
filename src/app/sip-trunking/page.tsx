import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  BuildingIcon,
  CheckIcon,
  GaugeIcon,
  KeyRoundIcon,
  LayersIcon,
  type LucideIcon,
  NetworkIcon,
  PhoneForwardedIcon,
  PlugZapIcon,
  RouteIcon,
  ServerIcon,
  ShieldCheckIcon,
  SirenIcon,
  WalletIcon,
} from "lucide-react";
import { FailoverDemo } from "@/components/failover-demo";
import { compatibleSystems } from "@/components/logo-marquee";
import { NetworkMap } from "@/components/network-map";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SIP trunking",
  description:
    "SIP trunking for any PBX that speaks SIP. Connect by registration or IP peering, with quadruple redundancy across three regions, free voice failover, and metered rates from $0.0036 per minute.",
};

/** Regions come from the components published on our NOC status page. */
const heroStats = [
  { value: "99.9%", label: "Uptime on the voice network" },
  { value: "3 regions", label: "Atlanta, Miami, and Kansas" },
  { value: "4×", label: "Minimum redundancy per trunk" },
  { value: "$0", label: "Cost of failover, always" },
];

const connectModes = [
  {
    icon: KeyRoundIcon,
    name: "SIP registration",
    tagline: "For dynamic IPs, NAT, and anything that moves.",
    body: "Your PBX authenticates with credentials using cryptographic nonce algorithms. DNS SRV records and instant registration replication mean one registration buys you quadruple connectivity, and the portal confirms in real time that you are actually registered.",
  },
  {
    icon: NetworkIcon,
    name: "IP peering",
    tagline: "For static IPs and hardware that stays put.",
    body: "Peer-to-peer authentication by IP address, with no credentials to leak or rotate. If your PBX sits on a fixed address, this is the simplest way to connect and the least there is to go wrong.",
  },
];

const trunkFeatures: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: GaugeIcon,
    title: "Call quality you can hear",
    body: "We sit in the same data centres as the mobile network operators, so calls hand off on direct interconnects instead of transiting a chain of wholesalers. Fewer hops, less latency, no reseller's leftovers.",
  },
  {
    icon: LayersIcon,
    title: "One trunk, any volume",
    body: "A single trunk handles all your calls. Scale up for a busy season and back down afterwards without re-architecting anything or renegotiating a contract.",
  },
  {
    icon: PlugZapIcon,
    title: "Works with the PBX you own",
    body: "If your PBX speaks SIP (RFC 3261), it works here. No proprietary client, no forced hardware refresh, no vendor lock-in.",
  },
  {
    icon: ShieldCheckIcon,
    title: "STIR/SHAKEN included",
    body: "Outbound calls are signed at no extra cost, so your traffic is attested rather than arriving flagged as spam on the far end.",
  },
  {
    icon: RouteIcon,
    title: "Routing you control",
    body: "Point DIDs where you want them and set failover at the phone number level. Your routing is yours to change, in the portal, without a ticket.",
  },
  {
    icon: BuildingIcon,
    title: "Built for MSPs",
    body: "Run sub-accounts from one dashboard, activate wholesale rate decks per client, and bill it all on a single invoice.",
  },
];

/** What the simulator above cannot show: the configuration behind it. */
const failoverPoints = [
  {
    title: "Per-number control",
    body: "Set the strategy at the DID level, so your main line and your fax line can behave differently.",
  },
  {
    title: "Blended strategies",
    body: "Give one number both a failover trunk and a failover forward, for a fallback behind the fallback.",
  },
];

type Product = {
  icon: LucideIcon;
  name: string;
  summary: string;
  points: string[];
  doc?: { href: string; label: string };
};

const products: Product[] = [
  {
    icon: KeyRoundIcon,
    name: "SIP registration",
    summary:
      "Registered, authenticated trunking with real-time confirmation that your PBX is actually connected.",
    points: [
      "Encrypted registration authentication",
      "Registration replication across regions",
      "Optional IP allowlist on top of credentials",
    ],
    doc: { href: "/docs/creating-a-sip-trunk", label: "Creating a SIP trunk" },
  },
  {
    icon: PhoneForwardedIcon,
    name: "Voice failover",
    summary:
      "Automatic rerouting when a circuit, a site, or the power goes down. Free on every account, permanently.",
    points: [
      "Automatic trunk and forward failover",
      "Automatic recovery, no levers to pull",
      "Never billed for backup trunks",
    ],
  },
  {
    icon: SirenIcon,
    name: "E911",
    summary:
      "Emergency routing to the nearest PSAP, priced per location instead of per phone number.",
    points: [
      "Unlimited numbers under one location",
      "Dial 933 to hear your address read back",
      "Remote and home addresses supported",
    ],
    doc: { href: "/docs/e911-user-guide", label: "E911 user guide" },
  },
  {
    icon: PlugZapIcon,
    name: "Voice ATA gateway",
    summary:
      "Bridge analog phones, paging gear, and legacy equipment onto the PSTN without replacing any of it.",
    points: [
      "Bring your own SIP 2.0 ATA",
      "Migrate to and from trunking in a click",
      "Keep the hardware, modernise the backbone",
    ],
  },
  {
    icon: ServerIcon,
    name: "PBX hosting",
    summary:
      "We host the PBX in the same data centres as our switches, so it gets priority access to the carrier network.",
    points: [
      "Full access to the PBX and its server",
      "Choice of major PBX brands",
      "Free data export if you move on-premise",
    ],
  },
  {
    icon: WalletIcon,
    name: "Wholesale rate decks",
    summary:
      "Per-destination wholesale pricing for MSPs and carriers, with a capped maximum rate so there are no surprises.",
    points: [
      "Switch between base rate and deck in real time",
      "Rate caps that never block the call",
      "Decks per sub-account, one dashboard",
    ],
  },
];

const plans = [
  {
    name: "Metered",
    price: "$0.0036",
    unit: "per minute inbound",
    second: "$0.0054 per minute outbound",
    body: "Pay for the minutes you actually use, with no monthly commitment. Best when call volume moves around.",
    featured: true,
  },
  {
    name: "Un-metered",
    price: "$23.99",
    unit: "per call path, per month",
    second: "Unlimited inbound and outbound",
    body: "Fixed monthly billing sized to your busiest moment. Best when volume is steady and predictable.",
    featured: false,
  },
];

const faqs = [
  {
    q: "What is the difference between SIP registration and SIP peering?",
    a: "SIP registration uses cryptographic nonce algorithms to authenticate your PBX with credentials. SIP peering authenticates by IP address instead, peer to peer. Registration suits dynamic addresses and NAT; peering suits a PBX on a fixed IP. Both are supported, and you can move between them.",
  },
  {
    q: "Will my PBX work with your trunks?",
    a: "If your PBX supports SIP (RFC 3261), yes. We connect with all major PBX brands, and we publish step-by-step guides, videos, and importable templates for the common ones including 3CX, FreePBX, and Yeastar.",
  },
  {
    q: "How do I get the URL and credentials to connect?",
    a: "They are in the customer portal. Creating a trunk takes under a minute, and the portal shows you the registration happening rather than leaving you to guess whether it worked.",
  },
  {
    q: "What does failover cost?",
    a: "Nothing. Backup trunks and failover forwarding have always been free and will stay that way. You are not billed for a standby trunk, and you are not billed extra when it carries your calls.",
  },
  {
    q: "How is E911 billed?",
    a: "Per location, not per phone number. You can enable thousands of numbers under a single registered location for one small monthly fee, and create number-specific overrides where a site needs its own address.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. Send us your last invoice and we will price your real minutes against both the metered and un-metered plans and tell you which one you should be on, including when that means a smaller bill for us.",
  },
];

export default function Page() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div
          className="absolute -top-48 right-[-18%] -z-10 size-[34rem] rounded-full opacity-[0.13] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--brand-sky), transparent 68%)" }}
          aria-hidden
        />

        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_24rem] lg:gap-16">
            <div>
              <h1 className="display text-4xl sm:text-5xl lg:text-6xl">
                Trunking that{" "}
                <span className="text-brand-blue">holds the line.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Point any SIP PBX at our network and start passing calls. Connect by
                registration or by IP, ride four points of presence across three regions,
                and get failover that costs nothing on the day you finally need it.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
                <Button size="lg" variant="outline" render={<Link href="/pricing" />}>
                  See the rate card
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

      <section className="pb-20 lg:pb-28" aria-labelledby="network-title">
        <div className="shell">
          <h2 id="network-title" className="sr-only">
            Our network
          </h2>
          <NetworkMap />
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="connect-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Two ways to connect</p>
            <h2 id="connect-title" className="display mt-4 text-4xl sm:text-5xl">
              Register, or peer by IP.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Most carriers make you pick one and live with it. We support both, and
              moving between them is a change you make yourself in the portal.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {connectModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div
                  key={mode.name}
                  className="flex flex-col rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8 sm:p-10"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-tint-sky text-brand-blue">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold">{mode.name}</h3>
                  <p className="mt-1 font-medium text-brand-blue">{mode.tagline}</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{mode.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="features-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Why our trunks</p>
            <h2 id="features-title" className="display mt-4 text-4xl sm:text-5xl">
              The boring things, done properly.
            </h2>
          </div>
          <dl className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trunkFeatures.map((feature) => {
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

      <section className="py-20 lg:py-28" aria-labelledby="failover-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Voice failover</p>
            <h2 id="failover-title" className="display mt-4 text-4xl sm:text-5xl">
              Watch an outage not matter.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Failover is included on every account and always has been. Set it once, and
              it fires and stands down on its own. Cut the circuit below and see it work.
            </p>
          </div>

          <div className="mt-12">
            <FailoverDemo />
          </div>

          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            {failoverPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-[1.5rem] bg-muted p-7"
              >
                <dt className="font-semibold">{point.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="family-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">The whole voice stack</p>
            <h2 id="family-title" className="display mt-4 text-4xl sm:text-5xl">
              Everything that plugs into the trunk.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Each of these stands on its own, and they all share one portal, one invoice,
              and one support number.
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
                  {product.doc && (
                    <Link
                      href={product.doc.href}
                      className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue"
                    >
                      {product.doc.label}
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="pbx-title">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow text-brand-blue">Compatibility</p>
              <h2 id="pbx-title" className="display mt-4 text-4xl sm:text-5xl">
                If it speaks SIP, it works.
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                We connect with all major PBX brands. For the common ones we publish
                step-by-step guides and importable templates, so the trunk is passing
                calls the same afternoon you start.
              </p>
              <Button className="mt-8" render={<Link href="/docs" />}>
                Read the setup guides
              </Button>
            </div>

            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {compatibleSystems.map((system) => (
                <li
                  key={system.name}
                  className="flex h-24 items-center justify-center rounded-2xl bg-card px-6 ring-1 ring-navy/8"
                >
                  <Image
                    src={system.src}
                    alt={`${system.name} logo`}
                    width={system.width}
                    height={system.height}
                    unoptimized={system.src.endsWith(".svg")}
                    className="max-h-10 w-auto max-w-full object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="plans-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Pricing</p>
            <h2 id="plans-title" className="display mt-4 text-4xl sm:text-5xl">
              Two plans, both published.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              You pick one for the account, not one per trunk, so every trunk you run
              bills the same way. Moving between the two as your volume changes is a
              conversation, not a contract.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.featured
                    ? "relative overflow-hidden rounded-[1.75rem] bg-navy p-8 text-white sm:p-10"
                    : "rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8 sm:p-10"
                }
              >
                {plan.featured && (
                  <div className="aurora absolute inset-0 opacity-45" aria-hidden />
                )}
                <div className="relative">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="display text-4xl sm:text-5xl">{plan.price}</span>
                    <span
                      className={
                        plan.featured
                          ? "text-sm text-white/65"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {plan.unit}
                    </span>
                  </p>
                  <p
                    className={
                      plan.featured
                        ? "mt-2 text-sm text-white/65"
                        : "mt-2 text-sm text-muted-foreground"
                    }
                  >
                    {plan.second}
                  </p>
                  <p
                    className={
                      plan.featured
                        ? "mt-6 leading-relaxed text-white/75"
                        : "mt-6 leading-relaxed text-muted-foreground"
                    }
                  >
                    {plan.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button render={<Link href="/pricing#estimator" />}>Estimate your bill</Button>
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
            >
              See every rate, including add-ons
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="trunk-faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">FAQ</p>
            <h2 id="trunk-faq-title" className="display mt-4 text-4xl sm:text-5xl">
              Before you point a trunk at us.
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
                Bring us your last invoice.
              </h2>
              <p className="mt-6 text-lg text-white/75">
                We will price your real minutes against both plans, tell you which one you
                belong on, and handle the porting paperwork for the numbers you already
                own.
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
