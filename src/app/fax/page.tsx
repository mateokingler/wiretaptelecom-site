import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  AtSignIcon,
  CheckIcon,
  CircleDollarSignIcon,
  FilesIcon,
  LayoutDashboardIcon,
  type LucideIcon,
  MailIcon,
  MonitorPlayIcon,
  PhoneCallIcon,
  PrinterIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  ShuffleIcon,
} from "lucide-react";
import { FaxTracker } from "@/components/fax-tracker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Fax",
  description:
    "Core-Fax sends and receives fax through the email client you already use, with no per-page fees, unlimited addresses and numbers, real-time tracking, and a gateway for the fax machine you want to keep.",
};

const heroStats = [
  { value: "$19.99", label: "A month for Core-Fax, published" },
  { value: "$0", label: "Per-page fees, on every fax" },
  { value: "Unlimited", label: "Email addresses and fax numbers" },
  { value: "T.38", label: "Straight to the PSTN, no PBX in the path" },
];

const faxFeatures: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: CircleDollarSignIcon,
    title: "Nobody counts your pages",
    body: "The page fee is how most fax services make their money, and we do not charge one. Past the flat monthly fee a fax bills as ordinary voice usage, so a sixty-page contract costs what a call of the same length costs and not a cent more.",
  },
  {
    icon: RefreshCwIcon,
    title: "It retries until it lands",
    body: "Most services dial once, fail, and email you an apology. We attempt the fax again, and across different routes, because the problem is usually one bad path rather than a machine that will never answer.",
  },
  {
    icon: AtSignIcon,
    title: "Register the domain, not the people",
    body: "Add your domain once and everyone on it can fax without being set up individually. Assign as many addresses as you like to an inbound number, and each one receives the fax as a PDF.",
  },
  {
    icon: FilesIcon,
    title: "Cover pages that merge themselves",
    body: "Attach several PDFs and each goes out as its own fax. Include one named cover page and Core-Fax merges everything into a single document with the cover on top instead, in whatever order you attached them.",
  },
  {
    icon: ShuffleIcon,
    title: "One number for voice and fax",
    body: "Any number on your account can carry fax, on its own or alongside voice. Our switches listen for fax tone and route accordingly at no extra charge, and a number can be made dedicated the moment the volume justifies it.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Signed like any other call",
    body: "Your fax header caller ID is a number from your own account, so the call carries full STIR/SHAKEN attestation. Borrowed caller IDs get a poor attestation and are far more likely to be rejected at the far end.",
  },
];

const sendingSteps = [
  {
    title: "Compose it like any other email",
    body: "Open the client you already use. There is no plugin, no desktop application, and nothing for IT to roll out to anybody — Core-Fax works with any mail service that produces standard email.",
  },
  {
    title: "Address it, subject line and all",
    body: "Send to fax@core-fax.com and put the destination number in the subject. Ten digits, E.164, or buried in real text like “Re: title company @1 (816) 947-3827” all parse. Machines that cannot set a subject can send to 8169473827@core-fax.com instead.",
  },
  {
    title: "Attach your PDFs",
    body: "Up to 40MB by email, or 50MB through the portal when a file is larger than your mail server will carry. Leave the body blank — anything written there is ignored rather than faxed.",
  },
  {
    title: "Send, and watch it cross",
    body: "The fax appears in Fax-Tracker within about five seconds and updates itself from there. Confirmation emails are optional, set per number and overridable for the one person who does not want them.",
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
    icon: MailIcon,
    name: "Core-Fax",
    summary:
      "Send and receive fax from any email-enabled device. Running since 2017 and the most used product we have.",
    points: [
      "Unlimited email domains and addresses",
      "Several PDFs in one email, one fax each",
      "Optional read-receipt confirmations",
    ],
    link: { href: "/docs/core-fax-user-guide", label: "Read the user guide" },
  },
  {
    icon: PrinterIcon,
    name: "Fax ATA Gateway",
    summary:
      "Keep the fax machine and take the PBX out of the fax path by connecting the ATA straight to us.",
    points: [
      "Three values to change on the device",
      "Unlimited ATAs, one per fax machine",
      "Works anywhere you can carry the device",
    ],
  },
  {
    icon: MonitorPlayIcon,
    name: "Visual Fax Tracking",
    summary:
      "A live control centre for every fax moving in or out, included free with Core-Fax.",
    points: [
      "In-flight status within seconds of sending",
      "Gateway, carrier switch, and caller ID metadata",
      "The reason a fax failed, in one click",
    ],
  },
  {
    icon: LayoutDashboardIcon,
    name: "Portal faxing",
    summary:
      "Send without an email client at all, for the files your mail server will not carry.",
    points: [
      "Up to 50MB, one file per fax",
      "Choose any caller ID on the account",
      "Sent history on the same screen",
    ],
  },
  {
    icon: PhoneCallIcon,
    name: "Dedicated and hybrid numbers",
    summary:
      "Decide per number whether it is fax only or handles both, and change your mind later.",
    points: [
      "Dedicated numbers process instantly, no tone wait",
      "Hybrid carries voice and fax on one number",
      "Any number on the account is eligible",
    ],
    link: { href: "/phone-numbers", label: "Get a fax number" },
  },
  {
    icon: ShuffleIcon,
    name: "Blended faxing",
    summary:
      "Mix the products rather than choosing between them, on the same numbers and the same bill.",
    points: [
      "Send from the machine, receive to email",
      "Or the reverse, per number, per user",
      "One portal, one invoice, one support number",
    ],
  },
];

