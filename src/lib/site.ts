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
  cta: 'Book an Intro',

  contact: {
    /**
     * The address already published on the current leadhanger.com placeholder,
     * so inbound mail keeps landing in the same inbox after this page replaces it.
     */
    sales: 'newyork@redesignbiz.com',
    /**
     * One role address on the product's own domain for support, privacy and
     * security (decided November 5, 2026). A city inbox on the operator's
     * domain read as a sales inbox to a buyer's IT reviewer.
     *
     * ⚠ The mailbox must exist before this ships: /support is the Support URL
     * in App Store Connect, and /privacy and /delete-account tell people to
     * write here. privacy@ or security@ can be added later as aliases of the
     * same mailbox; change the matching line here and nowhere else.
     */
    support: 'support@leadhanger.com',
    /** Printed on /privacy, /delete-account and the legal pages' contact box. */
    privacy: 'support@leadhanger.com',
    /** Printed on /trust, for questionnaires and vulnerability reports. */
    security: 'support@leadhanger.com',
  },

  /**
   * TODO: open item, not decided. See docs/leadhanger-us-brief.md.
   * Where the platform's data is stored, for /trust. Empty on purpose: the
   * backend that exists today runs in Google Cloud europe-west3 (Frankfurt),
   * while the growth plan and the website brief expect a US region for US
   * customers. /trust prints no data region while this list is empty. Once it
   * is decided, list the regions here (more can be added later) and nowhere
   * else.
   */
  dataRegions: [] as string[],

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

  /**
   * Reference case study, hosted on the Redesign Business site. The headline,
   * summary and cover are the ones on that site's portfolio card, copied
   * verbatim so the two never tell the story differently.
   */
  caseStudy: {
    client: 'Bridgestone',
    href: 'https://www.redesignbiz.com/work/bridgestone/',
    headline: 'Leads that actually close',
    summary:
      'A dealer platform that turned interest into action: 32% lead-to-sale, 40% faster response.',
    cover: '/images/bridgestone-case-study.webp',
    logo: '/images/bridgestone-logo.svg',
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
    /** As registered with D&B and Twilio (A2P 10DLC brand). */
    address: '112 Capitol Trail, Suite A950, Newark, DE 19711',
    href: 'https://www.redesignbiz.com',
  },

  /**
   * TODO: confirm with counsel before launch. See docs/leadhanger-us-brief.md.
   * Printed on /privacy and /delete-account. Move both values whenever either
   * page's text changes, to the day that version goes live. Last change:
   * November 5, 2026, the phone number log wording.
   */
  privacyUpdatedAt: '2026-11-05',
  privacyUpdatedLabel: 'November 5, 2026',

  /**
   * TODO: open item, not confirmed. See docs/leadhanger-us-brief.md.
   * Printed on /privacy and /delete-account. `deletionDays` is how long a
   * deletion request takes; there is no deletion job behind it yet, only a
   * manual procedure. `backupDays` is how long database backups are kept
   * (DB_RETAINED_BACKUPS in brisa-backend/deployment/config.sh) and must follow
   * that setting if it changes.
   */
  retention: {
    deletionDays: 30,
    backupDays: 30,
  },

  /** SMS Terms and the consent sample, published for the Twilio A2P 10DLC campaign. */
  smsUpdatedAt: '2026-11-03',
  smsUpdatedLabel: 'November 3, 2026',
} as const;
