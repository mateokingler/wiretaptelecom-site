import Image from "next/image";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import { cn } from "@/lib/utils";

/**
 * Official vendor marks at their published aspect ratios. Heights are tuned per
 * logo so the wordmarks read at the same optical size despite differing padding.
 * Every mark here is dark enough to sit on a light surface in full color.
 */
export const compatibleSystems = [
  { name: "3CX", src: "/brand/logos/3cx.svg", width: 239, height: 95, size: "h-6" },
  { name: "FreePBX", src: "/brand/logos/freepbx.png", width: 300, height: 100, size: "h-8" },
  { name: "Yeastar", src: "/brand/logos/yeastar.svg", width: 380, height: 113, size: "h-8" },
  { name: "Asterisk", src: "/brand/logos/asterisk.png", width: 400, height: 400, size: "h-10" },
  { name: "Grandstream", src: "/brand/logos/grandstream.png", width: 300, height: 43, size: "h-6" },
];

export const logoByName = new Map(
  compatibleSystems.map((system) => [system.name, system])
);

type Logo = (typeof compatibleSystems)[number];

/**
 * These marks are declared at their intrinsic size but drawn a few dozen pixels
 * tall, so without a `sizes` hint the browser downloads the full-size file.
 * Returns the width the logo actually occupies at `heightPx`.
 */
export function logoSizes(logo: Logo, heightPx: number): string {
  return `${Math.ceil((heightPx * logo.width) / logo.height)}px`;
}

type LogoMarqueeProps = {
  /** Tailwind color for the marquee's fade edges, matching the section behind it. */
  fadeClassName?: string;
};

export function LogoMarquee({ fadeClassName }: LogoMarqueeProps) {
  return (
    <Marquee>
      <MarqueeFade side="left" className={cn("w-32", fadeClassName)} />
      <MarqueeFade side="right" className={cn("w-32", fadeClassName)} />
      <MarqueeContent speed={28}>
        {compatibleSystems.map((system) => (
          <MarqueeItem key={system.name} className="mx-10 flex h-12 items-center">
            <Image
              src={system.src}
              alt={`${system.name} logo`}
              width={system.width}
              height={system.height}
              sizes={logoSizes(system, 48)}
              unoptimized={system.src.endsWith(".svg")}
              className={cn("w-auto object-contain opacity-55 brightness-0", system.size)}
            />
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  );
}
