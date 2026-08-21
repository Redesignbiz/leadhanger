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
   what the site actually does. Two of its claims depend on the site staying as
   built: no cookies or analytics, and no form. Both are called out in a comment
   at the top of `src/app/privacy/page.tsx`.
3. **Consent wording for US outbound calling.** The platform captures consent and
   passes the record with the lead. What a US dealer needs before dialling is a
   different question, and it varies by state and by contact method. The FAQ
   answer stops at what the platform does and hands the wording to the client's
   counsel. Worth a proper answer before the first US deal, because it will be
   asked.
4. **Demo CTA.** Today it is a `mailto:`. A scheduling link or a real form would
   convert better. One place to change: `src/components/Demo.tsx`.

Not blocking, but wanted:

5. **Real product imagery.** The hero visual is drawn in markup. There are three
   demo videos in Drive, including a Mavis-branded one, and the live dashboard at
   `app.leadhanger.com` can be captured.
6. **Named hosting provider** in the privacy notice, once deployment is settled.
7. **Analytics decision.** Adding any invalidates the "no tracking" section.
8. **The blog.** Twelve drafts exist. A `/insights` route would give the site
   something to rank on beyond the one page.

## 5. Things to verify with the product team

Claims on the site that read as fact and were taken from documents rather than
from the running system:

- "One line of script" for installation.
- AI-assisted lead matching on the Custom tier, worded as the service-level sheet
  words it.
- Customer follow-up by text or email on Pro and Custom.
- Self-service APIs on Pro for both CRM and CX operations.
- That the reassignment-on-timeout behaviour is part of LeadHanger generally, not
  only that one client's configuration.
