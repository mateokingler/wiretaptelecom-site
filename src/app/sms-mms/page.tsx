import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArchiveIcon,
  ArrowRightIcon,
  CheckCheckIcon,
  CheckIcon,
  FileCheck2Icon,
  ImageIcon,
  type LucideIcon,
  MailIcon,
  MessagesSquareIcon,
  SquareTerminalIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import { logoByName, logoSizes } from "@/components/logo-marquee";
import { SendSurfaces } from "@/components/send-surfaces";
import { TcrPipeline } from "@/components/tcr-pipeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SMS and MMS",
  description:
    "Business texting on the numbers you already own. Send from the portal, your inbox, your PBX, or the API, with free inbound, MMS, delivery receipts, and 10DLC registration handled for you.",
};

const heroStats = [
  { value: "Free", label: "Inbound SMS and MMS on local numbers" },
  { value: "$0.0080", label: "Per outbound SMS message" },
  { value: "4 ways", label: "To send from one number" },
  { value: "10DLC", label: "Registration filed for you with TCR" },
];

const messagingFeatures: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MessagesSquareIcon,
    title: "The number you already use",
    body: "Turn SMS on for DIDs you hold with us, or port numbers in and enable them once they land. Voice and text share one number, so customers reply to the one they already know.",
  },
  {
    icon: ImageIcon,
    title: "MMS, not just text",
    body: "Send photos, documents, and group messages from the same registered number. Useful for the jobs where a picture settles the question faster than a paragraph.",
  },
  {
    icon: CheckCheckIcon,
    title: "Receipts, not assumptions",
    body: "Every message comes back with a delivery status in real time, so you know what actually arrived rather than what was merely accepted for sending.",
  },
  {
    icon: ArchiveIcon,
    title: "Logs you can go back to",
    body: "Every sent and received message is kept and searchable, so a conversation from three months ago is still there when compliance, a dispute, or a customer asks about it.",
  },
  {
    icon: WalletIcon,
    title: "Replies cost nothing",
    body: "Inbound SMS and MMS on a local number are free on both plans. A two-way conversation does not get more expensive because the customer answered you.",
  },
  {
    icon: UsersIcon,
    title: "A number per person",
    body: "Allocate numbers to individual users or whole departments so everyone has their own thread, and reassign them in the portal without raising a ticket.",
  },
];

/** What the pipeline above cannot show: what we do when TCR says no. */
const registrationPoints = [
  {
    title: "Rejections come back with reasons",
    body: "When a campaign is sent back we give you the specific cause and what to change, not a status code. Most rejections are avoidable at submission time.",
    doc: { href: "/docs/10dlc-rejections", label: "Common rejection reasons" },
  },
  {
    title: "Approval takes days, not minutes",
    body: "Budget five business days at the quick end and up to three weeks at the slow one. Complete, consistent information across the brand and the campaign is what keeps you moving.",
    doc: { href: "/docs/10dlc-user-guide", label: "Brand and campaign guide" },
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
    icon: MessagesSquareIcon,
    name: "SMS App",
    summary:
      "The messaging client built into the Wiretap portal, for teams who would rather not install anything.",
    points: [
      "Send and receive SMS and MMS in the browser",
      "Numbers allocated per user or department",
      "Full message logs kept for the record",
    ],
  },
  {
    icon: MailIcon,
    name: "Email2SMS and SMS2Email",
    summary:
      "Text from the inbox you already live in. Send an email, it arrives as a message; they reply, it arrives as mail.",
    points: [
      "Works with Gmail, Outlook, and anything else",
      "Replies land back in the same inbox",
      "Different numbers mapped to different addresses",
    ],
  },
  {
    icon: SquareTerminalIcon,
    name: "SMS and MMS API",
    summary:
      "REST over HTTPS for the traffic your own software generates, from order updates to appointment reminders.",
    points: [
      "Send SMS and MMS from your application",
      "Delivery receipts returned on every send",
      "Inbound messages posted to your webhook",
    ],
    doc: { href: "/developers/messaging/send-sms", label: "API reference" },
  },
  {
    icon: FileCheck2Icon,
    name: "10DLC registration",
    summary:
      "Brand and campaign registration with The Campaign Registry, filed by us as a Campaign Service Provider.",
    points: [
      "One TCR form in the portal, we do the filing",
      "Specific reasons when something is rejected",
      "Numbers attached to the campaign once approved",
    ],
    doc: { href: "/docs/10dlc-registration-and-tcr", label: "10DLC and TCR" },
  },
  {
    icon: MessagesSquareIcon,
    name: "3CX messaging",
    summary:
      "Texting inside the 3CX client your team already has open, on the DIDs attached to your trunk.",
    points: [
      "Send from the Chats tab in the 3CX app",
      "Inbound delivered to the 3CX webhook",
      "Importable trunk template to start from",
    ],
    doc: { href: "/docs/3cx-sms-setup-guide", label: "Set up SMS on 3CX" },
  },
  {
    icon: MessagesSquareIcon,
    name: "Yeastar messaging",
    summary:
      "A message channel wired straight to our API, so Linkus handles text alongside the calls it already takes.",
    points: [
      "Send and receive in the Linkus client",
      "Route inbound to an extension or a queue",
      "Choose which extensions may start a thread",
    ],
    doc: { href: "/docs/yeastar-sms-setup-guide", label: "Set up SMS on Yeastar" },
  },
];

