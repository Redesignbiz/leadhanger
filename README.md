# LeadHanger — marketing site

Single-page site for `leadhanger.com`, plus a privacy notice. Next.js 16 App
Router, Tailwind v4, TypeScript, no backend.

This is a separate product from Yeni Müşterim, whose codebase this was seeded
from. Nothing is shared between the two repositories.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where things live

| | |
|---|---|
| Every fixed value (names, metrics, addresses, CTA text) | `src/lib/site.ts` |
| Design tokens | `src/app/globals.css` |
| Page composition and section order | `src/app/page.tsx` |
| One section per component | `src/components/` |
| Social share card, generated at build | `src/app/opengraph-image.tsx` |
| Brief, sources and open items | `docs/leadhanger-us-brief.md` |
| Image inventory | `docs/images.md` |

## Rules worth knowing before editing

- **No shadows.** Depth is a 1px border plus tonal layering. There is no shadow
  scale in the tokens, so a `shadow-*` utility here is a mistake, not a variant.
- **Published metrics only.** The four figures in `site.ts` are the ones already
  live on the Redesign Business case study. Internal numbers do not go on this
  site, and the reasoning is in the comment above them.
- **No invented statistics.** Several archived marketing drafts carry unsourced
  percentages. None of them are on this site. Keep it that way.
- **Anchor links use absolute paths** (`/#plans`, not `#plans`) and plain `a`
  rather than `Link`. The reason is in the comment in `src/components/Header.tsx`.

## Before launch

`docs/leadhanger-us-brief.md` has the full list. The blocking ones: real brand
assets, legal review of the privacy notice, and a decision on the demo CTA
(mailto today, scheduling link later).
