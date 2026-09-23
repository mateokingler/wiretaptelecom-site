import type { MetadataRoute } from "next";
import { isCanonicalSite, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isCanonicalSite) {
    // Crawling stays open deliberately. Staging carries a `noindex` from the
    // root layout, and a crawler has to be allowed to fetch the page before it
    // can read that. Blocking here instead would leave these URLs eligible for
    // index-without-crawl if anything ever links to them.
    return { rules: { userAgent: "*", allow: "/" } };
  }

  return {
    // /api is the try-it proxy and the lead alert relay: no content to index.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
