# Annapurna Pooja Products

WhatsApp-first storefront for temple-quality pooja essentials — incense, diyas, brassware, powders, oils, and complete puja kits.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 + Framer Motion
- next-intl (English / Telugu)
- Cart → WhatsApp checkout

## Theme

Brown · cream · white (`app/[locale]/globals.css`)

## Getting started

```bash
cd annapurna-pooja-products
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

| What | Where |
|------|--------|
| Brand / phone / WhatsApp / map | `app/utils/brand.ts` |
| Product catalog (60 items) | `app/data/products.ts` |
| Names & copy | `messages/en.json`, `messages/te.json` |
| Product photos | Replace SVGs under `public/products/...` |
| Logo / OG | `public/logo.svg`, `public/og-share.svg` |

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `node scripts/generate_placeholders.mjs` — regenerate SVG product placeholders
