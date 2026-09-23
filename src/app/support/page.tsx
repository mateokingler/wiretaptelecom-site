import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  LifeBuoyIcon,
  PhoneIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { PhoneNumber, phoneHref, phoneVanity } from "@/components/phone-link";

export const metadata: Metadata = {
  title: "Support",
  description: `Three ways to get help from Wiretap Telecom: read the documentation, open a help desk ticket, or call the support line on ${phoneVanity}.`,
};

type Option = {
  icon: LucideIcon;
  title: string;
  description: string;
  action: ReactNode;
  href: string;
  /** tel: and the help desk live outside the app, so they need a plain anchor. */
  external?: boolean;
};

const options: Option[] = [
  {
    icon: BookOpenIcon,
    title: "Read the docs",
    description:
      "Setup guides for 3CX, FreePBX, and Yeastar, plus porting, messaging, fax, and emergency services. No login needed.",
    action: "Browse the docs",
    href: "/docs",
  },
  {
    icon: LifeBuoyIcon,
    title: "Open a ticket",
    description:
      "Writing it up yourself is the fastest route to a fix, and the best one for anything that needs us to look at your account or a specific call.",
    action: "Go to the help desk",
    href: "https://helpdesk.wiretaptelecom.com",
    external: true,
  },
  {
    icon: PhoneIcon,
    title: "Call support",
    description:
      "A US-based telecom specialist answers and writes the ticket up for you. It joins the same queue, so calling adds a step rather than skipping one.",
    action: <PhoneNumber />,
    href: phoneHref,
    external: true,
  },
];

const cardClass =
  "group flex flex-col rounded-[1.75rem] bg-card p-8 ring-1 ring-navy/8 transition-shadow hover:shadow-lg hover:shadow-navy/8";

function OptionCard({ option }: { option: Option }) {
  const Icon = option.icon;
  const body = (
    <>
      <span className="flex size-12 items-center justify-center rounded-full bg-tint-sky text-brand-blue">
        <Icon className="size-6" />
      </span>
      <h2 className="mt-5 text-xl font-semibold">{option.title}</h2>
      <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
        {option.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-blue">
        {option.action}
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </>
  );

  return option.external ? (
    <a href={option.href} className={cardClass}>
      {body}
    </a>
  ) : (
    <Link href={option.href} className={cardClass}>
      {body}
    </Link>
  );
}

export default function Page() {
  return (
    <div>
      <section className="pt-6 pb-16 lg:pb-20">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-18">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="eyebrow text-brand-sky">Support</p>
              <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
                Get unstuck, three ways.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                Look it up yourself, open a ticket, or pick up the phone. Every route
                reaches the same people who work on this network, and everything that is
                not in the docs becomes a ticket — so writing your own is the quickest
                way through.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24" aria-labelledby="options-title">
        <div className="shell">
          <h2 id="options-title" className="sr-only">
            Ways to get help
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {options.map((option) => (
              <OptionCard key={option.href} option={option} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="shell">
          <div className="grid gap-8 rounded-[2rem] bg-muted p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow text-brand-blue">Before you write in</p>
              <h2 className="display mt-4 text-2xl sm:text-3xl">
                A first reply that answers, not asks.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                Every missing detail costs a round trip. Include your account number, and
                for a call problem, the calling number, the number that was dialed, and
                roughly when it happened. The support ticket guide lists what we need for
                call, fax, and messaging issues.
              </p>
            </div>
            <Link
              href="/docs/submitting-support-tickets"
              className="group inline-flex items-center gap-1.5 font-semibold text-brand-blue"
            >
              Submitting support tickets
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
