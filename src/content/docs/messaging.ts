import type { DocArticle } from "@/lib/docs-schema";

export const messagingArticles: DocArticle[] = [
  {
    slug: "10dlc-registration-and-tcr",
    title: "10DLC registration and TCR",
    summary:
      "What 10DLC is, who The Campaign Registry and the mobile carriers are, and why unregistered traffic gets blocked.",
    category: "messaging",
    keywords: ["10dlc", "tcr", "a2p", "mno", "campaign registry", "csp", "sms", "mms"],
    updated: "2025-02-03",
    blocks: [
      { kind: "heading", text: "What 10DLC is" },
      {
        kind: "text",
        body: "10DLC — ten-digit long code — lets businesses send application-to-person SMS and MMS from ordinary ten-digit phone numbers. Traditional long codes were designed for person-to-person texting; 10DLC is built for business use and carries the carrier compliance rules that come with it.",
      },
      {
        kind: "text",
        body: "Registering is no longer optional, because carriers filter or block unregistered messages. Registered traffic gets better deliverability and higher throughput than unregistered long codes, and costs less than short codes.",
      },
      { kind: "heading", text: "Who is involved" },
      {
        kind: "fields",
        items: [
          {
            term: "Brands",
            description: "The organisation sending the messages — you, or your end customer.",
          },
          {
            term: "The Campaign Registry (TCR)",
            description:
              "The central hub for registering 10DLC campaigns in the US. It sits between businesses, messaging providers, and carriers, and its records are how carriers decide whether to allow, filter, or block your messages.",
          },
          {
            term: "Mobile Network Operators (MNOs)",
            description:
              "The cellular carriers — AT&T, Verizon, T-Mobile and others. They deliver the messages and enforce the rules. Once a campaign is registered, they assign throughput based on the campaign type and the brand's trust score.",
          },
          {
            term: "Third-party vetting partners",
            description: "Independent vetting that feeds into the trust score assigned to a brand.",
          },
        ],
      },
      { kind: "heading", text: "Do I need to register?" },
      {
        kind: "text",
        body: "If you send SMS or MMS from an application to a person, that is A2P traffic and it needs 10DLC registration. That covers marketing, customer service, notifications, and any other business texting to customers or employees from ordinary local numbers.",
      },
      {
        kind: "note",
        tone: "warning",
        title: "Unregistered traffic is blocked",
        body: "Since 1 February 2025, all unregistered SMS and MMS traffic is subject to mandatory blocking by the major carriers, including AT&T, Verizon, and T-Mobile. Unregistered messages simply will not arrive.",
      },
      { kind: "heading", text: "What happens when you submit to us" },
      {
        kind: "text",
        body: "Wiretap Telecom is a Campaign Service Provider with The Campaign Registry, so our role is to walk you through registration. You submit your brand and campaign forms to us, we submit them to TCR, and TCR approves or rejects. If something is rejected we give you the specific reasons and guidance — see [10DLC rejection reasons](/docs/10dlc-rejections).",
      },
      {
        kind: "text",
        body: "Before you fill anything in, read the [brand and campaign guide](/docs/10dlc-user-guide). Most rejections are avoidable at submission time.",
      },
    ],
  },
  {
    slug: "10dlc-user-guide",
    title: "10DLC brand and campaign guide",
    summary:
      "Field-by-field guidance for registering a brand and campaign, including the exact disclosures carriers require.",
    category: "messaging",
    keywords: [
      "10dlc",
      "brand",
      "campaign",
      "opt-in",
      "opt-out",
      "help",
      "call to action",
      "cta",
      "sample message",
      "privacy policy",
    ],
    updated: "2025-01-04",
    blocks: [
      {
        kind: "text",
        body: "Registration has two parts: the brand, which is the organisation sending messages, and the campaign, which is the specific use case. Accurate and consistent information across both is what keeps you out of the rejection queue.",
      },
      { kind: "heading", text: "Brand" },
      {
        kind: "text",
        body: "The brand is the entity responsible for sending A2P messages. Two details carry more weight than the rest.",
      },
      {
        kind: "fields",
        items: [
          {
            term: "Website",
            description:
              "The official URL for the brand. This is how your legitimacy gets verified, so it must be live, secure, and genuinely belong to the brand you are registering.",
          },
          {
            term: "Brand support email",
            description: "The domain must match your website domain.",
          },
        ],
      },
      { kind: "heading", text: "Campaign" },
      {
        kind: "text",
        body: "The campaign describes what you will actually send. If you text for marketing, register a marketing campaign; if you run two-way customer support, register customer care.",
      },
      { kind: "subheading", text: "Description" },
      {
        kind: "text",
        body: "Explain the purpose and intended use clearly. You must disclose messaging frequency, and if the campaign collects donations you must say so explicitly.",
      },
      { kind: "subheading", text: "Call-to-action and message flow" },
      {
        kind: "text",
        body: "This field explains how consumers opt in and give consent. A call-to-action is an invitation to opt in, and it has to state the programme's purpose plainly. If you support several opt-in methods, list them all. Nothing here may be deceptive, and opt-in details cannot be buried in terms and conditions.",
      },
      {
        kind: "list",
        items: [
          "Obtain consent to receive messages generally.",
          "Obtain express written consent specifically for marketing messages.",
          "Make sure consumers can revoke consent.",
        ],
      },
      {
        kind: "text",
        body: "Describe how consent is collected, and provide a script, link, or attachment of the opt-in material — a web form, physical form, verbal script, or keyword marketing material.",
      },
      {
        kind: "note",
        title: "Every opt-in method must contain all of these",
        body: "Brand name, the types of messages being sent, a message frequency disclosure, the “Message and data rates may apply” disclosure, HELP information, STOP information, a link to the privacy policy, and a link to the terms and conditions.",
      },
      { kind: "subheading", text: "Supporting uploads" },
      {
        kind: "text",
        body: "Upload anything that backs up your opt-in, call-to-action, terms, or privacy policy — for example an image of the call-to-action, or a terms document if it is not published online. Maximum 10MB per file, five files per campaign.",
      },
      { kind: "subheading", text: "Privacy policy link" },
      {
        kind: "text",
        body: "The policy must state that mobile opt-in information **will not be shared** with third parties for marketing purposes.",
      },
      { kind: "subheading", text: "Terms and conditions link" },
      {
        kind: "text",
        body: "Your terms need an SMS disclosure covering message types, frequency, message and data rate notification, a link to the privacy policy, HELP instructions, and opt-out guidance.",
      },
      { kind: "heading", text: "Required messages" },
      {
        kind: "text",
        body: "Four kinds of message text get reviewed. Each has mandatory contents, and missing one is a common rejection.",
      },
      { kind: "subheading", text: "Sample messages" },
      {
        kind: "text",
        body: "Every campaign needs at least one; some types require two. Samples must match the registered use case, and if you register multiple use cases you need a sample for each.",
      },
      {
        kind: "list",
        items: [
          "Always identify your brand in the sample.",
          "Include at least one sample carrying opt-out and HELP language.",
          "If you answered yes to embedded links, at least one sample must contain one.",
        ],
      },
      { kind: "subheading", text: "Subscriber opt-in" },
      {
        kind: "text",
        body: "Required. Must contain brand identity, message frequency disclosure, the “Message and data rates apply” disclosure, HELP information, and STOP information.",
      },
      {
        kind: "note",
        title: "Example",
        body: "Thank you for opting in to receive messages from [Company Name]. Msg frequency varies. Msg&data rates may apply. Reply HELP for help. Reply STOP to stop receiving messages from [Brand].",
      },
      { kind: "subheading", text: "Subscriber opt-out" },
      {
        kind: "text",
        body: "Required. Must contain the brand name and confirmation that the customer will receive no further messages.",
      },
      {
        kind: "note",
        title: "Example",
        body: "You have successfully opted out of messages from [Company Name]. You will receive no further messages.",
      },
      { kind: "subheading", text: "Subscriber HELP" },
      {
        kind: "text",
        body: "Required. Must contain the brand name and a phone number, email address, or website the customer can use for assistance.",
      },
      {
        kind: "note",
        title: "Example",
        body: "Thank you for contacting [Company Name]. Please call us at [phone number] or email us at [email address] for assistance. Reply STOP to opt-out.",
      },
      { kind: "heading", text: "Campaign and content attributes" },
      {
        kind: "fields",
        items: [
          {
            term: "Number pooling",
            description:
              "Select yes if the campaign will later be submitted for a number pool, meaning 49 or more numbers on the campaign.",
          },
          {
            term: "Direct lending or loan arrangement",
            description:
              "Must be yes if the brand is involved in lending, even when the campaign messaging has nothing to do with lending.",
          },
          {
            term: "Embedded link",
            description:
              "If yes, one of your sample messages must contain an embedded link.",
          },
          {
            term: "Embedded phone number",
            description:
              "If yes, one of your samples must contain an embedded phone number. Providing a contact in the HELP response does not count.",
          },
          {
            term: "Age-gated content",
            description:
              "Yes if the content covers alcohol, tobacco, gambling, adult content, or prescription drugs.",
          },
          {
            term: "Terms and conditions",
            description:
              "Must be yes, and the link must be supplied in the terms and conditions field.",
          },
        ],
      },
    ],
  },
  {
    slug: "10dlc-rejections",
    title: "10DLC rejection reasons",
    summary:
      "Every rejection reason TCR sends back, and what to change before you resubmit.",
    category: "messaging",
    keywords: ["10dlc", "rejection", "rejected", "resubmit", "tcr", "cta", "opt-in", "help", "stop"],
    updated: "2025-02-17",
    blocks: [
      {
        kind: "text",
        body: "If your campaign was rejected after review, find the reason below. Most are fixable in one pass, but a few mean the campaign will not be approved at all. For background on the process, see [10DLC registration and TCR](/docs/10dlc-registration-and-tcr).",
      },
      { kind: "heading", text: "Brand problems" },
      {
        kind: "table",
        columns: ["Rejection reason", "What to do"],
        rows: [
          [
            "Brand email inconsistent with brand details",
            "The email given at brand creation does not match the brand details elsewhere in the campaign. Recreate the brand and campaign so everything is consistent across brand, campaign, and opt-in messages.",
          ],
          [
            "Brand name inconsistent with online presence",
            "The registered brand name does not match the website you supplied. If you register “Contoso Inc”, the website must be Contoso Inc's, not some other site.",
          ],
          [
            "Submitted brand name differs from the name in sample messages",
            "The brand name in your samples must match the registered brand name exactly. Resubmit as one brand.",
          ],
          [
            "Fraudulent 10DLC brand registration",
            "The brand is associated with a business flagged for fraudulent transactions. The campaign will not be approved.",
          ],
        ],
      },
      { kind: "heading", text: "Website and online presence" },
      {
        kind: "table",
        columns: ["Rejection reason", "What to do"],
        rows: [
          [
            "Website must be valid and working",
            "Your site was unreachable. Use a valid, working, secure site. If it was down at brand creation you must create the brand again with a working site, then a new campaign.",
          ],
          [
            "Website unsecured or inaccessible",
            "Same fix, but for HTTPS. Create the brand again against a secure site, then a new campaign.",
          ],
          [
            "Brand URL blocked for phishing links",
            "The carrier could not reach your site, or flagged it as malware-propagating. Update the site, secure it with SSL, make sure a third party can reach it, and resubmit.",
          ],
          [
            "Privacy policy missing from online presence",
            "Your website has no privacy policy. Add one.",
          ],
          [
            "Privacy policy shares data",
            "Your policy says you share or sell consumer personal data to third parties and affiliates. Remove that language.",
          ],
          [
            "Website must be age-gated",
            "Your site needs to confirm visitors are over 18. Update it and resubmit.",
          ],
          [
            "Social media pages must represent the company",
            "You linked personal pages. Link business pages instead.",
          ],
        ],
      },
      { kind: "heading", text: "Campaign description" },
      {
        kind: "table",
        columns: ["Rejection reason", "What to do"],
        rows: [
          [
            "Campaign description needs more details",
            "Answer three questions explicitly: who is sending messages, who is receiving them, and what kind of messages are being sent.",
          ],
          [
            "Campaign does not match the use case",
            "The stated purpose does not line up with the selected use case. Describe what the campaign does and make sure it matches.",
          ],
          [
            "Campaign description and call-to-action inconsistent",
            "There is a mismatch between your description and your consent method — for example, saying the campaign is conversational but selecting only a website as the consent method, where verbal would fit. Align the two.",
          ],
          [
            "Direct lending inconsistent with website",
            "Your site mentions lending or loan arrangements but you did not tick the box. Tick it and resubmit.",
          ],
          [
            "Disallowed content",
            "The campaign involves prohibited SMS content and will not be approved.",
          ],
        ],
      },
      { kind: "heading", text: "Call-to-action and consent" },
      {
        kind: "table",
        columns: ["Rejection reason", "What to do"],
        rows: [
          [
            "CTA missing brand",
            "Your consent method does not name your brand. Add it.",
          ],
          [
            "CTA missing disclosures",
            "Add: “Message and Data rates apply. Messaging frequency may vary. For more information, refer to the privacy policy on our website.”",
          ],
          [
            "CTA missing HELP/STOP instructions",
            "Add: “For help, reply HELP. For stop, reply STOP.”",
          ],
          [
            "CTA or message flow needs more details",
            "Describe in detail how you gather consent — verbally, via your website, by inbound SMS, or on written forms.",
          ],
          [
            "CTA inconsistent with brand online presence",
            "Your stated consent method conflicts with your website. For example you claim written or verbal consent, but the site clearly collects consent through a web form. Make them match.",
          ],
          [
            "Include all consumer opt-in methods",
            "You are collecting opt-ins through more channels than you selected. Select them all and describe them.",
          ],
          [
            "Verbal or in-person consent needs a script",
            "Verbal consent is missing its required script. We provide the default script carriers require for verbal opt-in — use it and resubmit.",
          ],
          [
            "Webform requires phone number; missing disclaimer",
            "Your site has forms that make a phone number mandatory. Add this below the form: “By providing a telephone number and submitting the form you are consenting to be contacted by SMS text message. Message & data rates may apply. Reply STOP to opt out of further messaging.”",
          ],
        ],
      },
      { kind: "heading", text: "Message content" },
      {
        kind: "table",
        columns: ["Rejection reason", "What to do"],
        rows: [
          [
            "Sample message missing brand",
            "Add the brand to your sample messages and resubmit.",
          ],
          [
            "Sample message missing disclosures",
            "Add “Reply STOP to cancel. Reply HELP for help.” to a sample.",
          ],
          [
            "Sample message needs more detail",
            "Very short samples such as “Hi, reply stop to cancel” get rejected. Samples should convey the actual nature of your messages.",
          ],
          ["Opt-in message missing brand", "Add brand information to the opt-in message."],
          [
            "Opt-in message missing disclosures",
            "Add “Message and Data rates may apply. Message frequency may vary. Please refer to our privacy policy for more details.”",
          ],
          ["Opt-in message missing keywords", "The START keyword is missing. Add it and resubmit."],
          ["STOP message missing brand", "Add brand details to the STOP message."],
          [
            "STOP message missing keywords",
            "The STOP keyword is missing from the opt-out message section. Add it.",
          ],
          ["HELP message missing brand", "Add your brand name to the HELP message."],
          ["HELP message missing keywords", "The HELP keyword is missing. Add it back."],
          [
            "HELP message missing instructions",
            "Add: “Reply HELP to get help, reply STOP to stop.”",
          ],
          [
            "HELP message missing support contact info",
            "Add a valid email address, phone number, or website to the HELP message.",
          ],
          [
            "Opt-in, opt-out, and HELP messages missing the brand name; HELP missing support contact information",
            "A combined version of the rejections above. Add your brand name to all three outgoing message categories, and support contact details to the HELP message.",
          ],
        ],
      },
    ],
  },
  {
    slug: "3cx-sms-setup-guide",
    title: "Set up SMS on 3CX",
    summary:
      "Enable SMS on your DIDs, wire the 3CX webhook to the portal, and send from the 3CX app.",
    category: "messaging",
    keywords: ["3cx", "sms", "webhook", "api key", "auth token", "e.164", "did"],
    updated: "2025-02-03",
    blocks: [
      { kind: "heading", text: "Before you start" },
      {
        kind: "list",
        items: [
          "3CX must be on **version 18.0 Update 7 or higher**. Follow the [3CX upgrade guide](https://www.3cx.com/docs/upgrading-pbx/) if you are behind.",
          "You must be registered with TCR. Do that in the portal under **Core-SMS → TCR Form**, and read [10DLC registration and TCR](/docs/10dlc-registration-and-tcr) first.",
        ],
      },
      { kind: "heading", text: "Enable SMS on your numbers" },
      {
        kind: "text",
        body: "In the Wiretap Portal, go to **Core-SMS → Manage Numbers**, click the plus sign, select the number, and click **Enable**.",
      },
      { kind: "heading", text: "Create the trunk and move your DIDs" },
      {
        kind: "steps",
        items: [
          "Log in to the 3CX management console.",
          "Go to **SIP Trunks** and click **Import Provider**.",
          "Upload the Wiretap 3CX template and click **OK**.",
          "Open the **DIDs** tab on the new trunk, add your SMS-enabled numbers, and click **Save**.",
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "DIDs must be in E.164 format",
        body: "For example `+19542223333`. Also make sure the number is not already assigned to another trunk.",
      },
      { kind: "heading", text: "Set the DID on the user" },
      {
        kind: "steps",
        items: [
          "Go to the **Users** page and create or edit a user.",
          "Set **Direct Inbound Dialing (DID)** at the bottom of the **General** tab to the correct DID.",
          "Install the 3CX app on iOS or Android and scan the QR code with it.",
        ],
      },
      { kind: "heading", text: "Enable SMS and copy the webhook URL" },
      {
        kind: "steps",
        items: [
          "Go to **SIP Trunks** and select the trunk you created.",
          "Open the **SMS** tab and enable SMS.",
          "Copy the **Webhook URL**.",
        ],
      },
      { kind: "heading", text: "Point the number at the webhook" },
      {
        kind: "steps",
        items: [
          "In the [Wiretap Portal](https://portal.wiretaptelecom.com), go to **Core-SMS → Manage Numbers** and click the SMS-enabled DID.",
          "Enable **Receive to Webhook API** and choose **3CX Webhook** as the webhook type.",
          "Paste the webhook URI and save.",
        ],
      },
      { kind: "heading", text: "Generate an API key" },
      {
        kind: "steps",
        items: [
          "In the portal, hover your avatar in the top right, click **Company Settings**, then **API Keys**.",
          "Generate a new key or use an existing one.",
          "Copy the **Auth Token** value — not the bearer token.",
          "In the 3CX management console, open the **SMS** tab on the trunk, paste the key, and click **Save**.",
        ],
      },
      {
        kind: "text",
        body: "Open the **Chats** tab in the 3CX mobile app and start sending.",
      },
    ],
  },
  {
    slug: "yeastar-sms-setup-guide",
    title: "Set up SMS on Yeastar",
    summary:
      "Add a register trunk, configure the SMS message channel against our API, and send from Linkus.",
    category: "messaging",
    keywords: ["yeastar", "sms", "linkus", "message channel", "api key", "bearer token", "webhook"],
    updated: "2025-04-23",
    blocks: [
      { kind: "heading", text: "Before you start" },
      {
        kind: "list",
        items: [
          "You need a compatible Yeastar PBX such as the [P-Series](https://www.yeastar.com/p-series-pbx-system) on version 37.14.0.24 or later, plus access to the [Linkus UC client](https://www.yeastar.com/unified-communications/linkus-softphone/).",
          "You must be registered with TCR. Do that in the portal under **Core-SMS → TCR Form**, and read [10DLC registration and TCR](/docs/10dlc-registration-and-tcr) first.",
        ],
      },
      { kind: "heading", text: "Enable SMS on your numbers" },
      {
        kind: "text",
        body: "In the Wiretap Portal, go to **Core-SMS → Manage Numbers**, click the plus sign, select the number, and click **Enable**.",
      },
      { kind: "heading", text: "Create the trunk" },
      {
        kind: "text",
        body: "Go to **Extension and Trunk → Trunk** and select **Add**. This example uses a register trunk; the same values appear in the [Yeastar trunk guide](/docs/configuring-your-trunk-with-yeastar-p-series).",
      },
      {
        kind: "fields",
        items: [
          { term: "Name", description: "Something that identifies the trunk." },
          { term: "Trunk Status", description: "**Enabled**" },
          { term: "Select ITSP Template", description: "**General**" },
          { term: "Trunk Type", description: "**Register Trunk**" },
          { term: "Transport", description: "**DNS-NAPTR**, if using the SRV record." },
          { term: "Hostname/IP", description: "`srv.globalsbc.core-trunk.com`" },
          { term: "Port", description: "`0`" },
          { term: "Domain", description: "`srv.globalsbc.core-trunk.com`" },
          {
            term: "Username",
            description: "The **User ID** generated when you created the trunk in the portal.",
          },
          { term: "Password", description: "The password generated with the trunk." },
          { term: "Authentication Name", description: "The same **User ID**." },
        ],
      },
      {
        kind: "text",
        body: "Then open the **DIDs/DDIs** tab on the new trunk, add your SMS-enabled numbers, and click **Save**.",
      },
      { kind: "heading", text: "Generate an API key" },
      {
        kind: "text",
        body: "In the [Wiretap Portal](https://portal.wiretaptelecom.com), hover your avatar in the top right, click **Company Settings**, then **API Keys**, and generate a new key or use an existing one. You will need both the auth token and the bearer token in the next step.",
      },
      { kind: "heading", text: "Set up the message channel" },
      {
        kind: "text",
        body: "Go to **Messaging → Message Channel**, click **Add**, and select **SMS**. On the **Authentication** tab, fill in the following.",
      },
      {
        kind: "fields",
        items: [
          { term: "Name", description: "Something that identifies the channel." },
          { term: "ITSP", description: "**General**" },
          { term: "API Key", description: "The **Auth Token** from the previous step." },
          { term: "Secret", description: "The **Bearer Token** from the previous step." },
          {
            term: "API Address for Sending Messages",
            description: "`https://sms.wiretaptelecom.com/smsapis/SendSMSFromYeastar`",
          },
          {
            term: "API Address for Verifying Authentication",
            description: "`https://sms.wiretaptelecom.com/smsapis/VerifyYeastarChallenge`",
          },
        ],
      },
      { kind: "text", body: "Click **Save**." },
      { kind: "heading", text: "Point the number at the webhook" },
      {
        kind: "steps",
        items: [
          "In the portal, go to **Core-SMS → Manage Numbers** and click the SMS-enabled DID.",
          "Enable **Receive to Webhook API** and choose **Yeastar Webhook** as the webhook type.",
          "Paste the webhook URI and save.",
        ],
      },
      { kind: "heading", text: "Configure messaging settings" },
      {
        kind: "steps",
        items: [
          "Open the **Messaging Settings** tab.",
          "In the **Number** section, click **Add** to create a message routing rule.",
          "Enter the SMS-enabled number in E.164 format, for example `+15555555555`.",
          "Create a destination for inbound messages — an extension or a message queue.",
          "Move the extensions allowed to start messaging sessions from **Available** to **Selected**.",
          "Select **Save**.",
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "Use E.164 when sending",
        body: "Messages initiated in any other format will not be delivered.",
      },
      { kind: "text", body: "Open Linkus and start sending." },
    ],
  },
];
