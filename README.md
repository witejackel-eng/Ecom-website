# Enterprise Tech Store — Premium Next.js eCommerce

A production-grade eCommerce platform for CCTV, surveillance, networking, and biometric security products. Built with enterprise UI patterns, security hardening (CSRF, XSS, rate limiting), and SEO optimization throughout.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Radix UI](https://img.shields.io/badge/Radix-UI-black?style=flat-square)](https://www.radix-ui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## Highlights

- **Security-hardened** — CSRF protection (`csrf-csrf`), XSS sanitization (`isomorphic-dompurify` + `xss`), bcrypt password hashing, Upstash Redis rate limiting, and a strict Content-Security-Policy. See [SECURITY.md](./SECURITY.md) and [SECURITY_HARDENING_SUMMARY.md](./SECURITY_HARDENING_SUMMARY.md).
- **Product catalog** — categorized browsing (CCTV, surveillance, networking, biometric), product detail pages with image galleries, related products, and spec sheets
- **Cart & checkout flow** — Radix UI primitives for accessible dropdowns, sliders, and selects; full keyboard navigation
- **Admin-ready schema** — Prisma models for products, categories, orders, and users (auth via bcrypt)
- **Excel export** — `xlsx` integration for order/product exports
- **Structured logging** — Pino with pretty-printing in dev, JSON in production
- **SEO** — metadata API, Open Graph, sitemap, robots.txt, semantic HTML

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| UI | Tailwind CSS v4, Radix UI primitives, Lucide icons, Framer Motion |
| Security | `csrf-csrf`, `isomorphic-dompurify`, `xss`, `bcryptjs`, `@upstash/ratelimit` + `@upstash/redis` |
| Logging | Pino, pino-pretty |
| Data export | xlsx |
| Validation | validator |

## Run locally

```bash
git clone https://github.com/witejackel-eng/Ecom-website.git
cd Ecom-website
npm install
cp .env.example .env.local   # fill in required vars
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/              # Next.js App Router — pages, layouts, API routes
  components/       # UI components
  lib/              # Utilities, security helpers
middleware.ts       # CSRF, rate limiting, auth checks
docs/               # Architecture and security docs
```

## Security

See [SECURITY.md](./SECURITY.md) for the full security posture and [SECURITY_HARDENING_SUMMARY.md](./SECURITY_HARDENING_SUMMARY.md) for the hardening checklist that was applied.

## License

MIT — see [LICENSE](./LICENSE).
