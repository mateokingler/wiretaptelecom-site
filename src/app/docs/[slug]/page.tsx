import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import { DocBlocks } from "@/components/docs/doc-blocks";
import { DocToc } from "@/components/docs/doc-toc";
import { DocsSidebar, DocsSidebarMobile } from "@/components/docs/docs-sidebar";
import { phoneHref, phoneVanity } from "@/components/phone-link";
import { Button } from "@/components/ui/button";
import { docArticles, getAdjacent, getArticle } from "@/content/docs";
import { docCategoryById, tableOfContents } from "@/lib/docs-schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return docArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return { title: article.title, description: article.summary };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const category = docCategoryById.get(article.category);
  const headings = tableOfContents(article);
  const { previous, next } = getAdjacent(article.slug);

  const updated = new Date(article.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="shell">
      <div className="grid gap-x-10 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_14rem]">
        <DocsSidebar articles={docArticles} />

        <article className="min-w-0 py-10 lg:py-14">
          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="transition-colors hover:text-foreground">
                    Docs
                  </Link>
                </li>
                <ChevronRightIcon className="size-3.5" aria-hidden />
                <li className="font-medium text-foreground">{category?.title}</li>
              </ol>
            </nav>
            <div className="ml-auto">
              <DocsSidebarMobile articles={docArticles} />
            </div>
          </div>

          <h1 className="display mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">{article.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {article.summary}
          </p>
          <p className="mt-5 border-b border-border pb-6 text-sm text-muted-foreground">
            Last updated {updated}
          </p>

          <div className="mt-10">
            <DocBlocks blocks={article.blocks} />
          </div>

          <div className="mt-16 max-w-2xl rounded-2xl bg-muted p-6">
            <p className="font-semibold">Still stuck?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {/* Mid-sentence, so the number is written out rather than using the
                  hover swap, which reserves the width of the longer string. */}
              Our help desk answers on{" "}
              <a href={phoneHref} className="font-medium text-brand-blue">
                {phoneVanity}
              </a>
              , or open a ticket. Including the right details gets you a real answer on
              the first reply — see{" "}
              <Link
                href="/docs/submitting-support-tickets"
                className="font-medium text-brand-blue underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue"
              >
                submitting support tickets
              </Link>
              .
            </p>
            <Button
              size="sm"
              className="mt-4"
              render={
                <a
                  href="https://helpdesk.wiretaptelecom.com"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              Contact support
            </Button>
          </div>

          {(previous || next) && (
            <nav
              aria-label="Pagination"
              className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/docs/${previous.slug}`}
                  className="group rounded-2xl p-5 ring-1 ring-navy/8 transition-shadow hover:shadow-md hover:shadow-navy/8"
                >
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                    Previous
                  </span>
                  <span className="mt-1.5 block font-semibold">{previous.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/docs/${next.slug}`}
                  className="group rounded-2xl p-5 text-right ring-1 ring-navy/8 transition-shadow hover:shadow-md hover:shadow-navy/8 sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-1.5 text-sm text-muted-foreground">
                    Next
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-1.5 block font-semibold">{next.title}</span>
                </Link>
              )}
            </nav>
          )}
        </article>

        <DocToc headings={headings} />
      </div>
    </div>
  );
}
