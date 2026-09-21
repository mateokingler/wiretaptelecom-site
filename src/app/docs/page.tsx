import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";
import { DocsSearch } from "@/components/docs/docs-search";
import { PhoneNumber, phoneHref } from "@/components/phone-link";
import { Button } from "@/components/ui/button";
import { articlesInCategory, docArticles } from "@/content/docs";
import { docCategories } from "@/lib/docs-schema";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Setup guides, portal walkthroughs, and reference for Wiretap Telecom SIP trunking, phone numbers, messaging, fax, and emergency services.",
};

const startHere = [
  {
    slug: "creating-a-sip-trunk",
    label: "Create your first trunk",
    detail: "Provision a trunk, pick an authentication mode, and point numbers at it.",
  },
  {
    slug: "configuring-your-trunk-with-3cx-v20",
    label: "Connect your PBX",
    detail: "Templates and step-by-step settings for 3CX, FreePBX, and Yeastar.",
  },
  {
    slug: "port-numbers-to-wiretap-telecom",
    label: "Bring your numbers",
    detail: "Submit a port-in order and plan the cutover so nothing drops.",
  },
];

export default function Page() {
  return (
    <div>
      <section className="pt-6 pb-16 lg:pb-20">
        <div className="shell">
          {/* No overflow-hidden here: the search dropdown has to escape the card. The
              aurora rounds itself instead, since it is only a background gradient. */}
          <div className="relative rounded-[2rem] bg-navy px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-18">
            <div
              className="aurora absolute inset-0 rounded-[2rem] opacity-60"
              aria-hidden
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="eyebrow text-brand-sky">Documentation</p>
              <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
                Everything we know, written down.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                {docArticles.length} guides covering trunking, PBX setup, porting,
                messaging, fax, and emergency services. No login required.
              </p>
              <div className="mt-9 text-left">
                <DocsSearch articles={docArticles} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="shell">
          <h2 className="eyebrow text-brand-blue">Start here</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {startHere.map((item, index) => (
              <Link
                key={item.slug}
                href={`/docs/${item.slug}`}
                className="group rounded-[1.5rem] bg-card p-7 ring-1 ring-navy/8 transition-shadow hover:shadow-lg hover:shadow-navy/8"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-navy font-mono text-xs font-semibold text-white tabular-nums">
                  {index + 1}
                </span>
                <p className="mt-4 flex items-center gap-1.5 font-semibold">
                  {item.label}
                  <ArrowRightIcon className="size-4 text-brand-blue transition-transform group-hover:translate-x-0.5" />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Browse</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">Every guide, by topic.</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {docCategories.map((category) => {
              const articles = articlesInCategory(category.id);
              if (articles.length === 0) return null;
              const Icon = category.icon;

              return (
                <div
                  key={category.id}
                  className="flex flex-col rounded-[1.75rem] bg-card p-7 ring-1 ring-navy/8"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-tint-sky text-brand-blue">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                  <ul className="mt-5 space-y-1 border-t border-border pt-4">
                    {articles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/docs/${article.slug}`}
                          className="group -mx-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                          {article.title}
                          <ArrowRightIcon className="ml-auto size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-16 text-center text-white sm:px-14">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="display text-3xl sm:text-4xl">
                Can&apos;t find it? Ask a human.
              </h2>
              <p className="mt-5 text-lg text-white/75">
                Our help desk is staffed around the clock. Tell us what you are trying to
                do and we will walk you through it.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  render={<a href={phoneHref} />}
                >
                  <PhoneIcon className="size-4" />
                  <PhoneNumber />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