const pbxIntegrations = [
  {
    name: "3CX",
    body: "Import the trunk template, enable SMS on the trunk, and point your numbers at the 3CX webhook. Your team texts from the Chats tab in the app they already use.",
    doc: { href: "/docs/3cx-sms-setup-guide", label: "Set up SMS on 3CX" },
  },
  {
    name: "Yeastar",
    body: "Add a message channel against our API, map your SMS-enabled numbers, and choose where inbound lands. Texting then works in Linkus for the extensions you allow.",
    doc: { href: "/docs/yeastar-sms-setup-guide", label: "Set up SMS on Yeastar" },
  },
];

const plans = [
  {
    name: "SMS",
    price: "$0.0080",
    unit: "per outbound message",
    second: "Inbound is free on local numbers",
    body: "Metered per message on the same invoice as your voice. No minimum spend, and no per-number fee — Core-SMS is one charge for the whole account.",
    featured: true,
  },
  {
    name: "MMS",
    price: "$0.0120",
    unit: "per outbound message",
    second: "Inbound is free on local numbers",
    body: "Pictures, documents, and group messages, sent from the same registered numbers and billed the same way.",
    featured: false,
  },
  {
    name: "Toll-free",
    price: "$0.0120",
    unit: "per message, in or out",
    second: "SMS and MMS, one rate",
    body: "Texting on a toll-free number is billed in both directions, so inbound is not free here. Toll-free runs on its own carrier verification rather than 10DLC.",
    featured: false,
  },
];

