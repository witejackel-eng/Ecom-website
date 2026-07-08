# Enterprise Tech Store

An eCommerce website for security and surveillance products — CCTV cameras, NVRs, networking equipment, and biometric devices. Built as a storefront with a browsable product catalog, cart, checkout flow, and basic account management.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.2.9 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, Framer Motion |
| UI Primitives | Radix UI (select, slider, checkbox), Lucide icons |
| Security | `csrf-csrf`, `isomorphic-dompurify`, `xss`, `bcryptjs`, `@upstash/ratelimit` + `@upstash/redis` |
| Logging | Pino (JSON in production, pretty-printed in dev) |
| Data export | xlsx |
| Validation | Custom validators (string, email, phone, URL, ID) |

## Architecture

**Authentication** — Client-side only. User state is managed via React Context (`AuthContext`) and persisted to `localStorage`. Passwords are hashed with bcryptjs, but there is no server-side session management or token-based auth.

**Product data** — Hardcoded in `src/data/products.ts`. No database. Products, categories, images, specs, and download links are all defined as a static TypeScript array.

**Security middleware** — The root `middleware.ts` is currently a passthrough placeholder. Security enforcement (CSRF tokens, XSS sanitization, rate limiting, input validation, security headers) is implemented as library modules under `src/lib/` and applied in API routes and `next.config.ts`. See [SECURITY_HARDENING_SUMMARY.md](./SECURITY_HARDENING_SUMMARY.md) for details.

**API routes** — Three routes exist under `src/app/api/`: CSRF token generation, document listing, and file downloads. All include input validation.

## Folder Structure

```
src/
  app/                  # App Router — pages, layouts, API routes
    api/                # CSRF, documents, downloads
    products/[id]/      # Product detail pages
    account/            # Account, orders, addresses, wishlist
    cart/               # Cart page
    checkout/           # Checkout page
    login/ signup/      # Auth pages
    contact/ support/   # Contact and support pages
    downloads/          # Datasheet/manual downloads page
  components/           # UI components (Navbar, Footer, CartDrawer, etc.)
  context/              # AuthContext, CartContext (React Context + useReducer)
  data/products.ts      # Hardcoded product catalog
  lib/                  # Security helpers, validation, logging, SEO utilities
    seo/                # Metadata constants, types, JSON-LD schema
middleware.ts            # Root middleware (placeholder)
public/
  images/products/      # Product images
  downloads/            # Datasheets and manuals
  docs/datasheets/      # Additional datasheets
  docs/manuals/         # Additional user manuals
```

## Installation

```bash
git clone https://github.com/witejackel-eng/Ecom-website.git
cd Ecom-website
npm install
```

Create a `.env.local` file with required variables (CSRF secret, Upstash Redis credentials for rate limiting). See `.env.example` for the template.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deployment

A GitHub Actions workflow (`.github/workflows/nextjs.yml`) builds and deploys the site as a static export to GitHub Pages on push to `main`. Node 20 is used in CI.

Since this is a standard Next.js app, it can also be deployed to Vercel with no additional configuration.

## Features

- **Product catalog** — Filterable by category (dome cameras, bullet cameras, NVRs, biometrics, networking), with search, image galleries, specs, and related products
- **Cart** — Add/remove items, quantity adjustment, persisted via CartContext
- **Checkout** — Multi-step checkout flow with address form
- **Authentication** — Login and registration pages, account profile, password change (client-side only)
- **Contact & support** — Contact form and support page
- **Downloads** — Datasheets and user manuals for listed products
- **SEO** — Next.js metadata API, Open Graph tags, `sitemap.ts`, `robots.ts`, semantic HTML, JSON-LD schema
- **Security hardening** — CSRF token generation and validation, XSS sanitization (DOMPurify + xss library), Upstash Redis rate limiting per endpoint, strict security headers (CSP, HSTS, X-Frame-Options, etc.), input validation on all API routes, open redirect prevention. Documented in [SECURITY_HARDENING_SUMMARY.md](./SECURITY_HARDENING_SUMMARY.md)

## Known Limitations

- **No database** — All product data is hardcoded in a TypeScript file. Adding, updating, or removing products requires editing source code and redeploying.
- **Client-side auth only** — User accounts exist in `localStorage` only. There is no server-side authentication, session persistence, or multi-device support. Clearing browser data loses the account.
- **No payment processing** — The checkout form collects shipping details but does not integrate any payment gateway.
- **No admin panel** — There is no admin interface for managing products, orders, or users. Product edits are code-level changes.
- **Static export target** — The GitHub Pages deployment uses `next export` (static output), which means server-side features (middleware, API routes, ISR) are not available in that environment.

## Future Improvements

- Database integration (e.g., Prisma + PostgreSQL) for products, orders, and users
- Payment gateway integration (Razorpay, Stripe, etc.)
- Server-side authentication with session tokens or JWTs
- Admin dashboard for product and order management
- Dynamic server-rendered pages instead of static export

## License

MIT — see [LICENSE](./LICENSE).