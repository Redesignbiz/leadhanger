# LeadHanger US landing page — brief, sources, open items

Written 21 August 2026. This site was built from material that already existed
across Redesign's projects. This file records what came from where, what was
deliberately left out, and what is still missing.

---

## 1. What this site is

The marketing site for **LeadHanger**, sold to brands that reach end customers
through a dealer, agent or installer network. Audience: the person accountable
for digital demand and for what the channel does with it (marketing director,
digital channel lead, sales director, CRM owner).

It is **not** a US translation of yenimusterim.com. That site describes the
dealer-facing mobile app of one client's programme. This one sells the platform
behind it. The three decisions taken at the start:

| Decision | Choice |
|---|---|
| Product and audience | LeadHanger platform, sold to brands with a network |
| Brand and domain | LeadHanger, `leadhanger.com` |
| Conversion | Book a demo, plus a plan comparison with no prices |

`leadhanger.com` currently serves an "Under Construction / Back Soon" page with
`newyork@redesignbiz.com` on it. This site replaces that page, and keeps the
same address so nothing in flight is lost.

---

## 2. Where the content came from

| Section | Source |
|---|---|
| Problem framing, the "bought elsewhere" line, the Bridgestone narrative | `RedesignBiz/work/bridgestone/index.html` (published case study) |
| The four metrics | Same case study, and `RedesignBiz/CLAUDE.md` products section |
| Tagline "The bridge from digital to physical sales" | Drive → LeadHanger → "LLM Agent setup" (LeadBot system prompt) |
| Plan comparison, all thirteen rows | Drive → LeadHanger → "Leadhanger Service Levels Simplified.xlsx" |
| One line of script, consent capture, O2O routing, follow-up tracking | Drive → LeadHanger → Business → "Yiğit Bey Satış Metni.docx" |
| "Bought once every five or ten years by a non-expert" framing | Same document. The sharpest idea in the archive |
| Industry list | Drive → LeadHanger → Business → "LEADHANGER SATIŞ STRATEJİSİ.docx" |
| Three platform surfaces (chat, dealer app, brand dashboard) | `Redesign-Team/docs/superpowers/specs/2026-07-04-lead-hanger-ux-rebrand-design.md` |
| Dealer app behaviour (call time, push, one-touch call, outcome capture, retry, reassignment) | The Yeni Müşterim landing brief, which documented the shipped app |
| New York first | `RedesignBiz/marketing/context/us_market.md` |

## 3. What was deliberately left out

- **The internal lead-to-sale count.** Archived Brisa material records 42,851
  leads against 6,540 tire sales. It measures a different thing over a different
  window than the published 32% ratio, and putting both anywhere near each other
  invites a question nobody wants to answer on a sales call. It is not in the
  codebase at all, and there is a comment in `site.ts` saying so.
- **Every percentage from the archived blog drafts.** Drive → LeadHanger →
  "Blog Posts" has twelve English SEO articles carrying figures like "boosting
  submissions by 25%" and "reducing form abandonment by 20%". None are sourced.
  The articles are still usable as a content pipeline, but the numbers need
  stripping or substantiating first.
- **The `crok.docx` sales strategy.** AI-generated, targets Turkish SMBs and
  e-commerce, and proposes $29/$99 monthly self-service pricing that contradicts
  the three-week and ten-week setup times in the service-level sheet. Ignored.
- **Client logos.** Bridgestone is named in prose because the case study is
  public and linked. No brand marks are used, because nobody has cleared them
  for use on this site.

## 4. Open items

Blocking, in the order they block:

1. **Brand assets.** No LeadHanger logo exists in any archive;
   `RedesignBiz/assets/Product/` is empty. The mark on the site is a placeholder
   drawn for this build. See `docs/images.md`.
2. **Legal review of the privacy notice.** `/privacy` is a draft written to match
   what the site and the app actually do. Several of its claims depend on both
   staying as built (no cookies or analytics on the site, one form with the
   fields it lists, no location or analytics in the app). Each is called out in a comment at the top of
   `src/app/privacy/page.tsx`.
3. **Account deletion by request, as in Yeni Müşterim.** `/privacy`, `/support`
   and `/delete-account` are the pages App Review reads (the first two are the
   Privacy Policy and Support URLs in App Store Connect). The app has no
   sign-up and no delete button; deletion is by email request, completed within
   the period in item 4 (decided November 4, 2026). Two things to watch:
   - Apple's guideline 5.1.1(v) asks for in-app deletion when an app supports
     account creation, and owners can create staff accounts in the app. If App
     Review reads that as account creation, the smallest fix is a link from the
     Account tab to `/delete-account`.
   - The deletion procedure is manual until the backend has a deletion job. It
     must do what `/delete-account` says: delete the account, its push tokens
     and location links, and anonymize the user in lead and phone-view records.