const faqs = [
  {
    q: "Can I text from the phone numbers I already have?",
    a: "Yes. If the numbers are already with us, enable messaging on them in the portal under Core-SMS and Manage Numbers. If they are elsewhere, port them in and enable them once they land. Voice and text run on the same number, so customers reply to the one they already know.",
  },
  {
    q: "Do I have to register for 10DLC?",
    a: "If you send application-to-person traffic — reminders, notifications, marketing, or support conversations from ordinary ten-digit numbers — then yes. Since 1 February 2025 the major carriers block unregistered SMS and MMS outright, so unregistered messages simply do not arrive. We are a Campaign Service Provider with The Campaign Registry, so you fill in one form in the portal and we file it for you.",
  },
  {
    q: "How long does 10DLC approval take?",
    a: "Five business days at the quick end and up to about three weeks at the slow one. The single biggest factor is whether your submission is complete and consistent, which is why we publish a field-by-field guide before you start filling anything in.",
  },
  {
    q: "What happens if my campaign is rejected?",
    a: "We pass on the specific reason the campaign was sent back along with what to change, then refile it. The common causes are documented, and most of them are avoidable the first time round.",
  },
  {
    q: "Which PBX platforms can send messages?",
    a: "3CX and Yeastar have direct integrations with published step-by-step guides. Any other platform can send through the REST API or through Email2SMS, so you are not blocked by the PBX you happen to run.",
  },
  {
    q: "Am I billed for messages people send me?",
    a: "Not on a local number. Inbound SMS and MMS there are free on both the metered and un-metered plans, and always have been, so you are billed only for what you send. Toll-free numbers are the exception: messaging on them is billed in both directions at the rate above.",
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
                Business texting that{" "}
                <span className="text-brand-blue">actually arrives.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Switch SMS and MMS on for the numbers you already own, then send from the
                portal, your inbox, your PBX, or your own code. We register you with The
                Campaign Registry so your traffic is not the traffic carriers block.
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

      <section className="pb-20 lg:pb-28" aria-labelledby="send-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">One number, four front ends</p>
            <h2 id="send-title" className="display mt-4 text-4xl sm:text-5xl">
              Send it however you already work.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The same DID and the same conversation, whether the message leaves from the
              portal, an email client, a PBX chat window, or a request from your own
              software. Replies come back to wherever you sent from.
            </p>
          </div>

          <div className="mt-12">
            <SendSurfaces />
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="features-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Why our messaging</p>
            <h2 id="features-title" className="display mt-4 text-4xl sm:text-5xl">
              The parts that decide whether a text lands.
            </h2>
          </div>
          <dl className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {messagingFeatures.map((feature) => {
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

      <section className="py-20 lg:py-28" aria-labelledby="tcr-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">10DLC and TCR</p>
            <h2 id="tcr-title" className="display mt-4 text-4xl sm:text-5xl">
              Registration, with someone on your side.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Since February 2025 the major carriers block unregistered A2P traffic
              outright. We are a Campaign Service Provider with The Campaign Registry, so
              you complete one form in the portal and we file it — including the part
              where it comes back.
            </p>
          </div>

          <div className="mt-12">
            <TcrPipeline />
          </div>

          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            {registrationPoints.map((point) => (
              <div key={point.title} className="rounded-[1.5rem] bg-muted p-7">
                <dt className="font-semibold">{point.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </dd>
                <Link
                  href={point.doc.href}
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue"
                >
                  {point.doc.label}
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="family-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">The whole messaging stack</p>
            <h2 id="family-title" className="display mt-4 text-4xl sm:text-5xl">
              Everything that sends a message.
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
              <p className="eyebrow text-brand-blue">PBX integrations</p>
              <h2 id="pbx-title" className="display mt-4 text-4xl sm:text-5xl">
                Text from the PBX you already run.
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                3CX and Yeastar have direct integrations, so messaging shows up in the
                client your team already has open. Everything else sends through the API
                or Email2SMS, which means no platform is a dead end.
              </p>
              <Button className="mt-8" render={<Link href="/docs" />}>
                Read the setup guides
              </Button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {pbxIntegrations.map((integration) => {
                const logo = logoByName.get(integration.name);
                return (
                  <div
                    key={integration.name}
                    className="flex flex-col rounded-[1.75rem] bg-card p-7 ring-1 ring-navy/8"
                  >
                    <span className="flex h-10 items-center">
                      {logo && (
                        <Image
                          src={logo.src}
                          alt={`${logo.name} logo`}
                          width={logo.width}
                          height={logo.height}
                          sizes={logoSizes(logo, 32)}
                          unoptimized={logo.src.endsWith(".svg")}
                          className="max-h-8 w-auto max-w-[9rem] object-contain"
                        />
                      )}
                    </span>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {integration.body}
                    </p>
                    <Link
                      href={integration.doc.href}
                      className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue"
                    >
                      {integration.doc.label}
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="plans-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Pricing</p>
            <h2 id="plans-title" className="display mt-4 text-4xl sm:text-5xl">
              Per message, published.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Core-SMS is $4.99 a month for the account. 10DLC costs $50 once to register
            your brand and $5 a month per live campaign, both on the rate card.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button render={<Link href="/pricing#estimator" />}>Estimate your bill</Button>
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

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="sms-faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">FAQ</p>
            <h2 id="sms-faq-title" className="display mt-4 text-4xl sm:text-5xl">
              Before you send the first one.
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
                Get your first campaign approved.
              </h2>
              <p className="mt-6 text-lg text-white/75">
                Tell us which numbers you want texting on and what you intend to send. We
                will get the brand and campaign filed, work through anything TCR sends
                back, and have you messaging on numbers that are properly registered.
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
