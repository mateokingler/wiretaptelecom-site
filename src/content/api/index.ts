import { MessageSquareIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ApiSpec, Operation } from "@/lib/openapi";
import { spec as messagingSms } from "./messaging-sms.generated";

/**
 * One entry per API we publish. The `id` is the first URL segment under
 * /developers and the key the try-it proxy checks, so it is part of the public
 * contract once shipped. Adding an API means dropping a YAML in public/api,
 * running `npm run generate:api`, and adding a row here.
 */
export type ApiService = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Knowledge base articles covering the same ground without the API. */
  guides: { href: string; title: string }[];
  spec: ApiSpec;
};

export const apiServices: ApiService[] = [
  {
    id: "messaging",
    title: "Messaging",
    description: "Send SMS and MMS, and receive replies on a webhook.",
    icon: MessageSquareIcon,
    guides: [
      { href: "/docs/10dlc-registration-and-tcr", title: "10DLC registration and TCR" },
      { href: "/docs/3cx-sms-setup-guide", title: "Set up SMS on 3CX" },
      { href: "/docs/yeastar-sms-setup-guide", title: "Set up SMS on Yeastar" },
    ],
    spec: messagingSms,
  },
];

export function getService(id: string): ApiService | undefined {
  return apiServices.find((service) => service.id === id);
}

/** Both the paths and the webhooks of a service, in sidebar order. */
export function serviceOperations(service: ApiService): Operation[] {
  return [...service.spec.operations, ...service.spec.webhooks];
}

export function getOperation(serviceId: string, slug: string) {
  const service = getService(serviceId);
  if (!service) return undefined;

  const operation = serviceOperations(service).find((item) => item.slug === slug);
  return operation ? { service, operation } : undefined;
}

/** Every operation across every service, for static params and the sitemap. */
export function allOperations() {
  return apiServices.flatMap((service) =>
    serviceOperations(service).map((operation) => ({ service, operation }))
  );
}

export function operationHref(serviceId: string, slug: string): string {
  return `/developers/${serviceId}/${slug}`;
}

/**
 * The sidebar runs on the client, where the Lucide icons on a service cannot
 * follow, so the nav gets its own plain shape. Webhooks are split into their
 * own group: they arrive at your server rather than leaving it, and mixing
 * the two directions in one list reads as if you could call them.
 */
export type ApiNavSection = {
  id: string;
  title: string;
  items: { href: string; title: string; method: string }[];
};

export function apiNavSections(): ApiNavSection[] {
  return apiServices.flatMap((service) => {
    const toItems = (operations: typeof service.spec.operations) =>
      operations.map((operation) => ({
        href: operationHref(service.id, operation.slug),
        title: operation.summary,
        method: operation.method.toUpperCase(),
      }));

    const sections: ApiNavSection[] = [
      { id: service.id, title: service.title, items: toItems(service.spec.operations) },
    ];

    if (service.spec.webhooks.length > 0) {
      sections.push({
        id: `${service.id}-webhooks`,
        title: `${service.title} webhooks`,
        items: toItems(service.spec.webhooks),
      });
    }

    return sections;
  });
}
