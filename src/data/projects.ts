export type Category = 'business' | 'ecommerce' | 'landing' | 'webapp'

export interface CategoryMeta {
  label: string
  short: string
  description: string
  accent: string
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  business: {
    label: 'Business & Brochure Sites',
    short: 'Business Sites',
    description:
      'Clean, credible sites that give a business a professional home online — services, story, and a clear way to get in touch.',
    accent: '#9c7a50',
  },
  ecommerce: {
    label: 'E-Commerce Stores',
    short: 'E-Commerce',
    description:
      "Full online stores built to actually sell — product catalogs, secure checkout, and a backend that's easy to manage.",
    accent: '#6888a0',
  },
  landing: {
    label: 'Landing Pages',
    short: 'Landing Pages',
    description:
      'Focused, fast-loading single pages built around one goal — a signup, a booking, a launch.',
    accent: '#6d7d63',
  },
  webapp: {
    label: 'Web Apps & Custom Builds',
    short: 'Web Apps',
    description:
      'Beyond a brochure site — small tools and dashboards built around a specific workflow.',
    accent: '#a8838e',
  },
}

export const ALL_CATEGORIES: Category[] = ['business', 'ecommerce', 'landing', 'webapp']

export interface Project {
  id: string
  title: string
  domain: string
  tagline: string
  category: Category
  year: number
  timeline: string
  techStack: string[]
  summary: string
  goal: string
  solution: string
  features: string[]
  status: 'concept'
  mockupLayout: 'grid' | 'list' | 'single'
}

