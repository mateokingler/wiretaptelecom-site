import Link from "next/link";
import {
  ArrowRightIcon,
  HashIcon,
  MessageSquareIcon,
  PhoneCallIcon,
  PrinterIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Next.js ignores a metadata export here, so the title falls back to the one in
 * the root layout. It injects `robots: noindex` on 404s by itself.
 */

type Destination = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** The same four products as the header menu, worded the same way. */
const destinations: Destination[] = [
  {
    href: "/sip-trunking",
    title: "SIP trunking",
    description: "IP or registration auth, failover, PBX templates.",
    icon: PhoneCallIcon,
  },
  {
    href: "/phone-numbers",
    title: "Phone numbers",
    description: "Local, toll-free, porting, and bulk ordering.",
    icon: HashIcon,
  },
  {
    href: "/sms-mms",
    title: "SMS and MMS",
    description: "Portal, Email2SMS, 10DLC, and API.",
    icon: MessageSquareIcon,
  },
  {
    href: "/fax",
    title: "Fax",
    description: "Email to fax and back, with no page fees.",
    icon: PrinterIcon,
  },
];

const elsewhere = [
  { href: "/docs", label: "Docs" },
  { href: "/developers", label: "API reference" },
  { href: "/pricing", label: "Pricing" },
  { href: "/status", label: "Network status" },
  { href: "/support", label: "Support" },
];

export default function NotFound() {
  return (
    <div>
      <section className="pt-6 pb-16 lg:pb-20">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-18">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="eyebrow text-brand-sky">Error 404</p>
              <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
                This page is not in service.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                The link is broken, the page moved, or the address has a typo in it.
                Nothing here says anything about your account or the network. If you
                came looking for a live problem, check{" "}
                <Link href="/status" className="underline hover:text-white">
                  network status
                </Link>{" "}
                instead.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button size="lg" render={<Link href="/" />}>
                  Back to the homepage
                </Button>
                <Button size="lg" variant="onDark" render={<Link href="/docs" />}>
                  Read the docs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24" aria-labelledby="destinations-title">
        <div className="shell">
          <h2 id="destinations-title" className="display text-2xl sm:text-3xl">
            Looking for one of these?
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => {
              const Icon = destination.icon;
              return (
                <Link
                  key={destination.href}
                  href={destination.href}
                  className="group flex flex-col rounded-[1.5rem] bg-card p-6 ring-1 ring-navy/8 transition-shadow hover:shadow-lg hover:shadow-navy/8"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-tint-sky text-brand-blue">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 flex items-center gap-1.5 text-lg font-semibold">
                    {destination.title}
                    <ArrowRightIcon className="size-4 text-brand-blue transition-transform group-hover:translate-x-0.5" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {destination.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="shell">
          <div className="grid gap-8 rounded-[2rem] bg-muted p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow text-brand-blue">Still nothing?</p>
              <h2 className="display mt-4 text-2xl sm:text-3xl">
                Tell us which link sent you here.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                If you followed a link from somewhere on this site, it is our mistake and
                we would like to fix it. Support can also point you at the right page.
              </p>
            </div>
            <Link
              href="/support"
              className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
            >
              Get in touch
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {elsewhere.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full bg-card px-4 py-2 text-sm font-semibold ring-1 ring-navy/8 transition-colors hover:bg-tint-sky hover:text-brand-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