const costs = [
  {
    name: "Core-Fax",
    price: "$19.99",
    unit: "per month",
    detail:
      "Email to fax and fax to email, with unlimited domains, email addresses, and fax numbers.",
  },
  {
    name: "Per-page fees",
    price: "$0",
    unit: "",
    detail:
      "Not discounted and not bundled into a plan. We do not meter pages at all, on any fax product.",
    highlight: true,
  },
  {
    name: "Visual Fax Tracking",
    price: "Free",
    unit: "",
    detail:
      "Real-time tracking of every fax in and out, included with Core-Fax at no charge.",
    highlight: true,
  },
  {
    name: "Transmission",
    price: "Voice rate",
    unit: "per minute",
    detail:
      "Faxes bill as standard voice usage on your account plan, metered or un-metered.",
  },
  {
    name: "Fax ATA Gateway",
    price: "Managed",
    unit: "",
    detail:
      "We manage your side of the connection and you manage the ATA. No charge per device.",
  },
  {
    name: "Fax number",
    price: "$1.99",
    unit: "per month",
    detail:
      "Any number can carry fax, at the ordinary number rate. Toll-free numbers are $2.99.",
  },
];

const faqs = [
  {
    q: "Do I need a fax machine?",
    a: "No. Core-Fax works entirely through email — you attach PDFs to a message and a fax comes out at the other end, and inbound faxes arrive as PDFs in your inbox. If you would rather keep the machine you have, the Fax ATA Gateway connects it directly to us through an analogue telephone adapter, which also takes your PBX out of the fax path.",
  },
  {
    q: "Is there really no per-page fee?",
    a: "Really. Core-Fax is $19.99 a month and pages are never metered, however many you send, and Visual Fax Tracking is included in that at no extra charge. The only other cost is the voice usage for the time each transmission takes, at the same rate as any other call on your plan. There is no separate fax invoice to reconcile.",
  },
  {
    q: "Can several people receive faxes on the same number?",
    a: "Yes, and there is no limit. Every email address assigned to a number receives each inbound fax as a PDF. Settings like confirmation emails and receive file type are set at the number level and can be overridden for one individual address, so one person opting out does not change it for everybody else.",
  },
  {
    q: "Can I add a cover page?",
    a: "Yes. Attach it alongside your other PDFs with a recognised filename — coverpage.pdf, cover-page.pdf, cover_page.pdf and similar variations all work, in any case. Adding one changes how the email is processed: instead of each attachment going as its own fax, Core-Fax merges all the PDFs into a single document with the cover page first.",
  },
  {
    q: "Should my fax number be dedicated or hybrid?",
    a: "Dedicated is more reliable and is what we recommend. On a dedicated number our switches know no voice call will ever arrive, so the fax is processed immediately. A hybrid number carries both, which means holding every inbound call for about five seconds while we listen for fax tone. Plenty of sending machines follow the T.38 standard loosely enough that some faxes take the voice route anyway, and a dedicated number is the only complete fix.",
  },
  {
    q: "What is an ATA, and where do I get one?",
    a: "An analogue telephone adapter converts fax signalling into SIP so the machine can talk to a modern network. They are inexpensive and sold in most online electronics marketplaces — you do not buy it from us. We give you credentials in the portal, you change three values on the device, and that is the installation. We support the connectivity and will happily help troubleshoot the device itself.",
  },
  {
    q: "How secure is it?",
    a: "Inside our network, faxes are handled with industry best practices and sit in a private network within an access-controlled data centre. Being straight with you about the rest: a fax still traverses the PSTN and lands on a machine in somebody else's office, so no carrier can honestly call the whole path secure. Treat the transport as protected and the destination as you would any other.",
  },
  {
    q: "How quickly does a fax show up in the tracker?",
    a: "About five seconds for an outbound fax, and within seconds of our carrier switch processing an inbound one. It updates without refreshing the page. If a fax appears to stall, it is usually our retry logic working — a failed attempt is retried on other routes before the fax is marked failed, and the tracker follows it through to the end.",
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
                Send a fax{" "}
                {/* inline-block keeps the break between the two clauses rather than
                    stranding "like" at the end of the first line. */}
                <span className="inline-block text-brand-blue">
                  like you send an email.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Core-Fax sends and receives fax through the email client your team already
                has. It is $19.99 a month for unlimited addresses and unlimited fax
                numbers, and nobody counts your pages. When a fax does not go through, we
                keep trying it on other routes until it does.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
                <Button size="lg" variant="outline" render={<Link href="#sending" />}>
                  See how sending works
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

      <section className="pb-20 lg:pb-28" aria-labelledby="tracker-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Visual fax tracking</p>
            <h2 id="tracker-title" className="display mt-4 text-4xl sm:text-5xl">
              Watch the fax, not the machine.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Fax-Tracker is a live view of everything moving in and out, updating within
              seconds and without a refresh. You see the stage each fax has reached, the
              gateway and route carrying it, and — when one fails — the reason, in a
              click.
            </p>
          </div>

          <div className="mt-12">
            <FaxTracker />
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="features-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Why our fax</p>
            <h2 id="features-title" className="display mt-4 text-4xl sm:text-5xl">
              The parts other providers charge for.
            </h2>
          </div>
          <dl className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {faxFeatures.map((feature) => {
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
        id="sending"
        className="scroll-mt-24 py-20 lg:py-28"
        aria-labelledby="sending-title"
      >
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="eyebrow text-brand-blue">Sending a fax</p>
              <h2 id="sending-title" className="display mt-4 text-4xl sm:text-5xl">
                An email with a phone number on it.
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Nobody needs training for this, which is the point. Faxing is a
                requirement handed down by a hospital, a title company, or a regulator,
                and the least it can do is not become a project. If your team can send an
                attachment, they can send a fax.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button render={<Link href="/talk-to-sales" />}>Talk to sales</Button>
                <Link
                  href="/docs/core-fax-user-guide"
                  className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
                >
                  Read the Core-Fax guide
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <ol className="space-y-5">
              {sendingSteps.map((step, index) => (
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
            <p className="eyebrow text-brand-blue">The whole fax stack</p>
            <h2 id="family-title" className="display mt-4 text-4xl sm:text-5xl">
              Every way a fax gets in or out.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Take one of these or blend them together. They share the same numbers, the
              same portal, and the same invoice.
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
            <p className="eyebrow text-brand-blue">What fax costs</p>
            <h2 id="cost-title" className="display mt-4 text-4xl sm:text-5xl">
              $19.99 a month, however many pages.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              One flat fee covers unlimited fax numbers, unlimited email addresses, and
              Visual Fax Tracking. After that the only variable is how long a transmission
              takes, because that bills as voice at your plan rate — the same rate as a
              phone call to the same place.
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
              See every rate, including voice
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28" aria-labelledby="fax-faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand-blue">FAQ</p>
            <h2 id="fax-faq-title" className="display mt-4 text-4xl sm:text-5xl">
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
                Send us your last fax bill.
              </h2>
              <p className="mt-6 text-lg text-white/75">
                Bring the page count and we will tell you what the same volume costs here,
                which is $19.99 and the minutes. We will also work out whether your
                numbers should be dedicated or hybrid before you move anything.
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
