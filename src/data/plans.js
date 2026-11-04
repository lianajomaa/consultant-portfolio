/**
 * SUBSCRIPTION PLANS
 * ---------------------------------------------------------------------------
 * Pricing shown on /courses. Edit names, prices and features here — nothing
 * else needs to change.
 *
 * Feature lists are taken from the business model in the investor proposal:
 * Free (acquisition funnel) → Paid (full courses) → Premium (advanced paths
 * and full library), with B2B handled separately below as it isn't a
 * per-student price point.
 *
 * `notIncluded` renders greyed-out with a cross, for things a tier excludes.
 *
 * When payments are added, `id` becomes the key you map to a Stripe price ID.
 * ---------------------------------------------------------------------------
 */

export const currency = 'KWD'

export const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    tagline: 'Try the platform before you commit.',
    features: [
      'Selected lessons',
      'Basic resources',
      'Course previews',
    ],
    notIncluded: [
      'Certificates',
      'Full course library',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    id: 'basic-student',
    name: 'Basic Student',
    price: 3,
    tagline: 'Full access to the core course.',
    features: [
      'One full course',
      'AI and research skills',
      'Worksheets and quizzes',
      'Certificate of Completion',
    ],
    notIncluded: [
      'Full course library',
    ],
    cta: 'Choose Basic',
    highlighted: false,
  },
  {
    id: 'pro-student',
    name: 'Pro Student',
    price: 5,
    tagline: 'Everything you need across both paths.',
    features: [
      'Everything in Basic',
      'Prompt engineering course',
      'Communication modules',
      'Downloadable templates',
      'Certificates on every course',
    ],
    notIncluded: [],
    cta: 'Choose Pro',
    // Draws the eye to the middle option — move or remove as you prefer.
    highlighted: true,
    badge: 'Most popular',
  },
  {
    id: 'premium-student',
    name: 'Premium Student',
    price: 6,
    tagline: 'The full library, plus everything new.',
    features: [
      'Everything in Pro',
      'Advanced learning paths',
      'Full course library',
      'Premium resources',
      'New courses as released',
    ],
    notIncluded: [],
    cta: 'Choose Premium',
    highlighted: false,
  },
]

/**
 * B2B and institutions — deliberately not a card in the pricing grid.
 * Corporate and university deals are quoted, not bought off a page, so this
 * renders as a contact strip underneath the plans.
 */
export const institutions = {
  title: 'For universities and organisations',
  description:
    'Corporate packages, university partnerships and employee training, priced to fit your team.',
  features: [
    'Corporate packages',
    'Universities',
    'Educational partners',
    'Employee training',
  ],
  cta: 'Talk to us',
}

export function getPlan(id) {
  return plans.find((plan) => plan.id === id) || null
}

/** "Free" for a zero price, otherwise "3 KWD". */
export function formatPrice(plan) {
  if (!plan) return ''
  return plan.price === 0 ? 'Free' : `${plan.price} ${currency}`
}