export const PROJECTS: Project[] = [
  {
    id: 'meridian-co',
    title: 'Meridian & Co.',
    domain: 'meridianand.co',
    tagline: 'Architecture studio',
    category: 'business',
    year: 2026,
    timeline: '3 weeks',
    techStack: ['React', 'Tailwind CSS', 'Sanity CMS'],
    summary:
      'A brochure site for a two-person architecture studio, built around large-format project photography and a simple enquiry path.',
    goal: 'Give a small studio a portfolio site that feels as considered as their buildings — without needing a developer for every update.',
    solution:
      'A CMS-driven project grid so new work can be added without touching code, paired with a restrained layout that puts the photography first.',
    features: [
      'Editable project portfolio via CMS',
      'Studio & team page',
      'Enquiry form with project brief fields',
      'Optimized loading for large photography',
    ],
    status: 'concept',
    mockupLayout: 'grid',
  },
  {
    id: 'aurelia-dental',
    title: 'Aurelia Family Dental',
    domain: 'aureliafamilydental.com',
    tagline: 'Local dental clinic',
    category: 'business',
    year: 2025,
    timeline: '2 weeks',
    techStack: ['React', 'Tailwind CSS'],
    summary:
      'A friendly, trust-building site for a family dental practice with online appointment requests.',
    goal: 'Replace an outdated site that made new patients call instead of book, and looked dated next to competing practices.',
    solution:
      'A warm, simple layout led by an appointment-request form above the fold, with clear service pages and staff bios to build trust before the first visit.',
    features: [
      'Online appointment request form',
      'Service & insurance information pages',
      'Staff bio section',
      'Mobile-first layout for on-the-go booking',
    ],
    status: 'concept',
    mockupLayout: 'list',
  },
  {
    id: 'sable-and-grain',
    title: 'Sable & Grain',
    domain: 'sableandgrain.shop',
    tagline: 'Home goods & ceramics store',
    category: 'ecommerce',
    year: 2026,
    timeline: '6 weeks',
    techStack: ['React', 'Stripe', 'Tailwind CSS', 'Sanity CMS'],
    summary: 'A full online store for a small-batch ceramics and home goods brand.',
    goal: 'Move a maker off a marketplace platform and onto a store she fully owns, without losing the handmade feel of the brand.',
    solution:
      'A custom storefront with Stripe checkout, a CMS for adding new drops without developer help, and product photography treated as the hero of every page.',
    features: [
      'Full product catalog with variants',
      'Stripe-powered checkout',
      'Inventory & low-stock indicators',
      'Drop / collection landing pages',
    ],
    status: 'concept',
    mockupLayout: 'grid',
  },
  {
    id: 'northfield-supply',
    title: 'Northfield Supply Co.',
    domain: 'northfieldsupply.co',
    tagline: 'Outdoor gear retailer',
    category: 'ecommerce',
    year: 2025,
    timeline: '7 weeks',
    techStack: ['React', 'Stripe', 'TypeScript'],
    summary:
      'A performance-focused store for an outdoor gear retailer expanding beyond a single physical shop.',
    goal: 'Launch a store that could handle a real product catalog and seasonal traffic spikes without slowing down.',
    solution:
      'A lightweight, image-optimized storefront with fast filtering and search, built to stay quick even as the catalog grows.',
    features: [
      'Filterable product catalog & search',
      'Secure checkout & payments',
      'Size / variant selection',
      'SEO-optimized product pages',
    ],
    status: 'concept',
    mockupLayout: 'grid',
  },
  {
    id: 'launchbay',
    title: 'Launchbay',
    domain: 'launchbay.io',
    tagline: 'SaaS product launch',
    category: 'landing',
    year: 2026,
    timeline: '1 week',
    techStack: ['React', 'Tailwind CSS'],
    summary: 'A single-page launch site for a project-management SaaS, built to convert waitlist signups.',
    goal: 'Get a landing page live before a product demo day, built around one action: joining the waitlist.',
    solution:
      'A fast, focused single page — clear headline, product mockup section, feature highlights, and one persistent signup form.',
    features: [
      'Waitlist signup form',
      'Feature highlight sections',
      'Responsive product mockup section',
      'Lightweight, fast-loading build',
    ],
    status: 'concept',
    mockupLayout: 'single',
  },
  {
    id: 'fig-tree-bakery',
    title: 'The Fig Tree Bakery',
    domain: 'figtreebakery.com',
    tagline: 'Neighborhood bakery',
    category: 'landing',
    year: 2025,
    timeline: '1 week',
    techStack: ['React', 'Tailwind CSS'],
    summary: 'A single-page site for a neighborhood bakery covering hours, menu, and location.',
    goal: 'Give a bakery with no website a simple, warm online presence that answers what customers actually ask: what, where, when.',
    solution:
      'One scrollable page — menu highlights, hours, location, and a contact link — with nothing to slow a hungry visitor down.',
    features: [
      'Menu highlights section',
      'Hours & location with map embed',
      'Mobile-first single-page layout',
      'Simple contact / order-ahead link',
    ],
    status: 'concept',
    mockupLayout: 'single',
  },
  {
    id: 'roster',
    title: 'Roster',
    domain: 'useroster.app',
    tagline: 'Staff scheduling tool',
    category: 'webapp',
    year: 2026,
    timeline: '5 weeks',
    techStack: ['React', 'TypeScript', 'Supabase'],
    summary: 'An internal scheduling tool built for a small retail team to replace a shared spreadsheet.',
    goal: 'Replace a shared spreadsheet that kept getting double-booked and was hard to check from a phone.',
    solution:
      'A small web app with a shift calendar, swap requests, and mobile-friendly views, built around how the team actually works.',
    features: [
      'Shift calendar with drag-to-edit',
      'Shift swap requests',
      'Role-based access for managers vs. staff',
      'Mobile-friendly schedule view',
    ],
    status: 'concept',
    mockupLayout: 'list',
  },
  {
    id: 'pantry',
    title: 'Pantry',
    domain: 'trypantry.app',
    tagline: 'Recipe & meal-planning app',
    category: 'webapp',
    year: 2025,
    timeline: '4 weeks',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    summary: "A recipe-saving and meal-planning tool built for a food blogger's audience.",
    goal: 'Give readers a way to save recipes from the blog and build a weekly meal plan without leaving the site.',
    solution:
      'A lightweight app layer on top of the existing blog — save, tag, and drag recipes into a weekly planner that generates a shopping list.',
    features: [
      'Recipe saving & tagging',
      'Drag-and-drop weekly planner',
      'Auto-generated shopping list',
      'Synced with existing blog content',
    ],
    status: 'concept',
    mockupLayout: 'grid',
  },
]

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id)
}

export function getProjectsByCategory(c: Category): Project[] {
  return PROJECTS.filter((p) => p.category === c)
}
