# Images

Static files go in `public/images/` and are served from `/images/<filename>`.
Dropping a file in the folder is not enough on its own: which file appears where
is decided in code, so the table below is the map.

## Current inventory

| File | Used by | Status |
|---|---|---|
| `public/images/leadhanger-mark.svg` | `src/components/Logo.tsx`, header and footer | ⚠ placeholder |
| `src/app/icon.svg` | Favicon | ⚠ placeholder |
| — | Social share card | generated, see below |
| — | Hero visual | drawn in markup, see below |

## The two placeholders

No LeadHanger logo file exists in any project archive, so the mark on this site
was drawn for this build: one inbound lead fanning out to three dealers.

`src/app/icon.svg` is **not** a copy of the mark. Next.js reads icons from
`app/`, not from `public/`, so they are separate files by necessity, and at 16px
the three-way fan turns to mush, so the favicon drops the nodes and thickens the
strokes. When the real mark arrives, both files need redrawing. A `cp` from one
to the other will produce an unreadable favicon.

## No hero image, on purpose

The hero visual is markup, in `src/components/Hero.tsx`: a qualified lead with
consent attached, routed to a named dealer, with the response time under it. It
was built that way because there is no LeadHanger product screenshot anywhere in
the archives, and a generic stock mockup would have said less.

Real material that could replace it:

- Drive → LeadHanger holds three demo videos: `GenericBrand-LeadHanger`,
  `Mavis-LeadHanger` (a US tire chain, useful for a US audience) and
  `Engine Oil Industry_LeadHanger`.
- The live dashboard runs at `app.leadhanger.com`, source in
  `Redesign-Team/Lead-Hanger/dashboard-app`. Screens can be captured from it,
  though anything client-identifying has to come out first.

## Social share card

Generated at build time by `src/app/opengraph-image.tsx`, so it cannot drift out
of sync with the metrics in `src/lib/site.ts`. There is no `og.png` to maintain.

It renders through satori, which supports flexbox but **not** grid, and only a
subset of CSS. If a change to that file produces a blank or broken card, an
unsupported property is the first thing to check.

## Conventions

- SVG for anything flat: marks, icons, logos. PNG when transparency is needed,
  JPG or WebP otherwise.
- Lowercase filenames, hyphens instead of spaces, no accented characters.
- An image displayed at 100px should be at least 200px wide.
- Compress before committing. A 1024×1024 PNG has no business being over 200 KB.
