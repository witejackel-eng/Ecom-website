# Reference storefront tangerine audit

Audit date: 2026-07-22

## Canonical theme

| Role | Value |
| --- | --- |
| Primary tangerine | `#FF8A00` |
| Hover tangerine | `#FFA62B` |
| Lighter accent | `#FFB347` |
| RGB channels | `255 138 0` |

The existing reference design and structure were retained. Alpha variants now derive from the shared RGB token, and 75 brand-color or orange-on-white occurrences were normalized across 24 UI files. Semantic amber delivery status styling and third-party logo colors were intentionally retained.

The favicon now uses the DD mark and the manifest/theme metadata uses the canonical tangerine.

## Verification

- Theme validator: passed, 54 files.
- Unit tests: 11 passed.
- Next.js production build and TypeScript compilation: passed; 26 pages generated.
- Browser check: home, products, cart, and contact passed at 320, 375, 430, 768, 1024, 1280, and 1440 px with exact computed theme values, no horizontal overflow, no console errors, and valid favicon/manifest responses.
- Repository-wide ESLint remains blocked by 48 pre-existing errors unrelated to this palette-only change, including existing conditional hooks, explicit `any` types, state updates in effects, and literal `//` JSX labels. No lint configuration was weakened and those unrelated files were not refactored.

