import type { DocArticle } from "@/lib/docs-schema";

export const gettingStartedArticles: DocArticle[] = [
  {
    slug: "creating-a-sip-trunk",
    title: "Create a SIP trunk",
    summary:
      "Provision a trunk in the portal, choose IP or registration authentication, and point your DIDs at it.",
    category: "start",
    keywords: ["trunk", "provision", "did", "whitelist", "pbx template", "port 5060"],
    updated: "2025-03-27",
    blocks: [
      {
        kind: "text",
        body: "Wiretap SIP trunking carries inbound and outbound voice for the PBX you already run. This guide takes you from an empty account to a provisioned trunk with numbers pointed at it.",
      },
      { kind: "heading", text: "Sign in to the portal" },
      {
        kind: "text",
        body: "Go to the [Wiretap Portal](https://portal.wiretaptelecom.com/) and sign in with your account credentials. If you land on the multi-account dashboard, pick the account you want to work in first.",
      },
      { kind: "heading", text: "Create the trunk" },
      {
        kind: "steps",
        items: [
          "Navigate to **Trunking → Manage Trunks → Trunks**.",
          "Click the blue plus sign to add a new trunk.",
          "Fill in the trunk details described below, then press **Save**.",
        ],
      },
      {
        kind: "fields",
        items: [
          { term: "Trunk name", description: "A short name for the trunk." },
          {
            term: "Description",
            description: "Free text for your own reference. Useful once you run more than a few trunks.",
          },
          {
            term: "Authentication",
            description:
              "Choose **IP authentication** or **Registration**. Neither is better; pick whichever your PBX prefers.",
          },
          {
            term: "Port",
            description: "Choose a default port. The accepted range is `5060` to `5080`.",
          },
        ],
      },
      {
        kind: "note",
        title: "Registration credentials",
        body: "If you chose registration, click **Generate** to create the password. That User ID and password are what you enter in your PBX to register the trunk.",
      },
      {
        kind: "text",
        body: "The trunk attempts to auto-provision within about 60 seconds. Once it does, our routing systems bind to it immediately.",
      },
      { kind: "heading", text: "Assign numbers to the trunk" },
      {
        kind: "steps",
        items: [
          "Go to **Account Manage → Manage Numbers → Numbers**.",
          "Select the DIDs you want to route to the trunk you just created.",
          "Set **Route To: SIP Trunk**.",
          "In the drop-down that appears, choose the trunk.",
        ],
      },
      { kind: "heading", text: "Whitelist our IPs and grab a PBX template" },
      {
        kind: "text",
        body: "Open **Whitelist Management** to see the IP addresses for our v2.2 trunking endpoints, and allow them through your firewall. The same section publishes our SRV records for redundancy.",
      },
      {
        kind: "text",
        body: "**PBX Templates** has quick-start templates for FreePBX and 3CX. If you run one of those, start there rather than building a generic trunk by hand — see the [PBX setup guides](/docs/configuring-your-trunk-with-3cx-v20).",
      },
      { kind: "heading", text: "Questions" },
      {
        kind: "faq",
        items: [
          {
            question: "Do I need a user ID and password on the remote end of the trunk?",
            answer:
              "No. We authenticate on IP address or by registration, so you choose the type of connection.",
          },
          {
            question: "Can I blend caller ID name between the trunk and specific numbers?",
            answer:
              "Yes. If you set a default caller ID name on the trunk, any caller ID name set on a phone number overrides it. Where a number has no override, the trunk value prevails.",
          },
          {
            question: "How do I set up a failover trunk or failover number?",
            answer:
              "We support failover trunking and routing, but only at the phone number level. Build the trunk first, then assign failover settings in Phone Number Management.",
          },
          {
            question: "When does my new trunk become active?",
            answer:
              "It attempts to auto-provision within roughly 60 seconds. Once it provisions, our routing systems bind to it immediately.",
          },
        ],
      },
    ],
  },
  {
    slug: "what-is-a-carrier-service",
    title: "What is a carrier service provider",
    summary:
      "How to tell a real CSP from a reseller, why it affects your rates, and where an MSP fits in the call path.",
    category: "start",
    keywords: ["csp", "csr", "reseller", "msp", "ilec", "clec", "ipes", "wholesale", "pstn"],
    updated: "2024-06-26",
    blocks: [
      {
        kind: "text",
        body: "This one is background rather than a how-to. If you are choosing a voice provider, or you run an MSP and are deciding who to buy from, it is worth knowing which kind of company you are actually talking to.",
      },
      { kind: "heading", text: "Ten questions that identify a real CSP" },
      {
        kind: "text",
        body: "A Carrier Service Provider operates in an exchange capacity. The line between a CSP and a reseller gets blurred constantly, so here is a concrete test. Ask your current provider whether they can answer yes to all ten of these. If they cannot, they are reselling somebody else's carrier service.",
      },
      {
        kind: "list",
        items: [
          "Contributes to the Universal Service Administrative Company",
          "Is listed in the Robocall Mitigation Database",
          "Holds one or more OCNs",
          "Is a member of NPAC",
          "Has an FCC-issued FRN",
          "Has numbering authorization from the FCC to obtain number resources",
          "Is a member of BIRRDS/LERG and NANPA",
          "Is recognized by NECA as an IPES",
          "Is a member of the Number Pooling Administration",
          "Is a facilities-based provider",
        ],
      },
      {
        kind: "text",
        body: "This is not an exhaustive list, and buying from a reseller is not automatically a bad decision. But if you are shopping for wholesale pricing and direct PSTN access, every middleman in the path adds margin. Two or more middlemen can also signal thin capital investment, which tends to show up later as poor redundancy or call quality.",
      },
      {
        kind: "text",
        body: "A true CSP concentrates on number routing, porting, pooling, and the technologies around them such as fax and SMS/MMS. It generally will not sell you PBX support, voicemail, auto-attendants, or call queues.",
      },
      { kind: "heading", text: "What a carrier service reseller is" },
      {
        kind: "text",
        body: "Almost every provider depends on other providers to route some calls; it is unusual for one carrier to originate and terminate a call entirely on its own network. That is normal and is not what makes a reseller.",
      },
      {
        kind: "text",
        body: "A Carrier Service Reseller is a company that fails the ten-point test above but still claims to route calls between a PBX and the rest of the world. A CSR cannot hold numbers in the North American Numbering Plan, so it depends entirely on other carriers, sometimes its own competitors.",
      },
      {
        kind: "list",
        items: [
          "A CSR resells both numbers and services from a CSP, because it cannot hold its own numbers.",
          "A CSR routes calls from a CSP through its own infrastructure and then to the customer.",
          "A CSP selling number access to another CSP is **not** a CSR situation. That is routine between carriers.",
        ],
      },
      { kind: "heading", text: "Where an MSP fits" },
      {
        kind: "text",
        body: "An MSP works directly with the end user, supporting their network and phone system. That takes deep knowledge of network configuration and security, PBX platforms, handsets, routers, and switches.",
      },
      {
        kind: "text",
        body: "An MSP can act as a CSR, but is rarely also a CSP — the scope of technology and regulatory work involved is enormous. Most MSPs rely on a CSP for direct access and number resources, and can work with that CSP directly.",
      },
      {
        kind: "text",
        body: "Inserting a CSR between the MSP and the CSP raises retail cost for the customer and puts the account at risk. An MSP can avoid becoming a CSR entirely by white-labelling a CSP's products instead of routing calls through its own infrastructure.",
      },
      { kind: "heading", text: "Three models of carrier" },
      {
        kind: "fields",
        items: [
          {
            term: "ILEC",
            description:
              "Incumbent Local Exchange Carrier. Existed before the Telecommunications Act of 1996 and once held regional monopolies. They carry heavy legacy infrastructure costs and generally target volume-based providers rather than end users, so buying direct is usually price-prohibitive. No new ILECs are possible.",
          },
          {
            term: "CLEC",
            description:
              "Competitive Local Exchange Carrier. Created by the 1996 Act to compete with the incumbents. CLECs build their own infrastructure but lean heavily on ILEC ingress and egress. Many launched in the early 2000s and many failed; the industry still depends on them for last-mile service in rural areas.",
          },
          {
            term: "IPES",
            description:
              "Internet Protocol Enabled Service provider. A newer FCC designation. As VoIP matured and the FCC brought interconnected VoIP under STIR/SHAKEN regulation, IPES companies gained number pooling and authorization, letting them compete directly with ILECs and CLECs.",
          },
        ],
      },
      { kind: "heading", text: "Where Wiretap sits" },
      {
        kind: "text",
        body: "Wiretap Telecom is a Carrier Service Provider and intends to keep that line clear. We work through MSP partners who provide direct support to our mutual customers, and we offer wholesale rates to MSPs alongside low retail rates to direct end users.",
      },
      {
        kind: "text",
        body: "Our Core-MSP partner program removes the need for a CSR in the call path, which cuts out redundant technology, extra call hops, and the outages that come with them. We run a minimum of quadruple redundancy plus full geographic redundancy, in data centres inside the United States. We have been operating since November 2012, are debt free, and do not enter commercial agreements with PBX manufacturers or other CSPs.",
      },
    ],
  },
  {
    slug: "p2lite-quotes",
    title: "Create a customer quote with P2Lite",
    summary:
      "Build and send a fully customised quote yourself, without waiting on a sales rep. Approval creates the account automatically.",
    category: "start",
    keywords: ["p2lite", "quote", "msp", "pricing", "floor price", "kyc", "reseller"],
    updated: "2025-06-20",
    blocks: [
      {
        kind: "text",
        body: "P2Lite is a quoting system for MSPs who want to run their own sales process. You pick the products, set the pricing, and send the quote yourself. When the customer approves it, the account is created automatically.",
      },
      { kind: "heading", text: "Open the P2Lite console" },
      {
        kind: "steps",
        items: [
          "Sign in to the [Wiretap Portal](https://portal.wiretaptelecom.com/).",
          "Select **P2Lite Quotes** from the left-hand column on the portal home page.",
          "Click **Create New Quote** in the top right corner.",
        ],
      },
      { kind: "heading", text: "Fill in the lead information" },
      {
        kind: "fields",
        items: [
          {
            term: "Company information",
            description: "The name and address of the company the quote is for.",
          },
          {
            term: "Contact information",
            description: "The name and contact details of whoever will review and approve the quote.",
          },
        ],
      },
      { kind: "heading", text: "Add products and set pricing" },
      {
        kind: "text",
        body: "Add a trunking product first, then any core and additional products. Prices default to standard rates, and you can adjust each one if the deal needs a custom rate.",
      },
      {
        kind: "note",
        tone: "warning",
        title: "The floor price stays visible",
        body: "You cannot set a price below the floor price. This applies to product pricing and to toll rates.",
      },
      {
        kind: "text",
        body: "Set your toll rates in the same way. They are adjustable, but the same floor applies.",
      },
      { kind: "heading", text: "Review, publish, and send" },
      {
        kind: "steps",
        items: [
          "Check every customer detail and price before submitting — this is what the customer will see.",
          "Add any comments or additional information.",
          "Click **Save**. The quote is now a draft.",
          "Back on the P2Lite Quotes management page, **publish** the quote. You cannot send it until it is published.",
          "Click the green envelope to email the quote to your customer for approval.",
        ],
      },
      {
        kind: "note",
        title: "What happens after approval",
        body: "Once the customer approves, the account is created automatically. After KYC verification finishes, your designated company contact gets access to the new account.",
      },
    ],
  },
];
