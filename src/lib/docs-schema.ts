import {
  BookOpenIcon,
  FileTextIcon,
  HashIcon,
  LifeBuoyIcon,
  MessageSquareIcon,
  PhoneCallIcon,
  PrinterIcon,
  ServerIcon,
  ShieldCheckIcon,
  SirenIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Article bodies are structured rather than markdown so the sidebar, the
 * in-page table of contents, and prev/next links can all be derived from the
 * same source instead of drifting apart.
 *
 * Every `body` string supports three inline markers: `**bold**`, `` `code` ``,
 * and `[label](href)`. See `renderInline` in components/docs/doc-blocks.tsx.
 */
export type DocBlock =
  | { kind: "text"; body: string }
  | { kind: "heading"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "steps"; items: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "fields"; items: { term: string; description: string }[] }
  | { kind: "note"; tone?: "info" | "warning"; title?: string; body: string }
  | { kind: "table"; columns: string[]; rows: string[][] }
  | { kind: "faq"; items: { question: string; answer: string }[] };

export type DocCategoryId =
  | "start"
  | "trunking"
  | "pbx"
  | "numbers"
  | "messaging"
  | "emergency"
  | "compliance"
  | "fax"
  | "support";

export type DocArticle = {
  slug: string;
  title: string;
  summary: string;
  category: DocCategoryId;
  /** Extra search terms that do not appear in the title or summary. */
  keywords?: string[];
  /** Last-updated date on the source knowledge base article. */
  updated: string;
  blocks: DocBlock[];
};

export type DocCategory = {
  id: DocCategoryId;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Controls sidebar order, index order, and the prev/next reading sequence. */
export const docCategories: DocCategory[] = [
  {
    id: "start",
    title: "Get started",
    description: "What a carrier service does, and how to get your first trunk passing calls.",
    icon: BookOpenIcon,
  },
  {
    id: "trunking",
    title: "SIP trunking",
    description: "Create trunks, authenticate them, and move from v1 to v2 trunking.",
    icon: PhoneCallIcon,
  },
  {
    id: "pbx",
    title: "PBX setup guides",
    description: "Step-by-step trunk configuration for 3CX, FreePBX, and Yeastar.",
    icon: ServerIcon,
  },
  {
    id: "numbers",
    title: "Phone numbers",
    description: "Port numbers in, and set the account defaults that shape how they dial.",
    icon: HashIcon,
  },
  {
    id: "messaging",
    title: "Messaging and 10DLC",
    description: "Register campaigns with TCR, clear rejections, and wire SMS into your PBX.",
    icon: MessageSquareIcon,
  },
  {
    id: "emergency",
    title: "Emergency services",
    description: "Register dispatchable locations for E-911 and NG911.",
    icon: SirenIcon,
  },
  {
    id: "compliance",
    title: "Compliance",
    description: "How we sign and attest calls under STIR/SHAKEN.",
    icon: ShieldCheckIcon,
  },
  {
    id: "fax",
    title: "Fax",
    description: "Send and receive faxes from an email client.",
    icon: PrinterIcon,
  },
  {
    id: "support",
    title: "Support",
    description: "Get a useful answer from our team on the first reply.",
    icon: LifeBuoyIcon,
  },
];

export const docCategoryById = new Map(docCategories.map((c) => [c.id, c]));

export const fallbackCategoryIcon = FileTextIcon;

/** Anchor id for a heading, shared by the rendered heading and its TOC link. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** The h2 blocks in an article, in document order, for the table of contents. */
export function tableOfContents(article: DocArticle) {
  return article.blocks
    .filter((block): block is Extract<DocBlock, { kind: "heading" }> => block.kind === "heading")
    .map((block) => ({ id: headingId(block.text), text: block.text }));
}
