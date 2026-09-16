// Default (source) values for the small set of public-page text fields the
// admin "Developer Mode" content manager is allowed to edit. This is the
// single source of truth for what "editable website content" means in this
// project — it intentionally does not cover every string on every page,
// only the marketing copy the public components already read as data
// rather than as inline JSX (see `siteContentStore.js` for how an admin's
// saved changes are layered on top of these defaults).
//
// Each page entry has two parts:
//   - `fields`   — the default copy, in the exact shape the public pages
//                  read at render time.
//   - `schema`   — presentation metadata for the Developer Mode editor
//                  (label + input type per field). Never used by public
//                  pages, only by the admin UI that generates the form.

export const defaultSiteContent = {
  home: {
    ctaHeading: 'Find somewhere worth staying for.',
    ctaDescription:
      "Browse current residences, or speak with someone who knows the market you're interested in.",
    ctaPrimaryLabel: 'Explore Properties',
    ctaSecondaryLabel: 'Speak With an Expert',
  },
  buy: {
    heroEyebrow: 'For Sale',
    heroHeading: 'Discover A Home Worth Owning.',
    heroDescription:
      'A curated set of Veyra residences for sale across our represented cities — from converted lofts to gated estates, each one considered before it ever reaches this page.',
    // Empty string = no override; the page falls back to its own computed
    // default (the first "Buy" listing's image — see BuyHero.jsx). Only
    // ever set from Section 5 (Media / Content Settings) below, never from
    // the free-text Content Editor.
    heroImage: '',
  },
  rent: {
    heroEyebrow: 'For Rent',
    heroHeading: 'Find A Place That Feels Entirely Yours.',
    heroDescription:
      'A curated set of Veyra residences available to lease across our represented cities — from pre-war apartments to waterfront villas, each one move-in ready and professionally managed.',
    heroImage: '',
  },
  agents: {
    heading: 'The people behind every address.',
    description:
      'Veyra is represented by a small group of advisors, each one embedded in a single market rather than spread across many. They know the buildings, the streets, and often the sellers, long before a property is ever listed.',
  },
  about: {
    heroHeading: 'Real estate, held to a higher standard.',
    heroDescription:
      'Veyra represents a small collection of exceptional homes and the people who buy, sell and love them — guided by patience, local knowledge and a genuine point of view.',
    introHeading: 'Founded on a simple idea.',
    introText:
      'Founded by a team of architects and agents, Veyra has spent over a decade building relationships in the cities we serve, rather than simply listing what happens to be available.',
    philosophyHeading: 'Four ideas that shape how we work.',
    philosophyText:
      'None of this is complicated. It simply means slowing down at the moments that matter, on both sides of a transaction.',
  },
  contact: {
    heroHeading: 'Begin a more considered property conversation.',
    heroDescription:
      "Whether you're buying, selling or simply exploring what's possible, a Veyra advisor is glad to talk — in confidence, and at your pace.",
    ctaHeading: 'Not ready to write in?',
  },
  locations: {
    heading: 'A handful of cities, known intimately.',
    description:
      'Veyra represents property in a small number of markets by design — each one chosen for its character, and understood closely enough to guide a search that starts with the place, not just the listing.',
  },
}

// Presentation-only metadata for the Developer Mode editor. `key` matches a
// key in the matching `defaultSiteContent[page]` object; `type` is either
// 'text' (single-line) or 'textarea' (multi-line).
export const pageContentSchema = [
  {
    key: 'home',
    label: 'Home',
    description: 'The closing call-to-action shown at the bottom of the homepage.',
    fields: [
      { key: 'ctaHeading', label: 'CTA Heading', type: 'text' },
      { key: 'ctaDescription', label: 'CTA Description', type: 'textarea' },
      { key: 'ctaPrimaryLabel', label: 'Primary Button Label', type: 'text' },
      { key: 'ctaSecondaryLabel', label: 'Secondary Button Label', type: 'text' },
    ],
  },
  {
    key: 'buy',
    label: 'Buy',
    description: 'The hero section at the top of the Buy page.',
    fields: [
      { key: 'heroEyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'heroHeading', label: 'Hero Heading', type: 'text' },
      { key: 'heroDescription', label: 'Hero Description', type: 'textarea' },
      { key: 'heroImage', label: 'Hero Image', type: 'image' },
    ],
  },
  {
    key: 'rent',
    label: 'Rent',
    description: 'The hero section at the top of the Rent page.',
    fields: [
      { key: 'heroEyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'heroHeading', label: 'Hero Heading', type: 'text' },
      { key: 'heroDescription', label: 'Hero Description', type: 'textarea' },
      { key: 'heroImage', label: 'Hero Image', type: 'image' },
    ],
  },
  {
    key: 'agents',
    label: 'Agents',
    description: 'The page heading and supporting text on the Agents page.',
    fields: [
      { key: 'heading', label: 'Page Heading', type: 'text' },
      { key: 'description', label: 'Supporting Text', type: 'textarea' },
    ],
  },
  {
    key: 'about',
    label: 'About',
    description: 'The hero, introduction, and philosophy sections on the About page.',
    fields: [
      { key: 'heroHeading', label: 'Hero Heading', type: 'text' },
      { key: 'heroDescription', label: 'Hero Description', type: 'textarea' },
      { key: 'introHeading', label: 'Introduction Heading', type: 'text' },
      { key: 'introText', label: 'Introduction Text', type: 'textarea' },
      { key: 'philosophyHeading', label: 'Philosophy Heading', type: 'text' },
      { key: 'philosophyText', label: 'Philosophy Text', type: 'textarea' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact',
    description: 'The hero heading, supporting text, and closing CTA text on the Contact page.',
    fields: [
      { key: 'heroHeading', label: 'Hero Heading', type: 'text' },
      { key: 'heroDescription', label: 'Supporting Text', type: 'textarea' },
      { key: 'ctaHeading', label: 'CTA Text', type: 'text' },
    ],
  },
  {
    key: 'locations',
    label: 'Locations',
    description: 'The heading and supporting text on the Locations page.',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'description', label: 'Supporting Text', type: 'textarea' },
    ],
  },
]
