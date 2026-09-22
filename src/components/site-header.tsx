"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  Building2Icon,
  HashIcon,
  MenuIcon,
  MessageSquareIcon,
  NetworkIcon,
  PhoneCallIcon,
  PrinterIcon,
  UsersIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const products: NavLink[] = [
  {
    href: "/sip-trunking",
    title: "SIP trunking",
    description: "IP or registration auth, failover, PBX templates.",
    icon: PhoneCallIcon,
  },
  {
    href: "/phone-numbers",
    title: "Phone numbers",
    description: "Local, toll-free, porting, and bulk ordering.",
    icon: HashIcon,
  },
  {
    href: "/sms-mms",
    title: "SMS and MMS",
    description: "Portal, Email2SMS, 10DLC, and API.",
    icon: MessageSquareIcon,
  },
  {
    href: "/fax",
    title: "Fax",
    description: "Email to fax and back, with no page fees.",
    icon: PrinterIcon,
  },
];

const solutions: NavLink[] = [
  {
    href: "/solutions/msps",
    title: "MSPs",
    description: "Hold every client account and set your own prices.",
    icon: UsersIcon,
  },
  {
    href: "/solutions/business",
    title: "Businesses",
    description: "Keep the PBX and change the carrier under it.",
    icon: Building2Icon,
  },
];

const resources = [
  { href: "/docs", title: "Docs", internal: true },
  { href: "/developers", title: "API reference", internal: true },
  { href: "/blog", title: "Blog", internal: true },
  { href: "/status", title: "Network status", internal: true },
];

function MenuPanel({ items }: { items: NavLink[] }) {
  // Two items stack in one narrower column; more than that and the panel goes wide
  // and splits into two, so the list stays close to the promo card's height.
  const wide = items.length > 2;
  return (
    <div className={cn("flex gap-2 p-3", wide ? "w-[46rem]" : "w-[34rem]")}>
      <ul className={cn("grid flex-1 gap-1", wide && "grid-cols-2")}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <NavigationMenuLink
                render={<Link href={item.href} />}
                className="group/item flex h-full items-start gap-3 rounded-xl p-3"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-tint-sky text-brand-blue">
                  <Icon className="size-4.5" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-[0.8rem] leading-snug text-muted-foreground">
                    {item.description}
                  </span>
                </span>
              </NavigationMenuLink>
            </li>
          );
        })}
      </ul>
      <div className="hidden w-60 shrink-0 flex-col justify-between rounded-2xl bg-navy p-5 text-white lg:flex">
        <div>
          <NetworkIcon className="size-5 text-primary" />
          <p className="mt-3 font-semibold leading-snug">Not sure what you need?</p>
          <p className="mt-2 text-[0.8rem] leading-snug text-white/70">
            Tell us what PBX you run and how many call paths you need. We will size it
            with you.
          </p>
        </div>
        <NavigationMenuLink
          href="/talk-to-sales"
          className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[0.8rem] font-semibold text-primary-foreground hover:bg-primary/85 focus:bg-primary/85"
        >
          Talk to sales
          <ArrowRightIcon className="size-3.5" />
        </NavigationMenuLink>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="shell flex h-18 items-center gap-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/logo.webp"
            alt="Wiretap Telecom"
            width={172}
            height={33}
            priority
            className="h-auto w-[172px]"
          />
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-0.5">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 rounded-full px-3.5 text-[0.95rem] font-medium">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuPanel items={products} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 rounded-full px-3.5 text-[0.95rem] font-medium">
                Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuPanel items={solutions} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/pricing" />}
                className="inline-flex h-10 items-center rounded-full px-3.5 text-[0.95rem] font-medium"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/support" />}
                className="inline-flex h-10 items-center rounded-full px-3.5 text-[0.95rem] font-medium"
              >
                Support
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 rounded-full px-3.5 text-[0.95rem] font-medium">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-60 gap-0.5 p-3">
                  {resources.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink
                        render={item.internal ? <Link href={item.href} /> : undefined}
                        href={item.internal ? undefined : item.href}
                        className="rounded-xl p-3 font-medium"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <PhoneLink
            icon
            className="mr-1 hidden items-center gap-1.5 whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground xl:inline-flex"
          />
          <Button variant="ghost" render={<a href="https://portal.wiretaptelecom.com" />}>
            Log in
          </Button>
          <Button render={<Link href="/talk-to-sales" />}>Talk to sales</Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="ml-auto lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,21rem)] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-2 space-y-6 px-2 pb-8">
              {[
                { label: "Products", items: products },
                { label: "Solutions", items: solutions },
              ].map((group) => (
                <div key={group.label}>
                  <p className="eyebrow mb-2 text-muted-foreground">{group.label}</p>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          className="flex items-center gap-2.5 rounded-xl px-2 py-2.5 font-medium hover:bg-muted"
                          href={item.href}
                        >
                          <item.icon className="size-4 text-brand-blue" />
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <p className="eyebrow mb-2 text-muted-foreground">Resources</p>
                <ul className="space-y-0.5">
                  {resources.map((item) =>
                    item.internal ? (
                      <li key={item.href}>
                        <Link
                          className="block rounded-xl px-2 py-2.5 font-medium hover:bg-muted"
                          href={item.href}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ) : (
                      <li key={item.href}>
                        <a
                          className="block rounded-xl px-2 py-2.5 font-medium hover:bg-muted"
                          href={item.href}
                        >
                          {item.title}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="space-y-0.5">
                <Link
                  className="block rounded-xl px-2 py-2.5 font-medium hover:bg-muted"
                  href="/pricing"
                >
                  Pricing
                </Link>
                <Link
                  className="block rounded-xl px-2 py-2.5 font-medium hover:bg-muted"
                  href="/support"
                >
                  Support
                </Link>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  size="lg"
                  variant="outline"
                  render={<a href="https://portal.wiretaptelecom.com" />}
                >
                  Log in
                </Button>
                <Button size="lg" render={<Link href="/talk-to-sales" />}>
                  Talk to sales
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
