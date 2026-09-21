import { PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** The spelling we lead with, the digits we dial, and the href for both. */
export const phoneVanity = "816 WIRETAP";
export const phoneDigits = "816-947-3827";
export const phoneHref = "tel:+18169473827";

/**
 * Shows the vanity spelling and swaps to the digits on hover or keyboard focus.
 * Both strings share one grid cell, so the box is as wide as the longer of the
 * two and nothing reflows mid-swap. Reacts to hover on itself and on an
 * enclosing `group`, so a card or button can trigger the reveal too.
 *
 * The inactive string is `invisible` rather than merely transparent, which
 * keeps it out of text selection, hit testing, and the accessibility tree.
 */
const swap = "col-start-1 row-start-1 transition-[opacity,visibility] duration-150";

export function PhoneNumber({ className }: { className?: string }) {
  return (
    <span className={cn("group/phone grid", className)}>
      <span
        className={cn(
          swap,
          "group-hover/phone:invisible group-hover/phone:opacity-0",
          "group-hover:invisible group-hover:opacity-0",
          "group-focus-visible:invisible group-focus-visible:opacity-0"
        )}
      >
        {phoneVanity}
      </span>
      <span
        className={cn(
          swap,
          "invisible opacity-0",
          "group-hover/phone:visible group-hover/phone:opacity-100",
          "group-hover:visible group-hover:opacity-100",
          "group-focus-visible:visible group-focus-visible:opacity-100"
        )}
      >
        {phoneDigits}
      </span>
    </span>
  );
}

type PhoneLinkProps = {
  className?: string;
  /** Leading phone glyph, for the header and footer contact rows. */
  icon?: boolean;
  /** Tailwind size for that glyph, since the footer and sales card differ. */
  iconClassName?: string;
};

export function PhoneLink({ className, icon, iconClassName }: PhoneLinkProps) {
  return (
    <a href={phoneHref} className={cn("group", className)}>
      {icon && <PhoneIcon className={cn("size-4", iconClassName)} />}
      <PhoneNumber />
    </a>
  );
}
