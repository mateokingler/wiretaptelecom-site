import { docCategories } from "@/lib/docs-schema";
import type { DocArticle, DocCategoryId } from "@/lib/docs-schema";
import { faxArticles } from "./fax";
import { gettingStartedArticles } from "./getting-started";
import { messagingArticles } from "./messaging";
import { numberArticles } from "./numbers";
import {
  complianceArticles,
  emergencyArticles,
  supportArticles,
} from "./operations";
import { pbxArticles } from "./pbx";
import { trunkingArticles } from "./trunking";

const collected = [
  ...gettingStartedArticles,
  ...trunkingArticles,
  ...pbxArticles,
  ...numberArticles,
  ...messagingArticles,
  ...emergencyArticles,
  ...complianceArticles,
  ...faxArticles,
  ...supportArticles,
];

/**
 * Sorted by category so the sidebar, the index page, and the prev/next links
 * all walk the docs in the same order.
 */
export const docArticles: DocArticle[] = docCategories.flatMap((category) =>
  collected.filter((article) => article.category === category.id)
);

const bySlug = new Map(docArticles.map((article) => [article.slug, article]));

export function getArticle(slug: string): DocArticle | undefined {
  return bySlug.get(slug);
}

export function articlesInCategory(category: DocCategoryId): DocArticle[] {
  return docArticles.filter((article) => article.category === category);
}

/** The articles either side of `slug` in reading order, for the footer links. */
export function getAdjacent(slug: string) {
  const index = docArticles.findIndex((article) => article.slug === slug);
  return {
    previous: index > 0 ? docArticles[index - 1] : undefined,
    next: index >= 0 && index < docArticles.length - 1 ? docArticles[index + 1] : undefined,
  };
}
