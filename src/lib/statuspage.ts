/**
 * Thin client for the Atlassian Statuspage v2 API behind
 * status.wiretaptelecom.com. `summary.json` carries the rollup, every
 * component, open incidents, and scheduled maintenance in one request, so the
 * page only ever makes that call.
 */

export const STATUS_PAGE_URL = "https://status.wiretaptelecom.com";

export type ComponentStatus =
  | "operational"
  | "degraded_performance"
  | "partial_outage"
  | "major_outage"
  | "under_maintenance";

export type Indicator = "none" | "minor" | "major" | "critical" | "maintenance";

export type Impact = "none" | "minor" | "major" | "critical";

export type StatusComponent = {
  id: string;
  name: string;
  description: string | null;
  status: ComponentStatus;
  position: number;
  /** True for a container row; its children are listed in `components`. */
  group: boolean;
  group_id: string | null;
  components?: string[];
  only_show_if_degraded: boolean;
  updated_at: string;
};

export type IncidentUpdate = {
  id: string;
  body: string;
  status: string;
  display_at: string;
};

export type Incident = {
  id: string;
  name: string;
  status: string;
  impact: Impact;
  shortlink: string;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  /** Present on scheduled maintenance only. */
  scheduled_for?: string;
  scheduled_until?: string;
  incident_updates: IncidentUpdate[];
};

export type StatusSummary = {
  page: {
    id: string;
    name: string;
    url: string;
    time_zone: string;
    updated_at: string;
  };
  components: StatusComponent[];
  incidents: Incident[];
  scheduled_maintenances: Incident[];
  status: { indicator: Indicator; description: string };
};

export async function getStatusSummary(): Promise<StatusSummary | null> {
  try {
    const response = await fetch(`${STATUS_PAGE_URL}/api/v2/summary.json`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    return (await response.json()) as StatusSummary;
  } catch {
    // A status page that 500s when the status provider is unreachable is worse
    // than one that says so, so failures fall through to a fallback panel.
    return null;
  }
}

export type StatusRow =
  | { kind: "group"; component: StatusComponent; children: StatusComponent[] }
  | { kind: "single"; component: StatusComponent };

/**
 * Statuspage returns a flat array where groups and standalone components share
 * one top-level `position` sequence, and children carry their own positions
 * scoped to the parent. This rebuilds that shape into ordered rows.
 */
export function buildRows(components: StatusComponent[]): StatusRow[] {
  const visible = components.filter(
    (component) => !(component.only_show_if_degraded && component.status === "operational")
  );
  const byId = new Map(visible.map((component) => [component.id, component]));
  const byPosition = (a: StatusComponent, b: StatusComponent) => a.position - b.position;

  return visible
    .filter((component) => component.group_id === null)
    .sort(byPosition)
    .map((component) =>
      component.group
        ? {
            kind: "group" as const,
            component,
            children: (component.components ?? [])
              .map((id) => byId.get(id))
              .filter((child): child is StatusComponent => Boolean(child))
              .sort(byPosition),
          }
        : { kind: "single" as const, component }
    );
}

type Tone = { label: string; dot: string; text: string; panel: string };

const FALLBACK_TONE: Tone = {
  label: "Unknown",
  dot: "bg-slate-400",
  text: "text-slate-700",
  panel: "bg-slate-50 ring-slate-200",
};

const COMPONENT_TONES: Record<ComponentStatus, Tone> = {
  operational: {
    label: "Operational",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    panel: "bg-emerald-50 ring-emerald-200",
  },
  degraded_performance: {
    label: "Degraded performance",
    dot: "bg-amber-500",
    text: "text-amber-700",
    panel: "bg-amber-50 ring-amber-200",
  },
  partial_outage: {
    label: "Partial outage",
    dot: "bg-orange-500",
    text: "text-orange-700",
    panel: "bg-orange-50 ring-orange-200",
  },
  major_outage: {
    label: "Major outage",
    dot: "bg-red-500",
    text: "text-red-700",
    panel: "bg-red-50 ring-red-200",
  },
  under_maintenance: {
    label: "Under maintenance",
    dot: "bg-sky-500",
    text: "text-sky-700",
    panel: "bg-sky-50 ring-sky-200",
  },
};

const INDICATOR_TONES: Record<Indicator, Tone> = {
  none: COMPONENT_TONES.operational,
  minor: COMPONENT_TONES.degraded_performance,
  major: COMPONENT_TONES.partial_outage,
  critical: COMPONENT_TONES.major_outage,
  maintenance: COMPONENT_TONES.under_maintenance,
};

// Statuspage can add states we have not seen, so unknown values degrade to a
// neutral tone instead of rendering undefined class names.
export const componentTone = (status: ComponentStatus): Tone =>
  COMPONENT_TONES[status] ?? FALLBACK_TONE;

export const indicatorTone = (indicator: Indicator): Tone =>
  INDICATOR_TONES[indicator] ?? FALLBACK_TONE;

/** Title-cases the raw API enums, e.g. "in_progress" -> "In progress". */
export function humanise(value: string): string {
  const spaced = value.replace(/_/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function formatMoment(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone,
  }).format(new Date(iso));
}

/** Window for a scheduled maintenance, collapsing same-day ranges. */
export function formatWindow(
  from: string,
  until: string,
  timeZone: string
): string {
  const start = new Date(from);
  const end = new Date(until);
  const sameDay =
    new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeZone }).format(start) ===
    new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeZone }).format(end);

  const endFormat = new Intl.DateTimeFormat("en-US", {
    ...(sameDay ? {} : { month: "short", day: "numeric" }),
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone,
  });

  return `${formatMoment(from, timeZone).replace(/\s[A-Z]{2,5}$/, "")} – ${endFormat.format(end)}`;
}
