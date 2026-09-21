import type { NextConfig } from "next";

/**
 * Files under /public are served with `max-age=0`, so brand marks and blog art
 * are re-fetched on every visit. Their names are stable rather than hashed, so
 * they get a day of freshness and a week of stale-while-revalidate instead of
 * the immutable treatment the hashed build output gets.
 */
const publicAssetCache = {
  key: "Cache-Control",
  value: "public, max-age=86400, stale-while-revalidate=604800",
};

const nextConfig: NextConfig = {
  headers() {
    return Promise.resolve([
      { source: "/brand/:path*", headers: [publicAssetCache] },
      {
        source: "/blog/:image(.*\\.(?:png|jpe?g|webp|avif|svg))",
        headers: [publicAssetCache],
      },
    ]);
  },
};

export default nextConfig;
