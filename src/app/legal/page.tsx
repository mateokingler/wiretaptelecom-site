import { Fragment } from "react";
import type { Metadata } from "next";
import { LegalNav } from "@/components/legal-nav";
import { legalSections, type LegalSpan } from "@/content/legal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Wiretap Telecom terms and conditions, usage policy, porting guidelines, and law enforcement contact information.",
};

/** Top-level clauses read "7. TITLE"; subclauses read "7.1 TITLE". */
const startsClause = (text: string) => /^\d+\.\s/.test(text);

function renderSpan(span: LegalSpan, key: number) {
  // Hard breaks in the published copy are meaningful: they separate the
  // porting checklist and the law enforcement address.
  const lines = span.text.split("\n");
  const content = lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));

  if (!span.href) return <Fragment key={key}>{content}</Fragment>;

  return (
    <a
      key={key}
      href={span.href}
      className="text-brand-blue underline underline-offset-4 hover:no-underline"
    >
      {content}
    </a>
  );
}

export default function Page() {
  return (
    <div>
      <section className="pt-6 pb-14">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-18">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="eyebrow text-brand-sky">Legal</p>
              <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
                Terms, policies, and the fine print.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                The agreement that governs your use of Wiretap Telecom services, plus our
                usage policy, porting guidelines, and where to send law enforcement
                requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <LegalNav
              items={legalSections.map(({ id, title }) => ({ id, title }))}
            />

            <div className="min-w-0 max-w-3xl">
              {legalSections.map((section, sectionIndex) => (
                <section
                  key={section.id}
                  aria-labelledby={section.id}
                  className={sectionIndex > 0 ? "mt-16" : undefined}
                >
                  <h2
                    id={section.id}
                    className="display scroll-mt-28 text-2xl sm:text-3xl"
                  >
                    {section.title}
                  </h2>

                  <div className="mt-6">
                    {section.paragraphs.map((spans, index) => {
                      const text = spans.map((span) => span.text).join("");
                      // Extra air before each new top-level clause keeps 42
                      // numbered sections scannable.
                      const isClause = startsClause(text);
                      return (
                        <p
                          key={index}
                          className={cn(
                            "text-[0.95rem] leading-relaxed text-muted-foreground",
                            index > 0 && (isClause ? "mt-8" : "mt-4")
                          )}
                        >
                          {spans.map(renderSpan)}
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