4. **Deletion period. Open, not confirmed.** `/privacy` and `/delete-account`
   promise that a deletion request is completed within 30 days and that backups
   roll over within 30 days after that. Both figures live in `site.retention`
   in `src/lib/site.ts`, and that is the only place to change them. The backup
   figure matches today's database setting (`DB_RETAINED_BACKUPS` in
   `brisa-backend/deployment/config.sh`). The 30-day completion has no
   deletion job behind it, only a manual procedure. Confirm both with the
   backend team before the pages go live.
5. **Microsoft Clarity package in the app. Open.** The native SDK is switched
   off since October 12, 2026 but still bundled in `brisa-frontend/dealer-mobile`,
   so it ships in the App Store build. The decision:
   - Remove it before the App Store build (recommended). No behaviour change,
     since it never starts. The web build's Clarity script is separate and
     unaffected. The store build needs a version bump, as every store build
     does under that app's OTA setup.
   - Or switch it on. Then it records sessions, and Apple's guideline 2.5.14
     asks for explicit consent and a visible indication while recording.
     `/privacy` and the App Privacy answers must say so, and masking must be
     Strict, because screens show customers' names and phone numbers.

   PostHog is planned to replace it. The same applies to PostHog's session
   replay. Event analytics without replay needs only `/privacy` and the App
   Privacy answers updated.
6. **Before the App Store submission, in the app.** Give App Review a working
   demo account, and make the App Privacy answers in App Store Connect match
   the "What the app collects" section of `/privacy`. Use Apple's standard EULA
   until there are terms of our own (decided November 4, 2026).
7. **Consent wording for US outbound calling.** The platform captures consent and
   passes the record with the lead. What a US dealer needs before dialling is a
   different question, and it varies by state and by contact method. The FAQ
   answer stops at what the platform does and hands the wording to the client's
   counsel. Worth a proper answer before the first US deal, because it will be
   asked.
8. **The audit form's destination and calendar. Open.** `/audit`, the free
   Lead Response Audit, is the site's main action since November 6, 2026:
   the header, the vertical pages, the hero story's end card and the closing
   sections of the home page, `/plans` and `/integrations` lead there. The form
   posts each request to `/api/audit`, which forwards it as JSON to the
   address in `AUDIT_FORWARD_URL`. Nothing is connected yet:
   - Decide what receives the requests. The website brief's interim plan is
     an email to the team and a row in a table, until the intake API on the
     US demo account can take them as LeadHanger leads. Name that service in
     `/privacy` under "Disclosure of information", then set
     `AUDIT_FORWARD_URL` in Vercel.
   - Until then, in production the form says it could not send the request
     and offers the same details as an email to sales, so nothing is lost but
     nothing is stored. In development the route logs the request and shows
     the second step.
   - The second step, open times for a 20-minute call, is a placeholder until
     the booking tool is chosen.
   - Every main action leads to `/audit` (November 6, 2026), and "Book an
     Intro" is gone. Mail to sales remains only where the brief has its own
     buttons: the plan cards' "Talk to sales" and "Ask about a free 60-day
     pilot", and the pilot button on the vertical pages.

Not blocking, but wanted:

9. **Data region. Open, not decided.** The backend that exists today runs in
   Google Cloud europe-west3 (Frankfurt). The growth plan and the website
   brief in Drive expect a US region for US customers in Phase 1, and the
   plan's Phase 0 architecture decision (November 13, 2026) is where it gets
   settled. Until then `/trust` says nothing about the region:
   `site.dataRegions` in `src/lib/site.ts` is empty, and the page leaves the
   section out. Once decided, list the regions there (more can be added
   later). The hosting provider is still unnamed, on `/privacy` and `/trust`.
10. **Real product imagery.** The hero visual is drawn in markup. There are three
    demo videos in Drive, including a Mavis-branded one, and the live dashboard
    at `app.leadhanger.com` can be captured. Until the English screens from
    the US demo account (December 4, 2026), the product screens on the
    vertical pages, `/how-it-works`, `/dealer-app`, `/brand-dashboard` and the
    ad landing pages are English mockups drawn from the product's own layout
    (since November 6, 2026; `src/lib/screens.ts`, `docs/images.md`). The
    case study's three screens stay placeholders until the client's
    permission. The dealer app's App Store and
    Google Play badges wait for the US app's approval. "See a 2-minute demo"
    in the hero goes to the home page's video until the 2-minute demo exists.
