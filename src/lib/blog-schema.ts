import type { DocBlock } from "@/lib/docs-schema";

/**
 * Posts carry the same structured bodies as the docs so both sections share one
 * renderer and one set of inline markers. See `DocBlock` in docs-schema.ts.
 */
export type BlogBlock = DocBlock;

export type BlogCategoryId = "business" | "guides" | "messaging" | "voice";

export type BlogCategory = {
  id: BlogCategoryId;
  title: string;
  description: string;
};

export const blogCategories: BlogCategory[] = [
  {
    id: "business",
    title: "Business",
    description: "The commercial side of telecom: costs, contracts, and compliance.",
  },
  {
    id: "guides",
    title: "Guides and tutorials",
    description: "Step-by-step walkthroughs for the things customers ask us to do.",
  },
  {
    id: "messaging",
    title: "Messaging",
    description: "SMS, MMS, and the registration work that sits behind them.",
  },
  {
    id: "voice",
    title: "Voice",
    description: "Calls, caller ID, emergency services, and the network underneath.",
  },
];

export const blogCategoryById = new Map(blogCategories.map((c) => [c.id, c]));

export type BlogPost = {
  slug: string;
  title: string;
  /** One-line teaser, as published on the original index page. */
  excerpt: string;
  category: BlogCategoryId;
  author: string;
  /** ISO date, used for sorting and for the dateline. */
  published: string;
  hero?: { src: string; alt: string };
  blocks: BlogBlock[];
};

const WORDS_PER_MINUTE = 225;

/** Rough reading time, counted off the body text rather than stored per post. */
export function readingMinutes(post: BlogPost): number {
  const words = post.blocks.reduce((total, block) => {
    const strings = (() => {
      switch (block.kind) {
        case "text":
          return [block.body];
        case "heading":
        case "subheading":
          return [block.text];
        case "steps":
        case "list":
          return block.items;
        case "fields":
          return block.items.flatMap((item) => [item.term, item.description]);
        case "note":
          return [block.title ?? "", block.body];
        case "table":
          return [...block.columns, ...block.rows.flat()];
        case "faq":
          return block.items.flatMap((item) => [item.question, item.answer]);
      }
    })();
    return total + strings.join(" ").split(/\s+/).filter(Boolean).length;
  }, 0);

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatPublished(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
