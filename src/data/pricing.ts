export interface Tier {
  id: string
  name: string
  priceFrom: number
  tagline: string
  features: string[]
  timeline: string
  highlighted?: boolean
}

export const TIERS: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceFrom: 750,
    tagline: 'A clean, professional site to get a small business online.',
    features: [
      'Up to 3 pages',
      'Mobile-responsive design',
      'Contact form',
      'Basic on-page SEO setup',
      '1 round of revisions',
    ],
    timeline: '1–2 weeks',
  },
  {
    id: 'business',
    name: 'Business',
    priceFrom: 1800,
    tagline: 'For growing businesses that need more room to tell their story.',
    features: [
      'Up to 8 pages',
      'Easy-update CMS or blog',
      'Contact & booking forms',
      'On-page SEO optimization',
      '2 rounds of revisions',
    ],
    timeline: '3–4 weeks',
    highlighted: true,
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    priceFrom: 3200,
    tagline: 'A full online store, ready to take orders from day one.',
    features: [
      'Full product catalog',
      'Secure checkout & payments',
      'Inventory basics',
      'SEO + performance tuning',
      '3 rounds of revisions',
    ],
    timeline: '5–7 weeks',
  },
]

export const ADD_ONS: { label: string; note: string }[] = [
  { label: 'Logo & brand basics', note: 'For businesses starting from scratch' },
  { label: 'Copywriting', note: 'Page content written and edited for you' },
  { label: 'Ongoing maintenance', note: 'Monthly retainer for updates & support' },
  { label: 'Rush delivery', note: 'A compressed timeline when you need it faster' },
]

export const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: "What if my project doesn't fit these tiers?",
    a: "Most projects don't fit a box perfectly — these are starting points, not fixed menus. Tell me what you need and I'll send a tailored quote.",
  },
  {
    q: 'Do I own the website?',
    a: 'Yes. Once final payment is made, all source files and content are handed over — no lock-in, no recurring platform fee to me.',
  },
  {
    q: 'Is hosting or a domain included?',
    a: "Not in the base price, but I'll help you set both up and walk you through the ongoing cost (typically $5–20/month).",
  },
  {
    q: 'How does payment work?',
    a: 'A 50% deposit to begin work, with the remaining 50% due on completion, before final handover.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Light support is included for 30 days after handover, with an optional monthly retainer available after that.',
  },
]
