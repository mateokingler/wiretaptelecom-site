/**
 * Canonical origin, with no trailing slash. Staging builds can point metadata
 * and the sitemap somewhere else by setting NEXT_PUBLIC_SITE_URL.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wiretaptelecom.com"
).replace(/\/$/, "");
