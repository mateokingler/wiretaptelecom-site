# Wiretap Telecom site redesign

Next.js + shadcn/ui + Kibo UI mock of the Wiretap Telecom marketing site.

## Stack

- Next.js (App Router)
- Tailwind CSS v4
- shadcn/ui (CSS variables)
- Kibo UI: `announcement`, `banner`, `marquee`

## Develop

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy these into `.env.local` (gitignored) and set them on the host:

| Variable | Purpose |
| --- | --- |
| `SLACK_WEBHOOK_URL` | Incoming webhook for `sales_alerts`. `/api/lead-alert` posts new website leads here after Zoho accepts them. Unset, the alert is logged instead of sent and the form still works. |

## Notes

- Marked `noindex` while this is a redesign mock.
- Brand assets live under `public/brand` and `public/products`.
- Kibo MCP in Cursor was unavailable during scaffolding; components were added with `npx kibo-ui add`.
