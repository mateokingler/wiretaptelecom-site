import type { DocArticle } from "@/lib/docs-schema";

export const trunkingArticles: DocArticle[] = [
  {
    slug: "migrating-from-v1-trunking-to-v2",
    title: "Migrate from v1 to v2 trunking",
    summary:
      "Update your firewall for the v2 SBCs and media gateways, flip the trunk version in the portal, and point your PBX at the new SRV record.",
    category: "trunking",
    keywords: [
      "v2",
      "sbc",
      "firewall",
      "whitelist",
      "media gateway",
      "rtp",
      "srv",
      "5060",
      "one-way audio",
    ],
    updated: "2026-08-06",
    blocks: [
      {
        kind: "text",
        body: "Our v2 SIP trunking infrastructure launched in 2024 and most partners have already moved. The legacy v1 platform still runs, but we are asking remaining customers to migrate for call quality and to stay aligned with current security standards.",
      },
      {
        kind: "note",
        tone: "warning",
        title: "Do the firewall work first",
        body: "If you flip the trunk version before your firewall allows the v2 endpoints, calls will stop. Complete the first step below before you touch the portal.",
      },
      { kind: "heading", text: "Allow signaling from the v2 SBCs" },
      {
        kind: "text",
        body: "Permit SIP signaling on port `5060` from each of these v2 endpoints.",
      },
      {
        kind: "table",
        columns: ["SBC", "IP address"],
        rows: [
          ["Neptune", "`38.86.50.6`"],
          ["Venus", "`38.86.50.14`"],
          ["Saturn", "`38.101.249.111`"],
          ["Jupiter", "`38.101.249.112`"],
          ["Pluto", "`38.97.55.242`"],
          ["Future / reserved", "`198.102.104.16/28`"],
        ],
      },
      { kind: "heading", text: "Allow media from the gateways" },
      {
        kind: "text",
        body: "Whitelist the media gateways below, **including the future and reserved ranges**. These need open RTP traffic on UDP ports `9000` to `20000`. Skipping the reserved ranges is the usual cause of one-way audio after a migration.",
      },
      {
        kind: "table",
        columns: ["Media gateway", "IP address", "Ports"],
        rows: [
          ["Misti (legacy, winding down)", "`74.208.82.47`", "9000 – 20000"],
          ["Triniti (legacy, winding down)", "`70.35.200.179`", "9000 – 20000"],
          ["Capri", "`38.101.249.3`", "9000 – 20000"],
          ["Kiki", "`38.86.50.3`", "9000 – 20000"],
          ["Heidi", "`38.86.50.9`", "9000 – 20000"],
          ["Destini", "`38.97.55.241`", "9000 – 20000"],
          ["Future / reserved", "`38.101.249.7/31`", "9000 – 20000"],
          ["Future / reserved", "`38.86.50.7/31`", "9000 – 20000"],
          ["Future / reserved", "`198.102.104.16/28`", "9000 – 20000"],
        ],
      },
      { kind: "heading", text: "Flip the trunk version" },
      {
        kind: "steps",
        items: [
          "Sign in to the Wiretap Portal and go to **Manage Trunks → Trunks**.",
          "Select the trunk you are upgrading.",
          "Scroll to the **Trunk Version** section and flip the switch from version 1 to version 2.",
          "Press **Save** and wait for the trunk to re-provision. This can take up to two minutes.",
        ],
      },
      { kind: "heading", text: "Update your SRV record" },
      {
        kind: "text",
        body: "Point your PBX at the v2 host. On 3CX, go to **Voice & Chat**, scroll to **Server Details** in the general settings, and enter `srv.globalsbc.core-trunk.com` in the **Registrar/Server** field. Press **Save**.",
      },
      {
        kind: "note",
        tone: "warning",
        title: "Legacy 3CX installations",
        body: "On some older 3CX installs the **Registrar/Server** and **Outbound Proxy** fields are locked or hidden, so you cannot enter the new SRV record. In that case you have to rebuild the trunk from the v2 template.",
      },
      {
        kind: "steps",
        items: [
          "**Capture your current settings** before deleting anything — DID routing, caller ID, and E-911 configuration.",
          "**Remove the legacy trunk** from your 3CX management console.",
          "**Add a new SIP trunk** from the v2 template you imported.",
          "**Configure and save.** The template unlocks the necessary fields and fills in the v2 endpoints.",
          "**Re-link your DIDs** to their destinations: extensions, IVRs, or ring groups.",
        ],
      },
      {
        kind: "note",
        title: "Stuck?",
        body: "If you are not sure which template to use, or registration fails after the rebuild, call support on 816 WIRETAP (816-947-3827) or open a ticket in the support portal.",
      },
    ],
  },
];
