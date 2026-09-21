import Link from "next/link";
import Image from "next/image";
import { MailIcon, PhoneIcon } from "lucide-react";

const columns = [
  {
    title: "Products",
    links: [
      { href: "/sip-trunking", label: "SIP trunking" },
      { href: "/phone-numbers", label: "Phone numbers" },
      { href: "/sms-mms", label: "SMS and MMS" },
      { href: "/fax", label: "Fax" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions/msps", label: "MSPs" },
      { href: "/solutions/business", label: "Businesses" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/blog", label: "Blog" },
      { href: "/status", label: "Network status" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/talk-to-sales", label: "Talk to sales" },
      { href: "https://portal.wiretaptelecom.com", label: "Log in", external: true },
      { href: "/legal", label: "Legal" },
      { href: "https://wiretap-telecom.breezy.hr/", label: "Careers", external: true },
    ],
  },
];

/**
 * Lucide dropped brand marks, so these are the official glyphs from
 * Simple Icons, which publishes them in the public domain.
 */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/wiretap-telecom",
    icon: LinkedInIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/WiretapTelecom/",
    icon: FacebookIcon,
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="shell grid gap-12 py-20 lg:grid-cols-[1.2fr_3fr]">
        <div>
          <h2>
            {/* The mark is grey and blue, both muddy on navy, so knock it out to white. */}
            <Image
              src="/brand/logo.webp"
              alt="Wiretap Telecom"
              width={172}
              height={34}
              className="h-auto w-40 brightness-0 invert"
            />
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            SIP trunking, numbers, messaging, and fax for MSPs and the businesses running
            their own PBX.
          </p>
          <div className="mt-7 space-y-3 text-sm">
            <a
              className="flex items-center gap-2.5 hover:text-primary"
              href="tel:+18774718000"
            >
              <PhoneIcon className="size-4 text-primary" />
              1-877-471-8000
            </a>
            <a
              className="flex items-center gap-2.5 hover:text-primary"
              href="mailto:support@wiretaptelecom.com"
            >
              <MailIcon className="size-4 text-primary" />
              support@wiretaptelecom.com
            </a>
          </div>

          <ul className="mt-7 flex gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Wiretap Telecom on ${social.name}`}
                    className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <Icon className="size-4.5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="eyebrow text-white/50">{column.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a className="transition-colors hover:text-white" href={link.href}>
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        className="transition-colors hover:text-white"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Wiretap Telecom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
