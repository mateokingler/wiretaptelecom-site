import type { DocArticle } from "@/lib/docs-schema";

const prerequisite =
  "[Create a SIP trunk](/docs/creating-a-sip-trunk) in the Wiretap Portal and assign DIDs to it before you start here.";

export const pbxArticles: DocArticle[] = [
  {
    slug: "configuring-your-trunk-with-3cx-v20",
    title: "Configure your trunk with 3CX v20",
    summary:
      "Import the Wiretap provider template, or build a generic SIP trunk by hand against our SRV record.",
    category: "pbx",
    keywords: ["3cx", "v20", "template", "generic sip trunk", "srv", "registrar", "ip blacklist"],
    updated: "2026-04-22",
    blocks: [
      {
        kind: "text",
        body: "3CX v20 refined SIP trunk configuration and provisioning over earlier versions. This guide covers both ways to connect it to Wiretap: our provider template, and a hand-built generic trunk.",
      },
      { kind: "heading", text: "Before you start" },
      {
        kind: "list",
        items: [
          "Download and [install 3CX v20](https://www.3cx.com/docs/manual/), and configure its basic settings.",
          prerequisite,
        ],
      },
      { kind: "heading", text: "Configure network settings" },
      {
        kind: "steps",
        items: [
          "Click the **admin** cog at the bottom left of the console and select **Advanced**.",
          "Open the **IP Blacklist** tab and allow the Wiretap IPs. You will find them in the portal under **Manage Trunks → Trunks → Whitelist Management**.",
          "Open the **Network** tab, choose your default internet-facing IP address, and set **External IP Configuration** to either a static or dynamic address.",
        ],
      },
      { kind: "heading", text: "Import the Wiretap template" },
      {
        kind: "text",
        body: "This is the quickest and least error-prone route. The template fills in the endpoints and unlocks fields that 3CX otherwise keeps locked.",
      },
      {
        kind: "steps",
        items: [
          "Download the Wiretap Telecom 3CX v20 template from the [source article](https://docs.wiretaptelecom.com/docs/configuring-your-trunk-with-3cx-v20).",
          "In 3CX, go to **Advanced → Templates**.",
          "Select **Provider Templates**.",
          "Click **Import Provider**.",
        ],
      },
      { kind: "heading", text: "Or build a generic SIP trunk" },
      {
        kind: "steps",
        items: [
          "Select the **admin** cog at the bottom left and choose **Voice & Chat**.",
          "Click **Add Trunk**.",
          "Choose your **Country**, then for **Provider** pick **Generic SIP Trunk (IP Based)** for an IP trunk, or **Generic VOIP Provider (Registration)** for a registration trunk.",
          "Give the trunk a name and default route, and tick **Create an outbound rule for this SIP Trunk**.",
          "Under **Account Details**, enter your **Main Trunk Number**.",
          "Fill in the authentication fields for your trunk type, as described below.",
          "Under **Server Details**, put the SRV record in the **Registrar/Server** field.",
          "Set **Port** to `0` and tick **Auto discovery**.",
        ],
      },
      { kind: "subheading", text: "Authentication fields" },
      {
        kind: "fields",
        items: [
          {
            term: "Registration trunk",
            description:
              "Put the **User ID** from the portal in **Authentication ID**, the generated password in **Authentication password**, and set **Type of authentication** to **Register/Account based**.",
          },
          {
            term: "IP trunk",
            description:
              "Leave **Authentication ID** and **Authentication password** blank, and set **Type of authentication** to **Do not require - IP based**.",
          },
        ],
      },
      { kind: "subheading", text: "Which SRV record" },
      {
        kind: "table",
        columns: ["Trunk version", "Registrar / Server"],
        rows: [
          ["v1 trunks", "`srv.global.core-trunk.com`"],
          ["v2.2 trunks", "`srv.globalsbc.core-trunk.com`"],
        ],
      },
      {
        kind: "note",
        body: "Still on v1? See [migrating from v1 to v2 trunking](/docs/migrating-from-v1-trunking-to-v2) — there is firewall work to do before you switch the record.",
      },
      { kind: "heading", text: "Apply the changes" },
      {
        kind: "steps",
        items: [
          "Select **Save**.",
          "Add your outbound rules, users, departments, and ring groups.",
        ],
      },
    ],
  },
  {
    slug: "configuring-your-trunk-with-freepbx-17-registration",
    title: "Configure FreePBX 17 — registration trunk",
    summary:
      "Set up a chan_pjsip registration trunk on FreePBX 17, including the auth credentials and inbound context.",
    category: "pbx",
    keywords: ["freepbx", "pjsip", "chan_pjsip", "registration", "from-pstn-toheader", "asterisk"],
    updated: "2025-03-27",
    blocks: [
      {
        kind: "text",
        body: "This guide sets up a SIP trunk on FreePBX 17 using PJSIP, which handles NAT better than the older chan_sip driver and supports multiple registrations. If you would rather authenticate by IP address, use the [IP trunk guide](/docs/configuring-your-trunk-with-freepbx-17-ip) instead.",
      },
      { kind: "heading", text: "Before you start" },
      {
        kind: "list",
        items: [
          "[Download](https://www.freepbx.org/downloads/) and install FreePBX 17, and configure its administration and firewall settings.",
          prerequisite,
        ],
      },
      { kind: "heading", text: "Check your SIP settings" },
      {
        kind: "steps",
        items: [
          "Go to **Settings → Asterisk SIP Settings**.",
          "Enter your **external** and **local** network addresses in both **General SIP Settings** and **PJSIP Settings**.",
          "Click **Submit**, then **Apply Config**.",
        ],
      },
      { kind: "heading", text: "Create the trunk" },
      {
        kind: "steps",
        items: [
          "Go to **Connectivity → Trunks** and select **Add SIP (chan_pjsip) Trunk**.",
          "On the **General** tab, name the trunk and set the outbound caller ID.",
          "Open the **pjsip Settings** tab and set your dialed number manipulation rules. The **Dial Patterns Wizard** will generate sensible US patterns for you.",
          "Still on **pjsip Settings → General**, fill in the connection details below.",
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "Set a caller ID somewhere",
        body: "If you do not set an outbound CID on the trunk, you have to set one on every applicable extension. With neither in place, your calls reach us without a valid caller ID.",
      },
      {
        kind: "fields",
        items: [
          {
            term: "Auth Username",
            description: "The **User ID** generated when you created the trunk in the Wiretap Portal.",
          },
          {
            term: "Secret",
            description: "The password you generated when you created the trunk in the portal.",
          },
          { term: "SIP Server", description: "`srv.globalsbc.core-trunk.com`" },
          {
            term: "SIP Server Port",
            description: "Leave blank when using the SRV record. It defaults to port `5060`.",
          },
          { term: "Context", description: "`from-pstn-toheader`" },
        ],
      },
      { kind: "heading", text: "Apply the changes" },
      {
        kind: "steps",
        items: ["Select **Apply Config**.", "Add your extensions and inbound and outbound routes."],
      },
    ],
  },
  {
    slug: "configuring-your-trunk-with-freepbx-17-ip",
    title: "Configure FreePBX 17 — IP trunk",
    summary:
      "Set up a chan_pjsip trunk authenticated by IP address, with no registration credentials to manage.",
    category: "pbx",
    keywords: ["freepbx", "pjsip", "chan_pjsip", "ip authentication", "from-pstn", "asterisk"],
    updated: "2025-03-27",
    blocks: [
      {
        kind: "text",
        body: "This is the IP-authenticated version of the FreePBX 17 setup. There are no registration credentials to manage; we recognize your PBX by its address. If you would rather register, use the [registration trunk guide](/docs/configuring-your-trunk-with-freepbx-17-registration).",
      },
      { kind: "heading", text: "Before you start" },
      {
        kind: "list",
        items: [
          "[Download](https://www.freepbx.org/downloads/) and install FreePBX 17, and configure its administration and firewall settings.",
          prerequisite,
        ],
      },
      { kind: "heading", text: "Check your SIP settings" },
      {
        kind: "steps",
        items: [
          "Go to **Settings → Asterisk SIP Settings**.",
          "Enter your **external** and **local** network addresses in both **General SIP Settings** and **PJSIP Settings**.",
          "Click **Submit**, then **Apply Config**.",
        ],
      },
      { kind: "heading", text: "Create the trunk" },
      {
        kind: "steps",
        items: [
          "Go to **Connectivity → Trunks** and select **Add SIP (chan_pjsip) Trunk**.",
          "On the **General** tab, name the trunk and set the outbound caller ID.",
          "Open the **pjsip Settings** tab and set your dialed number manipulation rules. The **Dial Patterns Wizard** will generate sensible US patterns for you.",
          "Still on **pjsip Settings → General**, fill in the connection details below.",
        ],
      },
      {
        kind: "note",
        tone: "warning",
        title: "Set a caller ID somewhere",
        body: "If you do not set an outbound CID on the trunk, you have to set one on every applicable extension. With neither in place, your calls reach us without a valid caller ID.",
      },
      {
        kind: "fields",
        items: [
          { term: "Registration", description: "None. This is an IP-authenticated trunk." },
          { term: "SIP Server", description: "`srv.globalsbc.core-trunk.com`" },
          {
            term: "SIP Server Port",
            description: "Leave blank when using the SRV record. It defaults to port `5060`.",
          },
          { term: "Context", description: "`from-pstn`" },
        ],
      },
      { kind: "heading", text: "Apply the changes" },
      {
        kind: "steps",
        items: ["Select **Apply Config**.", "Add your extensions and inbound and outbound routes."],
      },
    ],
  },
  {
    slug: "configuring-your-trunk-with-yeastar-p-series",
    title: "Configure your trunk with Yeastar P-Series",
    summary:
      "Add a register trunk on a Yeastar P-Series PBX, then build the inbound and outbound routes around it.",
    category: "pbx",
    keywords: ["yeastar", "p-series", "register trunk", "dns-naptr", "inbound route", "outbound route"],
    updated: "2025-04-29",
    blocks: [
      {
        kind: "text",
        body: "The Yeastar P-Series runs on premises or in the cloud. This guide adds a Wiretap register trunk and then wires up routing in both directions.",
      },
      { kind: "heading", text: "Before you start" },
      {
        kind: "list",
        items: [
          "Download and [install Yeastar P-Series](https://help.yeastar.com/en/p-series-software-edition/software-installation-guide/about-this-guide.html).",
          prerequisite,
        ],
      },
      { kind: "heading", text: "Add the trunk" },
      {
        kind: "steps",
        items: ["Go to **Extension and Trunk → Trunk**.", "Select **Add**."],
      },
      { kind: "heading", text: "Configure the trunk" },
      { kind: "subheading", text: "Basic configuration" },
      {
        kind: "fields",
        items: [
          { term: "Name", description: "Something that identifies the trunk later." },
          { term: "Trunk Status", description: "**Enabled**" },
          { term: "Select ITSP Template", description: "**General**" },
        ],
      },
      { kind: "subheading", text: "Detailed configuration" },
      {
        kind: "fields",
        items: [
          { term: "Trunk Type", description: "**Register Trunk**" },
          { term: "Transport", description: "**DNS-NAPTR**" },
          { term: "Hostname/IP", description: "`srv.globalsbc.core-trunk.com`" },
          { term: "Port", description: "`0`" },
          { term: "Domain", description: "`srv.globalsbc.core-trunk.com`" },
          {
            term: "Username",
            description: "The **User ID** generated for your trunk in the Wiretap Portal.",
          },
          {
            term: "Password",
            description: "The password generated for your trunk in the portal.",
          },
          { term: "Authentication Name", description: "The same **User ID** again." },
        ],
      },
      {
        kind: "text",
        body: "Click **Save**, then **Apply**, then check the trunk status to confirm it has registered.",
      },
      { kind: "heading", text: "Configure an inbound route" },
      {
        kind: "text",
        body: "Go to **Call Control → Inbound Route** and click **Add**.",
      },
      {
        kind: "fields",
        items: [
          { term: "Name", description: "A name for the route." },
          {
            term: "DID Pattern",
            description: "The DID pattern that decides which incoming calls take this route.",
          },
          {
            term: "Trunk",
            description: "Pick your trunk on the left and use the caret to move it to the right.",
          },
          {
            term: "Caller ID Pattern",
            description: "Restricts which caller IDs may use this route. Leave blank for none.",
          },
          {
            term: "Default Destination",
            description: "Where matching calls land, or set it with a time condition.",
          },
        ],
      },
      { kind: "text", body: "Click **Save**, then **Apply**." },
      { kind: "heading", text: "Configure an outbound route" },
      {
        kind: "text",
        body: "Go to **Call Control → Outbound Route** and click **Add**. Outbound routes are evaluated from top to bottom: the system compares the dialed number against the first route's pattern, and if it does not match, moves to the next.",
      },
      {
        kind: "fields",
        items: [
          { term: "Name", description: "A name for the route." },
          { term: "Role", description: "Which role may use this route for outbound calls." },
          { term: "Dial Patterns", description: "The patterns this route should match." },
          { term: "Trunk", description: "Your Wiretap SIP trunk." },
          {
            term: "Outbound Route Password",
            description: "Optional. Prompts users for a password before allowing outbound calls.",
          },
          {
            term: "Extension / Extension Group",
            description: "Which extensions or groups may use this route.",
          },
          { term: "Time Condition", description: "When this route is available." },
        ],
      },
      { kind: "text", body: "Click **Save**, then **Apply**." },
    ],
  },
];
