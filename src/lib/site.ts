/**
 * Canonical origin, with no trailing slash. Staging builds can point metadata
 * and the sitemap somewhere else by setting NEXT_PUBLIC_SITE_URL.
 */
export const productionOrigin = "https://wiretaptelecom.com";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? productionOrigin
).replace(/\/$/, "");

/**
 * Whether this build is the one the public should find in search. Staging and
 * preview deploys point NEXT_PUBLIC_SITE_URL at their own host and must stay
 * out of the index so they never compete with the real pages.
 */
export const isCanonicalSite = siteUrl === productionOrigin;
