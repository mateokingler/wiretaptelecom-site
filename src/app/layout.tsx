import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isCanonicalSite, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // Only routes without their own title fall back to this, which in practice
    // means the 404. Next.js ignores a metadata export in not-found.tsx, so a
    // neutral default beats having that page wear the homepage's title.
    default: "Wiretap Telecom",
    template: "%s | Wiretap Telecom",
  },
  description:
    "Carrier-grade SIP trunking, phone numbers, SMS, and fax for MSPs and PBX teams. Talk to sales at Wiretap Telecom.",
  // Resolved per route against metadataBase, so every page points at itself on
  // the canonical origin. Keeps tracking query strings such as the smart-URL
  // ?service= parameter from being indexed as separate pages.
  alternates: { canonical: "./" },
  ...(isCanonicalSite ? {} : { robots: { index: false, follow: false } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Tells Next.js the page opts into smooth scrolling, so it can force an
      // instant jump on route changes and keep the animation for hash links.
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
