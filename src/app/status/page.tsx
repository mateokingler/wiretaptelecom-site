import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  BellIcon,
  CalendarClockIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildRows,
  componentTone,
  formatMoment,
  formatWindow,
  getStatusSummary,
  humanise,
  indicatorTone,
  STATUS_PAGE_URL,
  type Incident,
  type StatusComponent,
} from "@/lib/statuspage";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Network status",
  description:
    "Live operational status for Wiretap Telecom voice, messaging, fax, portal, and billing services, straight from our NOC status page.",
};

// Fresh enough to be useful during an incident without hammering Statuspage.
export const revalidate = 60;

function StatusPill({ status }: { status: StatusComponent["status"] }) {
  const tone = componentTone(status);
  return (
    <span className={cn("flex items-center gap-2 text-sm font-medium", tone.text)}>
      <span className={cn("size-2 shrink-0 rounded-full", tone.dot)} aria-hidden />
      {tone.label}
    </span>
  );
}

function ComponentRow({
  component,
  nested = false,
}: {
  component: StatusComponent;
  nested?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4",
        nested && "pl-4 sm:pl-6"
      )}
    >
      <div className="min-w-0">
        <p className={cn("font-medium", nested && "text-sm")}>{component.name}</p>
        {component.description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{component.description}</p>
        )}
      </div>
      <StatusPill status={component.status} />
    </div>
  );
}

function IncidentCard({
  incident,
  timeZone,
  scheduled = false,
}: {
  incident: Incident;
  timeZone: string;
  scheduled?: boolean;
}) {
  // Updates arrive newest first; the most recent one is the story.
  const latest = incident.incident_updates[0];

  return (
    <article className="rounded-[1.5rem] bg-card p-6 ring-1 ring-navy/8 sm:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-lg font-semibold">{incident.name}</h3>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
          {humanise(incident.status)}
        </span>
      </div>

      {scheduled && incident.scheduled_for && incident.scheduled_until && (
        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-brand-blue">
          <CalendarClockIcon className="size-4 shrink-0" />
          {formatWindow(incident.scheduled_for, incident.scheduled_until, timeZone)}
        </p>
      )}

      {latest && (
        <>
          <p className="mt-3 leading-relaxed text-muted-foreground">{latest.body}</p>
          <p className="mt-3 text-xs text-muted-foreground/80">
            {humanise(latest.status)} · {formatMoment(latest.display_at, timeZone)}
          </p>
        </>
      )}

      <a
        href={incident.shortlink}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
      >
        Full timeline
        <ArrowRightIcon className="size-3.5" />
      </a>
    </article>
  );
}

export default async function Page() {
  const summary = await getStatusSummary();

  if (!summary) {
    return (
      <div className="shell py-20 lg:py-28">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-muted p-10 text-center">
          <TriangleAlertIcon className="mx-auto size-8 text-brand-blue" />
          <h1 className="display mt-5 text-3xl">Status is not loading.</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We could not reach our status provider just now. That does not mean anything
            is wrong with the network — check the status page directly, or call support.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" render={<a href={STATUS_PAGE_URL} />}>
              Open status.wiretaptelecom.com
            </Button>
            <Button size="lg" variant="outline" render={<a href="tel:+18774713603" />}>
              (877) 471-3603
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { page, status, components, incidents, scheduled_maintenances } = summary;
  const timeZone = page.time_zone || "America/New_York";
  const tone = indicatorTone(status.indicator);
  const rows = buildRows(components);

  return (
    <div>
      <section className="pt-6 pb-14">
        <div className="shell">
          <div className={cn("rounded-[2rem] p-8 ring-1 sm:p-12", tone.panel)}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="eyebrow text-muted-foreground">Network status</p>
              <a
                href={`${STATUS_PAGE_URL}/?subscribe=email`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
              >
                <BellIcon className="size-4" />
                Subscribe to updates
              </a>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="relative flex size-4 shrink-0">
                {status.indicator === "none" && (
                  <span
                    className={cn(
                      "absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:hidden",
                      tone.dot
                    )}
                    aria-hidden
                  />
                )}
                <span
                  className={cn("relative inline-flex size-4 rounded-full", tone.dot)}
                  aria-hidden
                />
              </span>
              <h1 className="display text-3xl sm:text-4xl lg:text-5xl">
                {status.description}
              </h1>
            </div>
            <p className="mt-5 text-muted-foreground">
              Last updated {formatMoment(page.updated_at, timeZone)}. This page reads
              directly from our NOC status page and refreshes every minute.
            </p>
          </div>
        </div>
      </section>

      {incidents.length > 0 && (
        <section className="pb-14" aria-labelledby="incidents-title">
          <div className="shell">
            <h2 id="incidents-title" className="text-xl font-semibold">
              Active {incidents.length === 1 ? "incident" : "incidents"}
            </h2>
            <div className="mt-5 grid gap-4">
              {incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} timeZone={timeZone} />
              ))}
            </div>
          </div>
        </section>
      )}

      {scheduled_maintenances.length > 0 && (
        <section className="pb-14" aria-labelledby="maintenance-title">
          <div className="shell">
            <h2 id="maintenance-title" className="text-xl font-semibold">
              Scheduled maintenance
            </h2>
            <div className="mt-5 grid gap-4">
              {scheduled_maintenances.map((window) => (
                <IncidentCard
                  key={window.id}
                  incident={window}
                  timeZone={timeZone}
                  scheduled
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-20 lg:pb-24" aria-labelledby="components-title">
        <div className="shell">
          <h2 id="components-title" className="text-xl font-semibold">
            Services
          </h2>

          <div className="mt-5 rounded-[1.75rem] bg-card px-6 ring-1 ring-navy/8 sm:px-8">
            {rows.map((row, index) =>
              row.kind === "single" ? (
                <div
                  key={row.component.id}
                  className={index > 0 ? "border-t border-border" : undefined}
                >
                  <ComponentRow component={row.component} />
                </div>
              ) : (
                <div
                  key={row.component.id}
                  className={index > 0 ? "border-t border-border" : undefined}
                >
                  <ComponentRow component={row.component} />
                  <div className="border-t border-border/60">
                    {row.children.map((child, childIndex) => (
                      <div
                        key={child.id}
                        className={
                          childIndex > 0 ? "border-t border-border/60" : undefined
                        }
                      >
                        <ComponentRow component={child} nested />
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="shell">
          <div className="grid gap-8 rounded-[2rem] bg-muted p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div>
              <h2 className="display text-2xl sm:text-3xl">
                Hear about it before your phones do.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                Subscribe and our NOC emails or texts you the moment an incident opens,
                updates, or resolves. You can also follow a specific service, or wire
                updates into Slack or a webhook. Past incidents and postmortems live on
                the same page.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Prefer a feed?{" "}
                <a
                  href={`${STATUS_PAGE_URL}/history.rss`}
                  className="font-semibold text-brand-blue underline-offset-4 hover:underline"
                >
                  RSS
                </a>{" "}
                or{" "}
                <a
                  href={`${STATUS_PAGE_URL}/history.atom`}
                  className="font-semibold text-brand-blue underline-offset-4 hover:underline"
                >
                  Atom
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" render={<a href={`${STATUS_PAGE_URL}/?subscribe=email`} />}>
                <BellIcon className="size-4" />
                Subscribe to updates
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/support" />}>
                Contact support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
