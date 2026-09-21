import type { DocArticle } from "@/lib/docs-schema";

export const faxArticles: DocArticle[] = [
  {
    slug: "core-fax-user-guide",
    title: "Core-Fax user guide",
    summary:
      "Send and receive faxes from an email client: domain and number setup, cover pages, dedicated versus hybrid receiving, and caller ID.",
    category: "fax",
    keywords: [
      "fax",
      "core-fax",
      "email to fax",
      "cover page",
      "dedicated",
      "hybrid",
      "fax tracker",
      "t.38",
      "pdf",
    ],
    updated: "2025-01-01",
    blocks: [
      {
        kind: "text",
        body: "Core-Fax sends and receives faxes through your email client. It has been running since June 2017 and is the most active product in our portfolio.",
      },
      { kind: "heading", text: "Before you start" },
      {
        kind: "list",
        items: [
          "You need portal access with the Core-Fax product enabled, and a phone number on the account to assign it to.",
          "You need an email account that produces MIME-standard email — any ISP, Microsoft Exchange, Gmail, and so on.",
          "Maximum email size to Core-Fax is **40MB**. Most clients and servers cap well below that. For larger files, use portal faxing below.",
        ],
      },
      { kind: "heading", text: "How Core-Fax is organised" },
      {
        kind: "fields",
        items: [
          {
            term: "Number Management",
            description:
              "Outbound faxing does not require a number, but receiving does. Any number of email addresses can be assigned to a number.",
          },
          {
            term: "Domain Management",
            description:
              "Registering a domain is optional but recommended. Without one, you have to add each email address individually.",
          },
          {
            term: "Email Address Management",
            description:
              "Used to add individual addresses when you have no registrable domain, and to override per-number settings for a specific address.",
          },
          {
            term: "Fax Tracking",
            description: "A portal view of faxes moving in real time, with metadata and fax viewing.",
          },
        ],
      },
      { kind: "heading", text: "Register your domain" },
      {
        kind: "text",
        body: "Do this first. It lets everyone sharing a domain — `mike@yourcompany.com`, `sara@yourcompany.com` — use Core-Fax without configuring each address. Navigate to **Core-Fax Domains** in the portal.",
      },
      {
        kind: "steps",
        items: [
          "Enter your FQDN, not an email address. For example `yourcompany.com`.",
          "Enter a domain-level default 10-digit caller ID.",
          "Describe the domain in your own words.",
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "Use a caller ID from your own account",
        body: "If you set a caller ID that is not a number on your account, we sign the fax with a poor STIR/SHAKEN attestation level, which makes the receiver more likely to treat it as spam and makes delivery less likely.",
      },
      {
        kind: "text",
        body: "You will be told whether the registration was approved automatically or needs vetting. Approval can take up to 24 hours, and you cannot use the domain until it completes. Not every domain is available — the FQDN has to be associated with your account, so requesting something like `google.com` will not be approved. For an address on a shared provider such as `yahoo.com`, use Email Address Management instead.",
      },
      { kind: "heading", text: "Assign a number" },
      {
        kind: "text",
        body: "Go to **Core-Fax Manage Numbers**, click the blue plus sign, and choose a number from your account.",
      },
      {
        kind: "steps",
        items: [
          "Enter the email addresses to assign to this number, comma separated.",
          "Enter a description.",
          "Choose the receive file type. PDF is recommended.",
          "Choose whether to send success and failure emails. Only the sender receives these, not every address on the number.",
        ],
      },
      { kind: "heading", text: "Override settings per address" },
      {
        kind: "text",
        body: "Email Address Management does two jobs: it provisions individual addresses when you have no registrable domain, and it overrides values set at the number level.",
      },
      {
        kind: "text",
        body: "Say two addresses are on a number with confirmations set to yes, and Sara does not want them. You could give Sara her own number, or turn confirmations off for everyone — but the cleaner fix is an override. Navigate to **Core-Fax Email Addresses**, click the blue plus, enter Sara's address, and set the confirmation to no. The same screen overrides the fax header caller ID and file type.",
      },
      { kind: "heading", text: "Send your first fax" },
      {
        kind: "steps",
        items: [
          "Open your email client as if writing a normal email.",
          "Send to `fax@core-fax.com`.",
          "Put the destination number in the **subject**.",
          "Attach one or more PDF files.",
          "Leave the body blank — anything there is ignored.",
          "Send.",
        ],
      },
      {
        kind: "text",
        body: "The subject accepts E.164 and ordinary variations: `8774713603`, `18774713603`, `+18774713603`. You can embed it in text too, such as `Re: Title Company Fax @1 (877) 471-3603`. If your account has a default area code set, seven digits work as well.",
      },
      {
        kind: "note",
        title: "One fax per attachment",
        body: "Attach more than one PDF with no cover page and each one goes as a separate fax — separate phone calls to the destination.",
      },
      {
        kind: "text",
        body: "Some enterprise fax machines cannot put anything in a subject line. For those, put the destination in the address instead: `8774713603@core-fax.com`.",
      },
      { kind: "heading", text: "Add a cover page" },
      {
        kind: "text",
        body: "Attach the cover page alongside your other PDFs, in any order. Adding one fundamentally changes processing: instead of sending each attachment as its own fax, Core-Fax merges all the PDFs into a single document and puts the cover page first.",
      },
      {
        kind: "text",
        body: "Core-Fax recognises a cover page by filename, case insensitive:",
      },
      {
        kind: "list",
        items: [
          "`cover page.pdf`",
          "`coverpage.pdf`",
          "`cover-page.pdf`",
          "`cover.page.pdf`",
          "`cover+page.pdf`",
          "`cover_page.pdf`",
        ],
      },
      {
        kind: "text",
        body: "If more than one cover page is detected, the first one found is used as the cover and the rest are treated as ordinary pages.",
      },
      { kind: "heading", text: "Dedicated versus hybrid receiving" },
      {
        kind: "text",
        body: "A dedicated fax number is used only for faxes, never for voice. This is the recommended and most reliable way to receive.",
      },
      {
        kind: "text",
        body: "On a dedicated number, our switches do not need to hold the call for roughly five seconds listening for fax tone, because voice calls will never arrive. Core-Fax processes the call immediately. Any email addresses listed for the number in Number Management receive the incoming fax.",
      },
      {
        kind: "steps",
        items: [
          "Go to **Manage Numbers → Numbers** and click your Core-Fax number.",
          "Click **Edit / Mass Edit**. **Optimize Fax Receiving** is already set to Core-Fax and can only change by removing the number from Core-Fax.",
          "Tick **Dedicated Fax Number**.",
        ],
      },
      {
        kind: "text",
        body: "Hybrid is a number handling both voice and fax. Core-Fax numbers default to hybrid; to confirm, check that **Dedicated Fax Number** is unticked. On hybrid, our switches answer every inbound call for about five seconds, send it to Core-Fax if fax tone is detected, and otherwise take the voice route.",
      },
      {
        kind: "note",
        tone: "warning",
        title: "Hybrid is imperfect by nature",
        body: "Many sending fax machines do not follow the T.38 standards closely, so some faxes will take the voice route anyway. That can interfere with voicemail and means somebody hears fax tones on a handset. A dedicated number is the only complete fix.",
      },
      { kind: "heading", text: "How caller ID is chosen" },
      {
        kind: "text",
        body: "Caller ID matters for outbound faxing: it is both the sending caller ID and the header number printed on the document itself. Core-Fax walks a hierarchy to find one, which is what lets you override at a finer level — for instance setting a fax header number on a specific email address to beat the domain default.",
      },
      {
        kind: "text",
        body: "An address can be listed on many numbers. If there is no override in Email Address Management, Core-Fax picks the caller ID from the *least shared* number the address appears on. If Sara is the only address on one number and one of many on another, the dedicated number wins.",
      },
      {
        kind: "note",
        tone: "warning",
        title: "If no caller ID is found",
        body: "The fax goes out with a default caller ID of `0000000000`, and many receiving systems reject a malformed caller ID as spam.",
      },
      { kind: "heading", text: "Fax-Tracker" },
      {
        kind: "text",
        body: "Fax-Tracker shows the in-transit status of inbound and outbound faxes in real time, updating without a page refresh within seconds of a fax starting. It is included free with Core-Fax. MSPs and customers with multiple accounts can watch every account's faxes consolidated in one console.",
      },
      { kind: "heading", text: "Faxing from the portal" },
      {
        kind: "text",
        body: "You can also send without an email client — useful when there is no client available, or the PDF is too large for one. Navigate to **Core-Fax → View Sent and Send** and click the blue plus sign.",
      },
      {
        kind: "steps",
        items: [
          "In **Send To**, enter the destination fax number.",
          "In **Send From**, choose a caller ID available on your account.",
          "Upload the file.",
        ],
      },
      {
        kind: "note",
        title: "Portal faxing takes bigger files",
        body: "The limit here is 50MB and one file per fax, versus 40MB by email. That comfortably exceeds what most email clients and servers allow.",
      },
    ],
  },
];
