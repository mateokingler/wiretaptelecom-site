import type { BlogPost } from "@/lib/blog-schema";

export const p3cxSmsSetupGuide: BlogPost = {
  slug: "3cx-sms-setup-guide",
  title: "3CX SMS Setup Guide",
  excerpt: "Learn how to set up SMS with 3CX and Wiretap Telecom.",
  category: "guides",
  author: "Mateo Aguirre",
  published: "2025-01-12",
  hero: {
    src: "/blog/3cx-sms-setup-guide.png",
    alt: "null",
  },
  blocks: [
    {
      kind: "heading",
      text: "Before you begin, please check the following prerequisites first!",
    },
    {
      kind: "steps",
      items: [
        "Ensure your 3CX is updated to Version 18.0 Update 7 or higher before proceeding with this guide. Follow this guide by 3CX to learn how to upgrade to v18.",
        "Please note that Wiretap Telecom requires all customers sending SMS messages to be registered with TCR. This can be done on our Portal by navigating to Core-SMS -> TCR Form.",
      ],
    },
    {
      kind: "heading",
      text: "1. Enable SMS for a DID(s) if you have not already (Wiretap Portal)",
    },
    {
      kind: "list",
      items: [
        'Navigate to Core-SMS -> Manage Numbers -> Click on "Plus sign" -> Select Number -> Click "Enable"',
      ],
    },
    {
      kind: "heading",
      text: "2. Create a new trunk and migrate DID(s)/settings (3CX Management Console)",
    },
    {
      kind: "list",
      items: [
        "Login to your 3CX Management Console",
        'Navigate to SIP Trunks and click on "Import Provider"',
        'Upload the newly downloaded Wiretap 3CX template and click "OK"',
        'Go to the "DIDs" tab in your newly created trunk, add your SMS-enabled numbers, and click "Save". IMPORTANT: DIDs must be entered in E.164 format (e.g., +19542223333) and ensure that the number isn\'t already assigned to another trunk.',
      ],
    },
    {
      kind: "heading",
      text: "3. Create or Edit existing User (3CX Management Console)",
    },
    {
      kind: "list",
      items: [
        'Go to the "Users" page and edit or create a new User',
        'Ensure "Direct Inbound Dialing (DID)" (located at the bottom of the "General" tab) is populated with the correct DID.',
        "Download the 3CX app on iOS or Android and scan the QR code with the app",
      ],
    },
    {
      kind: "heading",
      text: "4. Enable SMS and Copy Webhook URL in new trunk (3CX Management Console)",
    },
    {
      kind: "list",
      items: [
        'Go to the "SIP Trunks" page and select the newly created trunk',
        'Navigate to the "SMS" tab and enable SMS',
        'Copy the "Webhook URL" to your clipboard',
      ],
    },
    {
      kind: "heading",
      text: "5. Enable Webhook on SMS-enabled DID (Wiretap Portal)",
    },
    {
      kind: "list",
      items: [
        "Go to the Wiretap Portal and login",
        "Navigate to Core-SMS -> Manage Numbers and click on the SMS-enabled DID",
        'Enable "Receive to Webhook API" and choose "3CX Webhook" for Webhook Type',
        "Paste Webhook URI & Save",
      ],
    },
    {
      kind: "heading",
      text: "6. Generate APIv2 Key and populate it in 3CX Trunk (Wiretap Portal & 3CX Management Console)",
    },
    {
      kind: "list",
      items: [
        'Hover over your Avatar in the top right -> Click "Company Settings" -> Click "API Keys" on the left-hand side -> Generate a new API key or use an existing key',
        'Copy the "Auth Token" value (ignore bearer token) into your clipboard',
        'Go to the "SMS" tab in the Trunk on the 3CX Management Console, paste in your API Key and click "Save"',
      ],
    },
    {
      kind: "heading",
      text: '7. On the 3CX Mobile app, go to the "Chats" tab and start sending SMS messages!',
    },
  ],
};
