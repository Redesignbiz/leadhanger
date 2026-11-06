# Images

Static files go in `public/images/` and are served from `/images/<filename>`.
Dropping a file in the folder is not enough on its own: which file appears where
is decided in code, so the table below is the map.

## Current inventory

| File | Used by | Status |
|---|---|---|
| `public/images/leadhanger-logo.svg` | `src/components/Logo.tsx`, header and footer | supplied |
| `src/app/icon.png` | Favicon | supplied, see caveat |
| — | Social share card | generated, see below |
| — | Hero visual | drawn in markup, see below |
| `public/images/industries/*.webp` | `src/components/Industries.tsx`, one per card | Unsplash, see below |
| `public/images/screens/*.webp` | `src/lib/screens.ts`, product pages, vertical and ad pages | generated mockups, see below |

## Logo and favicon

Both files were supplied by the client and are used as delivered. The
placeholders drawn during the first build are gone.

`public/images/leadhanger-logo.svg` is the full lock-up, mark and wordmark in
one file at 140×30. The wordmark is drawn as paths, not live text, so it carries
its own letterforms and does not depend on the page's webfont. It also does not
follow `--color-ink`: the file paints the name in `#161A25`, which matches
today's ink token but will not track a change to it. The logo renders at a fixed
height with `w-auto`; that 140×30 ratio is the only correct one.

The wordmark is dark, so the file cannot go on an inverse surface. Placing the
logo on the dark Results panel or in the share card needs a light variant, which
does not exist yet.

The favicon is a separate file because Next.js reads icons from `app/`, not from
`public/`. Caveat: it ships at 32×23, so it is neither square nor larger than
the 32px slot, and Next declares it as `sizes="32x23"`. Browsers letterbox it
rather than stretch it, but there is no headroom for the 48px and 180px slots
and no retina detail. A square master at 512×512 would fix both.

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

## Industry photos

Six Unsplash photos, one per industry card, resized to 1200px wide and saved as
WebP (15–90 KB each). The originals are in `industries/` at the project root;
that folder is source material, not served, and is not imported anywhere.

| File | Unsplash original |
|---|---|
| `tires.webp` | Robert Laursoo, `WHPOFFzY9gU` |
| `hvac.webp` | alpha innotec, `VsjNRXO_c2w` |
| `kitchen-bath.webp` | Aaron Huber, `G7sE2S4Lab4` |
| `insurance.webp` | Igor Lolatto, `TdwYsTmA2Bc` |
| `batteries.webp` | Wesley Tingey, `E4Oz0TZUDe8` |
| `home-improvement.webp` | Meg, `YldJ2NIz1Yo` (November 6, 2026; replaces Josh Lemmon's `0t6fkXvg9hs`) |

The Unsplash licence does not require credit. Two photos show a brand: the
heat pumps carry the alpha innotec mark and the battery is an Energizer.

## Social share card

Generated at build time by `src/app/opengraph-image.tsx`, so it cannot drift out
of sync with the metrics in `src/lib/site.ts`. There is no `og.png` to maintain.

It renders through satori, which supports flexbox but **not** grid, and only a
subset of CSS. If a change to that file produces a blank or broken card, an
unsupported property is the first thing to check.

No custom font is loaded, so the card uses satori's bundled face and the weights
are approximate rather than Inter's. That was a deliberate trade: loading a font
would add a network fetch at build time for a 1200×630 image nobody reads
closely. If the card ever needs to match the site's typography exactly, that is
the thing to change.

## Conventions

- SVG for anything flat: marks, icons, logos. PNG when transparency is needed,
  JPG or WebP otherwise.
- Lowercase filenames, hyphens instead of spaces, no accented characters.
- An image displayed at 100px should be at least 200px wide.
- Compress before committing. A 1024×1024 PNG has no business being over 200 KB.

## Product screens (mockups)

Nine WebP images in `public/images/screens/`, listed with their alt text in
`src/lib/screens.ts`, which also says where each one appears. They stand in for
the English screens from the US demo account (website brief p.29, due December
4, 2026); replace each with the real screen when it exists, then delete the
mockup and its entry.

They are drawn, not captured. `scripts/screens/` redraws the product's own
screens from brisa-frontend in English (decided November 6, 2026):

- **Layout:** the dealer app's request list, request detail and wide (tablet)
  layout; the brand dashboard's routing rules and performance view; the chat
  widget's default tire flow. Type scale, spacing and icons are the product's
  (Nunito Sans, MaterialIcons).
- **Whole screens:** each image is the whole device or window, nothing
  cropped. Phones are 640×1348 and shown at most 17rem wide.
- **Colour:** the site's dark palette instead of the product's light one, so
  the screens sit on the page. The mapping is in `scripts/screens/kit.mjs`.
- **Logo:** the dashboard sidebar shows `public/images/leadhanger-logo.svg`
  where the product shows the client's logo. Its wordmark is drawn in the
  site's ink colour instead of `#161A25` so it reads on the dark screen; the
  mark's two blues are unchanged.
- **Data:** made-up US dealers, towns and figures; the customers are Maria
  Garcia, John Smith, Jane Doe, David Miller and Emily Johnson (the user's
  list, November 6, 2026). "Sample Tires" stands in for a brand. No client
  name, logo or brand appears.
- **December features:** the conversation thread (`dealer-app-thread`) and the
  window request (`dealer-app-lead-window`) show features that ship with the
  US demo. The thread sits under /lp/tires's "Respond and book" step, which is
  labelled "Launching December"; the window question set carries no label,
  as in the brief.

To redraw: `node scripts/screens/render.mjs` (or name some, e.g. `render.mjs
chat rules`). It needs `../brisa-frontend` with its `node_modules` installed,
for the Nunito Sans, Inter and MaterialIcons font files; set `BRISA_FRONTEND`
if it lives elsewhere. It renders with the satori copy inside `next/og` and
never goes to the network: a character missing from those fonts stops it
instead of fetching a fallback font. `PREVIEW_DIR=<dir>` also writes a JPEG of
each for checking by eye.
