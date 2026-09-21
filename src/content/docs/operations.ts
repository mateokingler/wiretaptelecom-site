import type { DocArticle } from "@/lib/docs-schema";

export const emergencyArticles: DocArticle[] = [
  {
    slug: "e911-user-guide",
    title: "E-911 user guide",
    summary:
      "Register dispatchable locations, assign numbers to them, and understand what an unassigned number means.",
    category: "emergency",
    keywords: ["e911", "911", "location", "primary location", "dispatch", "933", "unassigned"],
    updated: "2025-04-02",
    blocks: [
      {
        kind: "text",
        body: "A VoIP number is not tied to a physical address the way a landline is, so emergency responders cannot infer where a caller is. Enhanced 911 closes that gap by having you register and maintain the location yourself.",
      },
      { kind: "heading", text: "Assignment types" },
      {
        kind: "fields",
        items: [
          {
            term: "Location Linked",
            description:
              "For accounts with more than one location. You need a location defined that is not the primary one; assigning a number to it creates a location-linked assignment.",
          },
          {
            term: "Primary Location",
            description:
              "The first number you associate with your primary location becomes the primary location phone number. Only one number per account carries this designation.",
          },
          {
            term: "Primary Location Symbolic",
            description:
              "A symbolic assignment. Where a primary location exists, any number not directly assigned elsewhere defaults to it. Review your numbers to confirm that default is actually right for each one.",
          },
          {
            term: "UNASSIGNED",
            description:
              "The number has no E-911 route at all. Only possible when no primary location is set.",
          },
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "Unassigned numbers have no 911 route",
        body: "No notification is sent to first responders if an end user dials 911 from an UNASSIGNED number.",
      },
      { kind: "heading", text: "Create a location" },
      {
        kind: "steps",
        items: [
          "In the [Wiretap Portal](https://portal.wiretaptelecom.com/), go to **Emergency Services → Manage E-911**.",
          "Select **Locations**.",
          "Click the blue plus sign to add a location.",
          "Fill in the required information and select **Save**. You can assign one phone number here; more come next.",
        ],
      },
      {
        kind: "note",
        title: "Primary location",
        body: "Tick **Primary Location** if unassigned numbers should default here. The first number you associate with it becomes the primary location phone number.",
      },
      { kind: "heading", text: "Assign numbers to a location" },
      {
        kind: "steps",
        items: [
          "Go to **Manage E-911 → Numbers** to see every number on the account with its E-911 assignment.",
          "Select a number and assign it to the location you created.",
          "Click **Save**.",
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "A primary location does not excuse you from assigning the rest",
        body: "Because unassigned numbers silently default to the primary location, a number at a satellite site will route responders to the wrong address unless you assign it explicitly.",
      },
      { kind: "heading", text: "Questions" },
      {
        kind: "faq",
        items: [
          {
            question: "How can I test E-911 for a number?",
            answer:
              "Dial 933. On a trunk, make sure your caller ID is passing the number you want to test. On a hosted account, make sure the extension is mapped to the right number — see the caller ID section of the portal for mapping extensions to numbers.",
          },
          {
            question: "I changed a location. When does it take effect?",
            answer:
              "Almost immediately. But it is your responsibility to test 911 service regularly, and note that while a location is updating, E-911 is disabled for that number and any numbers affected by it if it is a primary location number.",
          },
          {
            question: "My E-911 does not seem to work, or I have questions.",
            answer:
              "Correctly configured E-911 is critical and we treat it that way. Send any questions to the help desk — see [submitting support tickets](/docs/submitting-support-tickets).",
          },
        ],
      },
    ],
  },
  {
    slug: "ng911",
    title: "NG911 and the ERS recovery fee",
    summary:
      "What Next Generation 911 changes, and what the Emergency Routing Service line on your invoice pays for.",
    category: "emergency",
    keywords: ["ng911", "ers", "recovery fee", "invoice", "taxes", "fcc"],
    updated: "2025-04-17",
    blocks: [
      { kind: "heading", text: "What NG911 is" },
      {
        kind: "text",
        body: "Next Generation 911 is a nationwide programme to move the 911 system onto IP-based infrastructure. Beyond voice calls, it allows text messages, images, video, and other data to reach 911 centres, which gives emergency services more to work with.",
      },
      {
        kind: "fields",
        items: [
          {
            term: "Interoperability",
            description:
              "Seamless communication between emergency response agencies across jurisdictions.",
          },
          { term: "Security", description: "Protects the integrity of emergency communications." },
          {
            term: "Standardisation",
            description: "Commonly accepted standards for consistent, reliable communication.",
          },
          {
            term: "Enhanced data handling",
            description:
              "Emergency communication centres can receive, process, and analyse all types of 911 request, and fold in additional useful information.",
          },
          {
            term: "Information sharing",
            description:
              "Request-related information can be shared between centres and response providers.",
          },
        ],
      },
      {
        kind: "text",
        body: "The FCC has mandated the transition, requiring service providers to implement these capabilities.",
      },
      { kind: "heading", text: "What the ERS recovery fee pays for" },
      {
        kind: "text",
        body: "The Emergency Routing Service recovery fee in the **Taxes** section of your invoice covers part of the cost of moving to and maintaining NG911. Specifically, it goes toward upgrading infrastructure for IP-based emergency communications, routing calls accurately using real-time location data, and keeping the emergency network interoperable and resilient.",
      },
      {
        kind: "text",
        body: "More detail is available from [911.gov](https://www.911.gov/issues/ng911/) and the [FCC](https://www.fcc.gov/policy-and-licensing-division/911-services/NG911).",
      },
    ],
  },
];

export const complianceArticles: DocArticle[] = [
  {
    slug: "stir-shaken-policies",
    title: "STIR/SHAKEN compliance and attestation",
    summary:
      "How we assign attestation levels, and the four paths a reseller or MSP can take to keep calls trusted.",
    category: "compliance",
    keywords: [
      "stir",
      "shaken",
      "attestation",
      "robocall",
      "rmd",
      "kyc",
      "reseller",
      "spam",
      "level a",
    ],
    updated: "2026-01-26",
    blocks: [
      {
        kind: "text",
        body: "Wiretap Telecom is a registered carrier in the Robocall Mitigation Database under RMD0001594. STIR/SHAKEN is the set of standards that authenticates caller ID and cuts down fraudulent robocalls, and our signing behaviour under it directly affects whether your calls get answered.",
      },
      { kind: "heading", text: "What attestation means" },
      {
        kind: "text",
        body: "An attestation is a digital signature from the service provider verifying the legitimacy of the calling party. There are three levels, and they function as a trust score for the carrier on the receiving end.",
      },
      {
        kind: "fields",
        items: [
          {
            term: "Level A — full",
            description:
              "The highest level of trust. We sign at Level A when we know the customer making the call **and** can verify they have the legal right to use the caller ID being displayed.",
          },
          {
            term: "Level B — partial",
            description:
              "We know the customer making the call, but cannot verify their right to that specific caller ID — for example the number is not hosted on our network.",
          },
          {
            term: "Level C — gateway",
            description:
              "The lowest level. We are merely the entry point for the call onto the IP network and have no insight into the original caller or their right to the caller ID.",
          },
        ],
      },
      { kind: "heading", text: "How we sign for direct customers" },
      {
        kind: "text",
        body: "For direct customers the policy is automated, based on number ownership. If the outbound caller ID matches a number currently active in your Wiretap account, the call is signed **Level A**. If it does not match, the call is signed **Level B** — lower quality, but still identifying you as a known customer.",
      },
      { kind: "heading", text: "Four options for resellers and MSPs" },
      {
        kind: "text",
        body: "If you invoice your own end users, you have four distinct paths.",
      },
      { kind: "subheading", text: "Independent signing" },
      {
        kind: "text",
        body: "Obtain your own STIR/SHAKEN certificate from the Policy Administrator and sign calls on your own infrastructure before handing them to us.",
      },
      { kind: "subheading", text: "Managed signing with a remote certificate" },
      {
        kind: "text",
        body: "Obtain your own certificate, then provide us the credentials. We use your certificate to sign calls on your behalf during processing.",
      },
      { kind: "subheading", text: "Shared customer relationship through KYC" },
      {
        kind: "text",
        body: "Provide your end-user information to us and we run a Know Your Customer assessment to establish a direct relationship. The result is a mutually shared customer, which lets us apply Level A or B based on that end user's specific number ownership, exactly as we do for direct customers.",
      },
      { kind: "subheading", text: "Anonymous resale" },
      {
        kind: "text",
        body: "Carry on reselling without a certificate and without disclosing end-user information for KYC.",
      },
      {
        kind: "note",
        tone: "warning",
        title: "Anonymous resale means Level C on everything",
        body: "With no visibility into the end user, every call is signed Level C, and Level C calls are significantly more likely to be flagged as spam or blocked by terminating carriers. There is no upside to this option.",
      },
      { kind: "heading", text: "Where to aim" },
      {
        kind: "text",
        body: "STIR/SHAKEN is not optional any more; it determines whether your calls actually arrive. Whether you manage your own certificates or partner with us through the KYC shared-customer programme, moving toward Level A and B attestation is the most effective way to protect your reputation and improve call completion.",
      },
    ],
  },
];

export const supportArticles: DocArticle[] = [
  {
    slug: "submitting-support-tickets",
    title: "Submitting support tickets",
    summary:
      "Exactly what to include for call, fax, and SMS issues so the first reply is an answer rather than a question.",
    category: "support",
    keywords: ["support", "ticket", "help desk", "call failure", "troubleshooting", "account number"],
    updated: "2026-09-15",
    blocks: [
      {
        kind: "text",
        body: "Our help desk is staffed by people who are good at deciphering vague descriptions, but every missing detail costs a round trip. Here is what to include so we can start troubleshooting instead of guessing.",
      },
      { kind: "heading", text: "How to reach us" },
      {
        kind: "fields",
        items: [
          {
            term: "Ticket",
            description:
              "On the [Wiretap homepage](https://wiretaptelecom.com), click **Support → Submit A Ticket**.",
          },
          { term: "Phone", description: "816 WIRETAP (816-947-3827)" },
        ],
      },
      {
        kind: "note",
        title: "Include your account number if you email",
        body: "Email has no account number field, so if you do not tell us, we do not know. Dropping it in saves a round trip.",
      },
      { kind: "heading", text: "Call failures" },
      {
        kind: "text",
        body: "For inbound or outbound call failures we need at least one concrete call example.",
      },
      {
        kind: "fields",
        items: [
          { term: "Caller's number", description: "The number that placed the call." },
          { term: "Called number", description: "The number that was dialled." },
          { term: "Date and time", description: "When the call was attempted." },
          {
            term: "Call treatment",
            description: "What actually happened — busy, dead air, could not be completed as dialled.",
          },
        ],
      },
      { kind: "heading", text: "Core-Fax issues" },
      {
        kind: "fields",
        items: [
          { term: "Email address", description: "The address that sent or should have received the fax." },
          { term: "Destination number", description: "Where the fax was going." },
          { term: "Date and time", description: "When it was sent." },
        ],
      },
      { kind: "heading", text: "SMS issues" },
      {
        kind: "fields",
        items: [
          { term: "Sender's number", description: "The number that sent the message." },
          { term: "Sent number", description: "The destination number." },
          { term: "Date and time", description: "When it was sent." },
          {
            term: "TCR form on file",
            description:
              "Yes or no. See [10DLC registration and TCR](/docs/10dlc-registration-and-tcr) if you are not sure.",
          },
        ],
      },
      { kind: "heading", text: "General tips" },
      {
        kind: "list",
        items: [
          "**Be specific.** “It's broken” does not give us much to work with.",
          "**Provide examples.** If the issue is intermittent, send several with timestamps.",
          "**Attach logs.** Logs or screenshots when in doubt — we are fluent in error codes.",
          "**Stay available.** We may come back for more information, so keep an eye on your email.",
        ],
      },
    ],
  },
];