11. **What `/trust` does not answer yet.** The page is written for the
    buyer's IT, security and legal reviewer, and states only what the platform
    does today. These are left out until they are true or decided, and this
    reader will ask about each:
    - **SOC 2.** No report and no roadmap yet. A target date and report type
      (Type I first, then Type II) would let the page say something.
    - **Encryption at rest.** State it once the hosting provider is named.
    - **Data region.** See item 9.
    - **SSO or multi-factor sign-in, and a DPA.** Neither exists that we know
      of.
    - **A downloadable security overview.** The persona's action is to
      download a document. Generate it from the same content as `/trust`
      so the two never drift, and keep it ungated: a form would change
      `/privacy`.

    Shown since November 6, 2026 as the brief lists them: the consent log for
    each lead, and masked calling with SHAKEN/STIR, Voice Integrity and CNAM,
    marked "launching December" (the US demo). The site follows the website
    brief as written and keeps December features rather than leaving them
    out; the label goes only where the brief's confirmation list (p.31) asks
    for it, so the consent log carries none. Neither exists in `brisa-backend` yet (checked November
    5, 2026): the chat asks for consent but stores no consent field with the
    request, and calls go out on the dealer's own number. Once the consent log
    is stored, rewrite the "GDPR/KVKK-compliant consent" line in
    `src/components/HowItWorks.tsx` for a US reader. Integrations moved to
    `/integrations` (the product team confirms the labels; section 5).
12. **Analytics decision.** Adding any invalidates the "no tracking" section.
13. **Pages built ahead of their content** (November 6, 2026; kept on their
    branch until the content is in, as decided that day):
    - `/insights` is a skeleton marked "Work in progress", not indexed and not
      in the sitemap. The first two pieces (the LinkedIn article "Half of your
      dealer leads never get a phone call" and the routing test findings) are
      due December 11, 2026. Twelve archived drafts can follow once their
      unsourced figures are removed.
    - `/case-studies/brisa` follows the brief's outline in an anonymous
      version ("a leading tire manufacturer"), not indexed, until Brisa's
      written permission. Its figures are the brief's, marked "to verify";
      what the local data confirms and what it does not is in the page's
      comment. The address still carries the client's name.
    - `/lp/windows` and `/lp/tires` are complete. Their proof lines name the
      client anonymously, and the dealer count ("47 dealers in 20 regions") is
      marked "to verify". Google Ads is planned to start November 9,
      2026. The form records the ad's UTM parameters and click ID. `/privacy`
      says the click ID goes back to Google when a click leads to a request
      (an offline conversion), and nothing else from the form; the upload
      itself is not built. Counsel should confirm this against the notice's
      "we do not share it for cross-context behavioral advertising" (item 2).

## 5. Things to verify with the product team

Claims on the site that read as fact and were taken from documents rather than
from the running system:

- "One line of script" for installation (the home page's How it works). The
  website brief says the embeddable component ships in Phase 1.
- On `/plans` (`src/lib/plans.ts`), values taken from the website brief (Drive,
  November 3, 2026) rather than from the running system:
  - onboarding times: Starter "Self-serve, 1 day", Business "10 days",
    Enterprise "4 to 6 weeks";
  - Business routing "by region, ZIP code, brand and tier";
  - Enterprise "Full lead operations and dealer scorecard" and the white-label
    app;
  - a free 60-day pilot, and integrations "in place within 30 days" of an
    annual contract (also on `/integrations`).

  Features the brief itself marks as not live carry a label on the page
  ("Planned", "Launching December", "January 2027").
- On the product pages (`src/lib/product.ts`, `src/app/how-it-works`), taken
  from the website brief's outline (p.20) and not from the running system:
  the dealer scorecard and a regional manager view in the brand dashboard;
  and the four metric definitions under "How we measure" on
  `/how-it-works` (response time, follow-up rate, appointment rate, reassigned
  lead), which are ours, with the answers to the three general questions on
  the same page (`productFaqs`). The brief's confirmation list (p.31) already
  confirms multi-location dealer accounts with roles, and call center entry.
- Proof lines (brief p.25: every section opens with a claim and a proof), on
  the product pages, the ad landing pages and the case study. The client is
  named anonymously through `site.reference` in `src/lib/site.ts`, one place
  to change when permission arrives. They use the four published metrics as
  they are, and the brief's October 2026 figures framed as "to verify" until
  checked against the client's monthly reports.

Settled since: reassignment on timeout is part of LeadHanger generally, not one
client's configuration (website brief, November 3, 2026). The Lite, Pro and
Custom claims went with `/our-solution`, which now redirects to `/plans`.
