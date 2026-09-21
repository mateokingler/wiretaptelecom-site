import type { DocArticle } from "@/lib/docs-schema";

export const numberArticles: DocArticle[] = [
  {
    slug: "port-numbers-to-wiretap-telecom",
    title: "Port numbers to Wiretap Telecom",
    summary:
      "Submit a port-in order, read the status it lands in, and plan the cutover so nothing drops on the day.",
    category: "numbers",
    keywords: [
      "porting",
      "port-in",
      "loa",
      "foc",
      "losing carrier",
      "toll free",
      "snapback",
      "exception",
      "npac",
    ],
    updated: "2024-06-27",
    blocks: [
      {
        kind: "text",
        body: "The FCC mandated number portability in 1996, which is why you can take your numbers with you when you change carrier. Behind that simple idea sits NPAC, NANPA, the Number Pooling Administration, LERG, BIRRDS, and the losing carrier's own approval process. We handle those parts. What we need from you is accurate information.",
      },
      {
        kind: "note",
        title: "MSPs need a porting agreement",
        body: "If you are an MSP, complete a porting agreement with us before submitting ports. Contact the [help desk](https://helpdesk.wiretaptelecom.com) if you need a copy.",
      },
      { kind: "heading", text: "Submit a port-in order" },
      {
        kind: "steps",
        items: [
          "Sign in to the portal and choose your account if you land on the multi-account dashboard.",
          "In the left bar under **ACCOUNT MANAGE**, expand **Manage Numbers** and choose **Porting**.",
          "On the Ports Management page, click the blue plus sign in the upper left.",
          "Enter the numbers to port. You can add up to 5,000 on a single order; more than one requires CSV format.",
          "Click **Verify** and wait for the portability grid to load.",
          "Click **Create Port-In Order**, complete the detail fields, tick the authorisation box, and **Submit**.",
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "Use a bare 10-digit format",
        body: "No parentheses, dashes, plus signs, or leading ones. Just ten digits per number.",
      },
      {
        kind: "text",
        body: "The portability grid tells you the **Number**, its **Tier** (which is a pricing band for inbound calls), the **Current Provider**, and whether it reads as **Portable**.",
      },
      {
        kind: "note",
        title: "A number showing as not portable is not the end",
        body: "Submit the port anyway. We will do what we can behind the scenes. Sometimes a number genuinely cannot be ported by anyone, and we will tell you via port note if that happens.",
      },
      { kind: "heading", text: "Why accuracy matters so much" },
      {
        kind: "text",
        body: "The losing carrier has to approve every port-out, and they are obliged to prevent unauthorised ones. The details you give us are submitted to them as evidence that we are acting for their customer — in effect, the information works as a password. The large majority of rejections come from inaccurate or incomplete porting information, and each rejection can add weeks or months.",
      },
      { kind: "subheading", text: "What goes in each field" },
      {
        kind: "fields",
        items: [
          {
            term: "Company Name",
            description:
              "The company name exactly as it appears on the losing carrier bill. For a residential port, the person's name as shown on the bill.",
          },
          {
            term: "Account Number",
            description:
              "From the losing carrier bill. Dashes, spaces, and symbols are stripped automatically, but avoid them.",
          },
          {
            term: "BTN",
            description: "The billing telephone number on the losing carrier bill.",
          },
          {
            term: "New BTN",
            description:
              "Only for a partial port where the BTN itself is porting. Give a number staying behind on the losing carrier account, so they can swap it in and keep that account active.",
          },
          { term: "PIN", description: "The port-out PIN held by the losing carrier." },
          {
            term: "Auth Name",
            description:
              "Someone on the losing carrier's list of people authorised to change or close the account.",
          },
          {
            term: "Auth Date",
            description:
              "Usually today. If an MSP holds a signed LOA from the customer, use the signature date. It can be no more than 30 days old at submission.",
          },
          {
            term: "Address fields",
            description:
              "Street number, pre-direction, name, type, post-direction, location type and value, city, state, and zip — all exactly as they appear on the losing carrier bill. Avoid a PO box unless the bill actually shows one.",
          },
          {
            term: "Desired FOC Date",
            description:
              "At least two business days out. This is a request, not a commitment; the real FOC date is stamped when the losing carrier agrees, and often falls later.",
          },
          {
            term: "I have an LOA / Bill / CSR",
            description:
              "Optional but genuinely helps. A recent bill or LOA lets us contest a rejection without coming back to you.",
          },
          {
            term: "Select a Trunk",
            description:
              "Assign one. If you do not, the numbers play a disconnect message when the port completes until somebody adds them to a trunk.",
          },
        ],
      },
      { kind: "heading", text: "Split ports" },
      {
        kind: "text",
        body: "If your order contains numbers belonging to more than one losing carrier, the portal splits it into separate orders and submits each to the right carrier. Expect a higher chance of rejection on split ports, because the same account details go to multiple carriers when they typically only apply to one. We work these behind the scenes and notify you by port note.",
      },
      { kind: "heading", text: "Toll free ports" },
      {
        kind: "text",
        body: "Toll free differs from standard ports in two ways: there is no estimated FOC time, only a date, and a hand-signed LOA is required. Submit the port the same way; our system identifies toll free numbers and splits them if needed, then emails the submitter an LOA to sign by hand.",
      },
      {
        kind: "note",
        tone: "warning",
        title: "The authorising name has to match",
        body: "If the name on the hand-signed LOA differs from the authoriser on the losing carrier account, the port will reject. This is the single most common reason toll free ports fail, and a new LOA can add days or weeks.",
      },
      {
        kind: "text",
        body: "Once a toll free port reaches FOC, we have no control over the time of day, and the desired FOC date carries little weight. Expect it to complete on a day you did not request, usually in the morning Central time.",
      },
      { kind: "heading", text: "The porting lifecycle" },
      {
        kind: "text",
        body: "Status tells you who the order is waiting on. A **New** port needs action from us; an **Exception** needs action from you.",
      },
      {
        kind: "fields",
        items: [
          {
            term: "New",
            description:
              "Every port starts here. It either promotes to Submitted automatically, or we work it by hand — common when the losing carrier is not automated, or when something like the account number is missing.",
          },
          {
            term: "Submitted",
            description:
              "With the losing carrier for review. Nobody needs to do anything; we are waiting for them to issue an FOC or reject. Responses take minutes, hours, or days.",
          },
          {
            term: "Exception",
            description:
              "The losing carrier rejected it, or we found the order incomplete before submitting. Read the port note and respond — we cannot move it without you, and it will eventually expire.",
          },
          {
            term: "Manual Support",
            description:
              "Not in trouble, but needs human attention. Triggered by a toll free port awaiting its LOA, by us pausing the order, or by you editing any field on it.",
          },
          {
            term: "FOC",
            description:
              "The losing carrier has agreed a release date and time. Your numbers are pre-initialised on our network so you can set attributes, but they are not live until the port completes.",
          },
          {
            term: "Complete",
            description: "Done. Every number on the order is live on the Wiretap network.",
          },
        ],
      },
      { kind: "subheading", text: "Why losing carriers reject" },
      {
        kind: "table",
        columns: ["Issue", "Will they reject?"],
        rows: [
          ["Incorrect address or zip code", "Yes"],
          ["Incorrect account number", "Yes"],
          ["Incorrect BTN", "Depends on the carrier"],
          ["Incorrect PIN", "Yes"],
          ["Incorrect secondary address, such as a suite number", "Usually no"],
          ["Inactive or disconnected numbers on the port", "Yes"],
          ["Invalid authorisation name", "Yes"],
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "At FOC, do not forget",
        body: "Assign a trunk to the numbers before the port completes, set caller IDs, dips, and E-911, and build the inbound routes on your PBX. If you use our ATA fax gateway, tell us at FOC so we can help provision.",
      },
      { kind: "heading", text: "Updating or cancelling a port" },
      {
        kind: "text",
        body: "Editing any field on an active port moves it to **Manual Support** and generates a port note, because a modified port has to be handled by hand. Try to only edit while the status is New, Exception, or Manual Support. Editing an order that is already in motion is rarely necessary.",
      },
      {
        kind: "text",
        body: "To cancel, open the port from the Ports Management page, scroll to **Cancel This Port-In Order**, and confirm. Who else has to agree depends on where the order has got to.",
      },
      {
        kind: "table",
        columns: ["Port status", "Losing carrier must confirm", "NPAC must confirm"],
        rows: [
          ["New", "No", "No"],
          ["Submitted", "Yes", "No"],
          ["Exception", "Yes", "No"],
          ["FOC", "Yes", "Yes"],
          ["Manual Support", "Yes", "No"],
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "Cancelling at FOC costs money",
        body: "Porting fees already applied cannot be waived once the order reaches FOC. And if the FOC is inside roughly a 24-hour completion window, we may not be able to stop it at all.",
      },
      { kind: "heading", text: "Plan the cutover" },
      {
        kind: "text",
        body: "Treat a port as a number migration: something has to be ready to make and receive calls the moment it completes. Depending on scope, that means building trunks in the portal, buying temporary test numbers, adding the Wiretap trunk to your PBX, building inbound routes, installing hardware, and agreeing the date with the end user.",
      },
      { kind: "subheading", text: "What you can and cannot do at FOC" },
      {
        kind: "text",
        body: "Numbers appear in the portal once the order reaches FOC, but a few actions stay locked until it completes.",
      },
      {
        kind: "table",
        columns: ["Action", "Available at FOC?"],
        rows: [
          ["Adjust caller ID and inbound caller ID", "Yes"],
          ["Adjust trunk routing", "Yes"],
          ["Assign to E-911 and E-911 location services", "Yes"],
          ["Assign trunk alias and inbound prefix", "Yes"],
          ["Assign Route As Number (DID transformation)", "Yes"],
          ["Assign failover trunk or failover number", "Yes"],
          ["Set up a number forward", "Yes"],
          ["Optimise fax receiving, set dedicated fax number", "Yes"],
          ["Adjust port-out PIN and number status", "Yes"],
          ["Change the FOC'd number to your BTN", "No"],
          ["Disconnect the number", "No"],
          ["Assign to Core-Fax or Core-SMS", "No"],
          ["Assign to ATA fax gateway services", "No"],
        ],
      },
      { kind: "heading", text: "DID transformation (Route As Number)" },
      {
        kind: "text",
        body: "Here is the problem this solves. Say a hundred employees have a hundred numbers. Before the port completes you need a hundred inbound routes on the new PBX. A common workaround is to buy a hundred temporary numbers, build a hundred *temporary* routes, and have the losing carrier forward each permanent number to its temporary one — so the PBX starts taking calls early. That works, but you have just built two hundred routes and half of them are throwaway.",
      },
      {
        kind: "text",
        body: "Route As Number removes the throwaway half. It presents a temporary number to your PBX as the permanent number, so you only ever build the routes you intend to keep. When the port completes the transformation stops by itself, because the temporary numbers stop receiving calls.",
      },
      {
        kind: "steps",
        items: [
          "In the left bar under **TRUNKING**, expand **Manage Trunks** and choose **Trunk Numbers**.",
          "Find the temporary number, click it, then click **Edit**.",
          "Choose **Route as Number** and enter the permanent number it should present as.",
        ],
      },
      {
        kind: "note",
        title: "Mass update",
        body: "Multi-select numbers in the grid with Ctrl and click to update them together.",
      },
      { kind: "heading", text: "Terms you will see" },
      {
        kind: "fields",
        items: [
          {
            term: "Winning carrier",
            description: "The carrier receiving the numbers. On a port-in, that is us.",
          },
          { term: "Losing carrier", description: "The carrier releasing the numbers." },
          {
            term: "CSR",
            description:
              "Customer Service Record. A document from the current carrier listing account name, account number, BTN, address, numbers, and number PINs.",
          },
          {
            term: "BTN / ATN",
            description:
              "Billing or Account Telephone Number — the main number tied to an account. Legacy carriers treat it strictly; modern carriers keep the term mostly out of formality.",
          },
          {
            term: "Partial port",
            description: "Porting some, but not all, numbers off the losing carrier account.",
          },
          {
            term: "PIN",
            description:
              "An optional port-out PIN set by the customer or assigned by the carrier, to stop numbers moving without authorisation.",
          },
          {
            term: "LOA",
            description:
              "Letter of Authorization, sometimes Letter of Agency. Formal permission for the new provider to act for the customer. Electronic or hand-signed.",
          },
          {
            term: "PON",
            description:
              "Port order number. A unique ID shared between winning and losing carriers so both can reference the order.",
          },
          {
            term: "Snapback",
            description:
              "Reversing a port back to the losing carrier within 24 hours of completion. Rare, and expensive.",
          },
        ],
      },
      { kind: "heading", text: "Questions" },
      {
        kind: "faq",
        items: [
          {
            question: "Why is my number showing as non-portable?",
            answer:
              "Several possible reasons. It could be a government number, in a rural area, or held by a local exchange carrier that does not support porting.",
          },
          {
            question: "Can I port a number even if the portability check says it is not portable?",
            answer:
              "Possibly. Submit the port and we will work behind the scenes to see whether we can get it moved.",
          },
          {
            question: "What is the Porting Console?",
            answer:
              "For multi-account users, it gives an inter-company view of your port orders so you do not have to jump in and out of accounts to find one.",
          },
          {
            question: "What does Tier mean on a portability check?",
            answer:
              "Tier refers to pricing. You can find your tier pricing in the billing dashboard of the portal.",
          },
          {
            question: "I cancelled my port but was still charged. Why?",
            answer:
              "A charge applies if the port was cancelled at FOC status. Once an order reaches FOC, porting charges are non-refundable.",
          },
          {
            question: "Can I change my requested FOC date?",
            answer:
              "Usually yes, but it is awkward and can cause the order to be cancelled. We recommend against modifying an FOC'd order; if you must, do it before the 48-hour porting window.",
          },
          {
            question: "Can I reverse a completed port?",
            answer:
              "That is a snapback. It can be done but is not guaranteed, and fees sometimes exceed $100 per number.",
          },
        ],
      },
    ],
  },
  {
    slug: "manage-your-default-inbound-prefix",
    title: "Manage your default inbound prefix",
    summary:
      "Choose the digit format we hand inbound calls to your PBX in: 10-digit, leading 1, or full E.164.",
    category: "numbers",
    keywords: ["e.164", "inbound prefix", "nanp", "dial pattern", "inbound route", "10 digit"],
    updated: "2024-06-27",
    blocks: [
      {
        kind: "note",
        tone: "warning",
        title: "This setting can cause an inbound outage",
        body: "If the format does not match what your PBX expects, inbound calls stop working. Know what your PBX wants before you change it.",
      },
      { kind: "heading", text: "What the setting does" },
      {
        kind: "text",
        body: "You decide the format inbound calls arrive in. Our default is 10 digits, so if you never touch this, every inbound call reaches your PBX as ten digits.",
      },
      {
        kind: "text",
        body: "Some setups need something else. A few PBX SMS and MMS features expect a leading 1 or full E.164, and sometimes it is simply preference.",
      },
      {
        kind: "text",
        body: "Wiretap serves the North American Numbering Plan: the 50 US states and territories, Canada, and NANP Caribbean nations. All of them use country code 1 in E.164 format.",
      },
      { kind: "subheading", text: "Pattern notation" },
      {
        kind: "table",
        columns: ["Symbol", "Means"],
        rows: [
          ["`N`", "Any digit from 2 to 9"],
          ["`X`", "Any digit from 0 to 9"],
        ],
      },
      {
        kind: "table",
        columns: ["Pattern", "Format"],
        rows: [
          ["`NXXXXXXXXX`", "Wiretap default, 10 digits"],
          ["`1NXXXXXXXXX`", "Non-standard, leading 1"],
          ["`+1NXXXXXXXXX`", "E.164"],
        ],
      },
      { kind: "heading", text: "View your current prefix" },
      {
        kind: "steps",
        items: [
          "Sign in to the portal and choose your account if you land on the multi-account dashboard.",
          "In the left bar under **ACCOUNT MANAGE**, expand **Manage Plan** and choose **Plan Details**.",
          "Find the default inbound prefix on the right-hand side of the page.",
        ],
      },
      {
        kind: "note",
        title: "What N/A means",
        body: "No default inbound prefix is set, so your PBX receives calls in the `NXXXXXXXXX` format.",
      },
      { kind: "heading", text: "Change it" },
      {
        kind: "steps",
        items: [
          "From Plan Details, click anywhere in the default inbound prefix box.",
          "Enter the new prefix in the window that appears.",
          "Click **Change Default Inbound Prefix**.",
        ],
      },
      { kind: "heading", text: "Questions" },
      {
        kind: "faq",
        items: [
          {
            question: "Can I override the prefix for certain calls or certain trunks?",
            answer: "No. The default inbound prefix applies to all inbound calls.",
          },
          {
            question: "Do I need one?",
            answer:
              "In most cases, no. We recommend leaving the default alone unless you have a business or technical reason to change it.",
          },
        ],
      },
    ],
  },
  {
    slug: "manage-your-default-area-code",
    title: "Manage your default area code",
    summary:
      "Let users dial seven digits for local calls by having our switches prepend an area code on the way out.",
    category: "numbers",
    keywords: ["area code", "7 digit dialing", "local dialing", "outbound"],
    updated: "2024-06-27",
    blocks: [
      { kind: "heading", text: "What the setting does" },
      {
        kind: "text",
        body: "A default area code is optional and empty when your account is created. It exists so people can dial seven digits instead of ten for local outbound calls — a habit from legacy carriers that is still common in rural parts of the US.",
      },
      {
        kind: "text",
        body: "The mechanism is simple: our switches prepend your three-digit default area code to any outbound call we receive that is seven digits long. If your default is `305` and you want to reach `3055551234`, you can dial all ten digits or just `5551234`. To call any other area code, dial ten digits.",
      },
      { kind: "heading", text: "View your current area code" },
      {
        kind: "steps",
        items: [
          "Sign in to the portal and choose your account if you land on the multi-account dashboard.",
          "In the left bar under **ACCOUNT MANAGE**, expand **Manage Plan** and choose **Plan Details**.",
          "Find the default area code on the right-hand side of the page.",
        ],
      },
      {
        kind: "note",
        title: "What N/A means",
        body: "Your account has no default area code, and seven-digit dialling will be rejected.",
      },
      { kind: "heading", text: "Change it" },
      {
        kind: "steps",
        items: [
          "From Plan Details, click anywhere in the default area code box.",
          "Enter the area code you want in the window that appears.",
          "Click **Change Default Area Code**.",
        ],
      },
      {
        kind: "note",
        body: "To turn the feature off, repeat those steps and leave the new area code field empty.",
      },
      { kind: "heading", text: "Questions" },
      {
        kind: "faq",
        items: [
          {
            question: "My PBX already prepends the area code. Do I need this too?",
            answer:
              "No. It is up to you whether your PBX or our network does it, or whether you use the feature at all.",
          },
          {
            question: "Does this affect inbound calling?",
            answer:
              "No. This is outbound only. A seven-digit inbound call arriving on our network is disconnected.",
          },
          {
            question: "Can I choose any area code?",
            answer: "Yes. It does not have to be the area code where you are physically located.",
          },
        ],
      },
    ],
  },
  {
    slug: "manage-your-btn",
    title: "Manage your BTN",
    summary:
      "What a billing telephone number is, why it barely matters on a modern carrier, and how to change yours.",
    category: "numbers",
    keywords: ["btn", "atn", "billing telephone number", "account telephone number"],
    updated: "2024-06-27",
    blocks: [
      { kind: "heading", text: "What a BTN is" },
      {
        kind: "text",
        body: "A Billing Telephone Number is a reference to your account number. For some carriers the BTN effectively *is* the account identifier. Legacy carriers such as the old Bell companies used BTNs as account cross-references, which made them critical, and plenty of carriers still identify subscriber accounts that way.",
      },
      {
        kind: "text",
        body: "Modern carriers including Wiretap carried the terminology forward to avoid confusing subscribers and legacy carriers, but today a BTN holds little real value.",
      },
      {
        kind: "note",
        title: "Also called an ATN",
        body: "The industry sometimes says Account Telephone Number instead. It means the same thing.",
      },
      {
        kind: "text",
        body: "Your BTN must be a phone number on your account.",
      },
      { kind: "heading", text: "View your BTN" },
      {
        kind: "steps",
        items: [
          "Sign in to the portal and choose your account if you land on the multi-account dashboard.",
          "In the left bar under **ACCOUNT MANAGE**, expand **Manage Plan** and choose **Plan Details**.",
          "Find the BTN on the far right of the page.",
        ],
      },
      {
        kind: "note",
        title: "Where did this BTN come from?",
        body: "When your account was created, your portal administrator's phone number — collected at signup — was assigned automatically, even though that number is not provisioned on the account.",
      },
      { kind: "heading", text: "Change your BTN" },
      {
        kind: "steps",
        items: [
          "From Plan Details, click anywhere in the BTN box.",
          "Enter the new BTN in the window that appears.",
          "Click **Change BTN**.",
        ],
      },
      { kind: "heading", text: "Questions" },
      {
        kind: "faq",
        items: [
          {
            question: "Will changing my BTN affect my billing or services?",
            answer:
              "No. We do not technically use BTNs for anything service or billing related — only for backwards compatibility with legacy carriers.",
          },
          {
            question: "Can I use a toll free number as my BTN?",
            answer: "Yes. Any number on your Wiretap account will do.",
          },
        ],
      },
    ],
  },
];
