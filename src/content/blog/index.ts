import type { BlogCategoryId, BlogPost } from "@/lib/blog-schema";
import { nonComplianceNoLongerOptionTelecom } from "./non-compliance-no-longer-option-telecom";
import { tollFreeNumbersMoreThanJustFreeCalls } from "./toll-free-numbers-more-than-just-free-calls";
import { sipTrunkingPricingGuide } from "./sip-trunking-pricing-guide";
import { choosingRightSmsToolForBusiness } from "./choosing-right-sms-tool-for-business";
import { roiOfCloudCommunication } from "./roi-of-cloud-communication";
import { p3cxSmsSetupGuide } from "./3cx-sms-setup-guide";
import { carrierServiceVsSipTrunking } from "./carrier-service-vs-sip-trunking";
import { whenToConsiderHostingYourPbx } from "./when-to-consider-hosting-your-pbx";
import { e911StrategiesForTheMsp } from "./e911-strategies-for-the-msp";
import { verifyingCallsStirShakenVerification } from "./verifying-calls-stir-shaken-verification";
import { newCallerIdChanges } from "./new-caller-id-changes";
import { leaveYourSwimLane } from "./leave-your-swim-lane";
import { whatIsSipTrunking } from "./what-is-sip-trunking";

/** Newest first, which is the order the index page and the archive use. */
export const blogPosts: BlogPost[] = [
  nonComplianceNoLongerOptionTelecom,
  tollFreeNumbersMoreThanJustFreeCalls,
  sipTrunkingPricingGuide,
  choosingRightSmsToolForBusiness,
  roiOfCloudCommunication,
  p3cxSmsSetupGuide,
  carrierServiceVsSipTrunking,
  whenToConsiderHostingYourPbx,
  e911StrategiesForTheMsp,
  verifyingCallsStirShakenVerification,
  newCallerIdChanges,
  leaveYourSwimLane,
  whatIsSipTrunking,
]
  .slice()
  .sort((a, b) => b.published.localeCompare(a.published));

const bySlug = new Map(blogPosts.map((post) => [post.slug, post]));

export function getPost(slug: string): BlogPost | undefined {
  return bySlug.get(slug);
}

export function postsInCategory(category: BlogCategoryId): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

/** The posts either side of `slug` in publication order, for the footer links. */
export function getAdjacentPosts(slug: string) {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  return {
    newer: index > 0 ? blogPosts[index - 1] : undefined,
    older: index >= 0 && index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined,
  };
}
