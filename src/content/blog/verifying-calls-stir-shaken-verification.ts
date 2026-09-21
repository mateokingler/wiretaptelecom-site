import type { BlogPost } from "@/lib/blog-schema";

export const verifyingCallsStirShakenVerification: BlogPost = {
  slug: "verifying-calls-stir-shaken-verification",
  title: "Verify Your Inbound Calls!",
  excerpt: "Spam sucks. Read this and go to war against it.",
  category: "voice",
  author: "Mateo Aguirre",
  published: "2022-11-30",
  hero: {
    src: "/blog/verifying-calls-stir-shaken-verification.png",
    alt: "A phone screen displaying a scam or fraud warning for an incoming call, with red alert icons overlayed.",
  },
  blocks: [
    {
      kind: "heading",
      text: "Verifying Calls - STIR/SHAKEN Verification",
    },
    {
      kind: "text",
      body: "As many of you know by now, STIR / SHAKEN is a framework to help manage unwanted calls. To combat unwanted calls, we must add new technologies for both inbound and outbound calls. This post will not discuss the entire STIR / SHAKEN framework, but rather, it will focus on INBOUND calling only (Verification).",
    },
    {
      kind: "text",
      body: 'For starters, STIR / SHAKEN is an acronym for "Secure Telephone Identity Revisited / Signature-based Handling of Asserted Information Using toKENS"… a mouthful!',
    },
    {
      kind: "text",
      body: "You can think of STIR / SHAKEN in a simplified way as follows:",
    },
    {
      kind: "list",
      items: [
        "Your outbound calls are SIGNED by a qualified carrier service, such as Wiretap Telecom. This is a mandate by the FCC beginning during the summer of 2021. Wiretap Telecom has complied fully with this mandate and we have been signing all outbound calls free of charge.\n\nRead our blog here to learn more about how outbound call attestation levels work.",
        "Your inbound calls are optionally (at your discretion) VERIFIED. When Wiretap Telecom verifies your calls, we verify that any signature received is valid (from the true caller). Please note that it is not an FCC mandate to verify calls. This is strictly up to the end-user.",
      ],
    },
    {
      kind: "heading",
      text: "Benefits of the Wiretap Telecom Verification Technology",
    },
    {
      kind: "text",
      body: "When our customers choose to verify calls, they benefit by taking back control of their call receiving experience. This undoubtedly increases productivity",
    },
    {
      kind: "text",
      body: "We offer three levels of verification to allow our customers the flexibility they need.",
    },
    {
      kind: "list",
      items: [
        "No Verification - This option allows the called party to continue receiving calls exactly as they have in the past. There is no call verification so poor quality (potentially SPAM) calls and quality calls are treated exactly the same by Wiretap Telecom.",
        'Verify - With this option, Wiretap Telecom will review the signed certificate that was created when the call initiated. If Wiretap Telecom deems this to be a quality call the caller-id will be prepended with following three characters:\n\n[V]\n\nFor example, if we receive a call from a caller with the caller-id of "Jane Doe" and we find the call to be from a qualified and verified source then our called party will receive the caller-id of:\n\n"[V] Jane Doe"\n\nNote that the [V] refers to "VERIFIED".\n\nLikewise, if we receive a call from a caller with the caller-id of "Jane Doe" and we find the call to be of poor quality (from an unverifiable or low quality source and/or attestation level) then the called party will receive the caller-id of:\n\n"[SPAM] Jane Doe"',
        "Verify and Block - This is the most invasive option for our customers. This option allows the called party to reject any calls marked as SPAM. We've found that many customers in various industries such as legal/Professional, Leisure, and Hospitality enjoy this feature.",
      ],
    },
    {
      kind: "heading",
      text: "Verification Conditions",
    },
    {
      kind: "text",
      body: "Wiretap Telecom uses industry-best practices and secure signing and verifying technologies to help combat SPAM. There are many conditions involved when determining the quality of a call, but at a high level, the following conditions apply.",
    },
    {
      kind: "list",
      items: [
        "Verified with a low attestation level: [SPAM]",
        "Verified with a high attestation level: [V]",
        "Not verifiable, no STIR / SHAKEN certificate found: [SPAM]",
      ],
    },
    {
      kind: "heading",
      text: "Getting Your Zen Back",
    },
    {
      kind: "text",
      body: "Enjoying Wiretap Telecom Verification technology is super easy. Simply flip a switch and sit back and enjoy managing and blocking unwanted SPAM calls!",
    },
    {
      kind: "text",
      body: "For our customers, using this feature is simple. Simply sign into the Wiretap Telecom portal. Once signed on, from the main dashboard, navigate to Manage Numbers --> Numbers. From there you can edit/mass edit your telephone numbers. You can control your Verification options for each individual number (individually or en masse).",
    },
    {
      kind: "text",
      body: "If you're an existing customer, or wish to become a customer, and you wish to learn more, please contact us to learn how.",
    },
  ],
};
