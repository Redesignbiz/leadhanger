/**
 * Single source of truth for every fixed value on the site.
 *
 * Anything a stakeholder might want to change without touching a component
 * lives here: names, addresses, the four published metrics, plan tiers.
 * Fields marked TODO are waiting on a real answer and are listed in
 * `docs/leadhanger-us-brief.md` so none of them ships as a placeholder by
 * accident.
 */
export const site = {
  name: 'LeadHanger',
  /** Product's own one-liner. Source: Drive "LLM Agent setup" (LeadBot prompt). */
  tagline: 'The bridge from digital to physical sales',
  description:
    'LeadHanger qualifies website visitors in a real conversation, captures consent, ' +
    'and routes each lead to the right dealer in real time. Built for brands that sell ' +
    'through a dealer, agent, or service network.',

  url: 'https://www.leadhanger.com',

  /** Shown in the nav and repeated in the closing section. */
  cta: 'Book a demo',

  contact: {
    /**
     * The address already published on the current leadhanger.com placeholder,
     * so inbound mail keeps landing in the same inbox after this page replaces it.
     */
    sales: 'newyork@redesignbiz.com',
    privacy: 'newyork@redesignbiz.com',
  },

  /**
   * Published outcome metrics. These four, and only these four, are cleared for
   * external use — they are the numbers already live on the Redesign Business
   * Bridgestone case study.
   *
   * Do NOT add internal figures here. The raw Brisa lead-to-sale count that
   * appears in internal archives measures a different thing over a different
   * window and would contradict the published ratio.
   */
  metrics: [
    {
      value: '32%',
      short: 'lead-to-sale',
      label: 'Lead-to-sale ratio across the dealer network',
    },
    {
      value: '40%',
      short: 'faster dealer response',
      label: 'Faster dealer response to digital leads',
    },
    {
      value: '50%',
      short: 'qualified leads',
      label: 'Qualified lead ratio across the platform',
    },
    {
      value: '10K+',
      short: 'parties worldwide',
      label: 'Parties worldwide operating on LeadHanger',
    },
  ],

  /** Reference case study, hosted on the Redesign Business site. */
  caseStudy: {
    client: 'Bridgestone',
    href: 'https://www.redesignbiz.com/work/bridgestone/',
  },

  /**
   * New York first. US buyers ask "are you really here?", and the market brief
   * (RedesignBiz/marketing/context/us_market.md) is explicit that the New York
   * presence belongs above the fold of the conversation, not in the footer.
   */
  offices: [
    { city: 'New York', detail: 'New York Metro Area' },
    { city: 'Istanbul', detail: 'Buyaka Kule 3, Umraniye' },
  ],

  /** Operator of the platform and the legal entity named in the privacy notice. */
  company: {
    legalName: 'Redesign Business LLC',
    shortName: 'Redesign Business',
    href: 'https://www.redesignbiz.com',
  },

  /** TODO: confirm with counsel before launch. See docs/leadhanger-us-brief.md. */
  privacyUpdatedAt: '2026-08-21',
  privacyUpdatedLabel: 'August 21, 2026',
} as const;
