/**
 * SUBSCRIPTION PLANS
 * ---------------------------------------------------------------------------
 * Pricing shown on /courses. Edit names, prices and features here — nothing
 * else needs to change.
 *
 * `features` is intentionally empty for now. Each card renders correctly with
 * an empty list; add strings and they appear automatically, e.g.
 *
 *     features: ['All student courses', 'Certificates', 'Worksheets'],
 *
 * Use `notIncluded` for greyed-out items you want to show as excluded.
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
    tagline: '',
    features: [],
    notIncluded: [],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    id: 'basic-student',
    name: 'Basic Student',
    price: 3,
    tagline: '',
    features: [],
    notIncluded: [],
    cta: 'Choose Basic',
    highlighted: false,
  },
  {
    id: 'pro-student',
    name: 'Pro Student',
    price: 5,
    tagline: '',
    features: [],
    notIncluded: [],
    cta: 'Choose Pro',
    // Draws the eye to the middle option — change to another plan, or remove
    // from every plan, as you prefer.
    highlighted: true,
    badge: 'Most popular',
  },
  {
    id: 'premium-student',
    name: 'Premium Student',
    price: 6,
    tagline: '',
    features: [],
    notIncluded: [],
    cta: 'Choose Premium',
    highlighted: false,
  },
]

export function getPlan(id) {
  return plans.find((plan) => plan.id === id) || null
}

/** "Free" for a zero price, otherwise "3 KWD". */
export function formatPrice(plan) {
  if (!plan) return ''
  return plan.price === 0 ? 'Free' : `${plan.price} ${currency}`
}