import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon, KeyRoundIcon } from "lucide-react";
import { ApiSidebar, ApiSidebarMobile } from "@/components/api/api-sidebar";
import { CodeBlock } from "@/components/api/code-block";
import { FieldTable } from "@/components/api/field-table";
import { TryIt } from "@/components/api/try-it";
import { renderInline } from "@/components/docs/doc-blocks";
import {
  allOperations,
  apiNavSections,
  getOperation,
  operationHref,
} from "@/content/api";
import {
  APIKEY_PLACEHOLDER,
  BEARER_PLACEHOLDER,
  SAMPLE_LANGUAGES,
  renderSample,
} from "@/lib/api-samples";
import { exampleBody, isTryable } from "@/lib/openapi";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ service: string; operation: string }> };

export function generateStaticParams() {
  return allOperations().map(({ service, operation }) => ({
    service: service.id,
    operation: operation.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, operation } = await params;
  const match = getOperation(service, operation);
  if (!match) return {};

  return {
    title: `${match.operation.summary} · ${match.service.title} API`,
    description: match.operation.description || match.service.spec.summary,
  };
}

export default async function Page({ params }: Props) {
  const { service: serviceId, operation: slug } = await params;
  const match = getOperation(serviceId, slug);
  if (!match) notFound();

  const { service, operation } = match;
  const { spec } = service;
  const webhook = operation.kind === "webhook";
  const nav = apiNavSections();

  const sequence = allOperations();
  const index = sequence.findIndex(
    (item) => item.service.id === service.id && item.operation.slug === operation.slug
  );
  const previous = sequence[index - 1];
  const next = sequence[index + 1];

  const requestExample = operation.requestBody
    ? exampleBody(operation.requestBody.schema)
    : undefined;

  return (
    <div className="shell">
      <div className="grid gap-x-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <ApiSidebar sections={nav} />

        <article className="min-w-0 py-10 lg:py-14">
          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/developers" className="transition-colors hover:text-foreground">
                    Developers
                  </Link>
                </li>
                <ChevronRightIcon className="size-3.5" aria-hidden />
                <li className="font-medium text-foreground">{service.title}</li>
              </ol>
            </nav>
            <div className="ml-auto">
              <ApiSidebarMobile sections={nav} />
            </div>
          </div>

          <h1 className="display mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">
            {operation.summary}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-sm">
            <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-semibold uppercase text-white">
              {webhook ? "Inbound" : operation.method}
            </span>
            <span className="break-all text-muted-foreground">
              {webhook ? "Your URL, registered per number" : `${spec.baseUrl}${operation.path}`}
            </span>
          </div>

          {operation.description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {renderInline(operation.description)}
            </p>
          )}

          {!webhook && (
            <Section title="Authorization">
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                Every call carries both credentials. They come from the same screen in
                the portal and are not interchangeable.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {spec.security.map((scheme) => (
                  <div key={scheme.id} className="rounded-2xl bg-muted p-5">
                    <div className="flex items-center gap-2">
                      <KeyRoundIcon className="size-4 text-brand-blue" />
                      <p className="font-mono text-sm font-semibold">
                        {scheme.kind === "bearer" ? "Authorization" : scheme.name}
                      </p>
                      <span className="eyebrow ml-auto text-[0.625rem] text-muted-foreground">
                        {scheme.kind === "bearer" ? "Header" : "Query"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {renderInline(scheme.description)}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {operation.requestBody && (
            <Section title={webhook ? "What we send" : "Request body"}>
              {operation.requestBody.description && (
                <p className="max-w-2xl leading-relaxed text-muted-foreground">
                  {renderInline(operation.requestBody.description)}
                </p>
              )}
              <div className="mt-6">
                <FieldTable schema={operation.requestBody.schema} />
              </div>
              {webhook && requestExample !== undefined && (
                <div className="mt-6">
                  <CodeBlock
                    code={JSON.stringify(requestExample, null, 2)}
                    language="json"
                    label="Example payload"
                  />
                </div>
              )}
            </Section>
          )}

          <Section title={webhook ? "What to return" : "Responses"}>
            <div className="space-y-8">
              {operation.responses.map((response) => (
                <div key={response.status}>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 font-mono text-xs font-semibold",
                        response.status.startsWith("2")
                          ? "bg-tint-mist text-navy-soft"
                          : "bg-tint-sand text-navy-soft"
                      )}
                    >
                      {response.status}
                    </span>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {renderInline(response.description)}
                    </p>
                  </div>
                  {response.schema && (
                    <div className="mt-4">
                      <FieldTable schema={response.schema} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {!webhook && (
            <Section title="Try it">
              {isTryable(operation) ? (
                <TryIt
                  serviceId={service.id}
                  operation={operation}
                  baseUrl={spec.baseUrl}
                  security={spec.security}
                />
              ) : (
                <div className="space-y-4">
                  {SAMPLE_LANGUAGES.map((language) => (
                    <CodeBlock
                      key={language.id}
                      label={language.label}
                      code={renderSample(language.id, {
                        method: operation.method.toUpperCase(),
                        url: `${spec.baseUrl}${operation.path}`,
                        query: Object.fromEntries(
                          spec.security
                            .filter((scheme) => scheme.kind === "query")
                            .map((scheme) => [scheme.name, APIKEY_PLACEHOLDER])
                        ),
                        bearer: spec.security.some((scheme) => scheme.kind === "bearer")
                          ? BEARER_PLACEHOLDER
                          : undefined,
                        body: requestExample,
                      })}
                    />
                  ))}
                </div>
              )}
            </Section>
          )}

          {service.guides.length > 0 && (
            <div className="mt-16 max-w-2xl rounded-2xl bg-muted p-6">
              <p className="font-semibold">Doing this without code?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                The same ground, covered from the portal and the PBX side.
              </p>
              <ul className="mt-4 space-y-1.5">
                {service.guides.map((guide) => (
                  <li key={guide.href}>
                    <Link
                      href={guide.href}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue"
                    >
                      {guide.title}
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(previous || next) && (
            <nav
              aria-label="Pagination"
              className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={operationHref(previous.service.id, previous.operation.slug)}
                  className="group rounded-2xl p-5 ring-1 ring-navy/8 transition-shadow hover:shadow-md hover:shadow-navy/8"
                >
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                    Previous
                  </span>
                  <span className="mt-1.5 block font-semibold">
                    {previous.operation.summary}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={operationHref(next.service.id, next.operation.slug)}
                  className="group rounded-2xl p-5 text-right ring-1 ring-navy/8 transition-shadow hover:shadow-md hover:shadow-navy/8 sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-1.5 text-sm text-muted-foreground">
                    Next
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-1.5 block font-semibold">{next.operation.summary}</span>
                </Link>
              )}
            </nav>
          )}

          <div className="mt-12 text-sm text-muted-foreground">
            Generated from{" "}
            <a
              href={spec.specPath}
              download
              className="font-medium text-brand-blue underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue"
            >
              the OpenAPI spec
            </a>{" "}
            for {spec.title} v{spec.version}.
          </div>
        </article>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="display scroll-mt-28 text-2xl sm:text-[1.75rem]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
