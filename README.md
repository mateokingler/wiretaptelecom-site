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

## Notes

- Marked `noindex` while this is a redesign mock.
- Brand assets live under `public/brand` and `public/products`.
- Kibo MCP in Cursor was unavailable during scaffolding; components were added with `npx kibo-ui add`.
