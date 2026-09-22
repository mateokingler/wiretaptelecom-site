import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, DownloadIcon, KeyRoundIcon, TerminalIcon } from "lucide-react";
import { CodeBlock } from "@/components/api/code-block";
import { renderInline } from "@/components/docs/doc-blocks";
import { Button } from "@/components/ui/button";
import { apiServices, operationHref, serviceOperations } from "@/content/api";
import {
  APIKEY_PLACEHOLDER,
  BEARER_PLACEHOLDER,
  renderSample,
} from "@/lib/api-samples";
import { exampleBody } from "@/lib/openapi";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "The Wiretap Telecom API reference. Send SMS and MMS, receive inbound messages on a webhook, and run every call from the browser before you write any code.",
};

/**
 * Sourced from the portal walkthroughs in the messaging guides, so the steps
 * match what someone actually clicks.
 */
const quickstart = [
  {
    title: "Enable the number",
    body: "In the portal, go to **Core-SMS → Manage Numbers**, click the plus sign, select the number you want to send from, and click **Enable**.",
  },
  {
    title: "Register with TCR",
    body: "Carriers block unregistered traffic. Submit the **Core-SMS → TCR Form** and read [10DLC registration and TCR](/docs/10dlc-registration-and-tcr) before you start.",
  },
  {
    title: "Generate your keys",
    body: "Hover your avatar, open **Company Settings → API Keys**, and copy both the auth token and the bearer token. You need both on every call.",
  },
];

export default function Page() {
  // One live sample on the overview, taken from the first operation we
  // publish, so the page opens on something that runs rather than prose.
  const [service] = apiServices;
  const [first] = service.spec.operations;

  const curl = renderSample("curl", {
    method: first.method.toUpperCase(),
    url: `${service.spec.baseUrl}${first.path}`,
    query: { apikey: APIKEY_PLACEHOLDER },
    bearer: BEARER_PLACEHOLDER,
    body: first.requestBody ? exampleBody(first.requestBody.schema) : undefined,
  });

  return (
    <div>
      <section className="pt-6 pb-16 lg:pb-20">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-18">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <div>
                <p className="eyebrow text-brand-sky">Developers</p>
                <h1 className="display mt-4 text-4xl sm:text-5xl">
                  Two tokens and a POST.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                  Send a text from any number on your account. Every endpoint on these
                  pages runs from the browser, against your own account, before you
                  write a line of code.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    render={<Link href={operationHref(service.id, first.slug)} />}
                  >
                    {first.summary}
                    <ArrowRightIcon className="size-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    render={<a href={service.spec.specPath} download />}
                  >
                    <DownloadIcon className="size-4" />
                    OpenAPI spec
                  </Button>
                </div>
              </div>
              <CodeBlock
                code={curl}
                label="Send a message"
                className="min-w-0 ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Before your first call</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">
              Three things to do in the portal.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {quickstart.map((step, index) => (
              <div key={step.title} className="rounded-[1.5rem] bg-card p-7 ring-1 ring-navy/8">
                <span className="flex size-8 items-center justify-center rounded-full bg-navy font-mono text-xs font-semibold text-white tabular-nums">
                  {index + 1}
                </span>
                <p className="mt-4 font-semibold">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {renderInline(step.body)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="eyebrow text-brand-blue">Authentication</p>
              <h2 className="display mt-4 text-3xl sm:text-4xl">
                Both tokens, every time.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                The portal issues two values on the same screen and they are not
                interchangeable. One rides in the header, the other in the query string.
                A call missing either one is rejected.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Base URL{" "}
                <code className="rounded-md bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-foreground ring-1 ring-navy/8">
                  {service.spec.baseUrl}
                </code>
              </p>
            </div>

            <div className="space-y-4">
              {service.spec.security.map((scheme) => (
                <div key={scheme.id} className="rounded-[1.5rem] bg-card p-7 ring-1 ring-navy/8">
                  <span className="flex size-10 items-center justify-center rounded-full bg-tint-sky text-brand-blue">
                    <KeyRoundIcon className="size-5" />
                  </span>
                  <p className="mt-4 font-semibold">
                    {scheme.kind === "bearer" ? "Bearer token" : "Auth token"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {renderInline(scheme.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Reference</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">Every endpoint we run.</h2>
          </div>

          <div className="mt-12 space-y-6">
            {apiServices.map((entry) => {
              const Icon = entry.icon;
              return (
                <div
                  key={entry.id}
                  className="grid gap-8 rounded-[1.75rem] bg-card p-7 ring-1 ring-navy/8 sm:p-9 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-14"
                >
                  <div>
                    <span className="flex size-10 items-center justify-center rounded-full bg-tint-sky text-brand-blue">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {entry.description}
                    </p>
                  </div>
                  <ul className="divide-y divide-border border-t border-border lg:border-t-0">
                    {serviceOperations(entry).map((operation) => (
                      <li key={operation.slug}>
                        <Link
                          href={operationHref(entry.id, operation.slug)}
                          className="group flex flex-wrap items-center gap-x-3 gap-y-1 py-4 transition-colors hover:text-brand-blue"
                        >
                          <span className="w-16 shrink-0 font-mono text-[0.625rem] font-semibold uppercase text-muted-foreground">
                            {operation.kind === "webhook"
                              ? "Inbound"
                              : operation.method.toUpperCase()}
                          </span>
                          <span className="font-medium">{operation.summary}</span>
                          <span className="ml-auto flex items-center gap-2 font-mono text-xs text-muted-foreground">
                            {operation.kind === "webhook" ? "your URL" : operation.path}
                            <ArrowRightIcon className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                          </span>
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

      <section className="pb-20 lg:pb-28">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-16 text-center text-white sm:px-14">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <TerminalIcon className="mx-auto size-6 text-primary" />
              <h2 className="display mt-5 text-3xl sm:text-4xl">
                Building something we do not cover yet?
              </h2>
              <p className="mt-5 text-lg text-white/75">
                Messaging is the first API we have published and more are coming. Tell us
                what you need to automate and we will tell you where it sits on the list.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  render={<Link href="/docs" />}
                >
                  Read the setup guides
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
