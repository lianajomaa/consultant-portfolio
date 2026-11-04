/**
 * PRICING SECTION — the subscription packages shown on /courses.
 *
 * Reads everything from data/plans.js. Cards render correctly whether or not
 * the feature lists have been filled in yet.
 *
 * Hover behaviour is deliberately restrained — a small lift and a shadow.
 * The brief asks for "professional + modern" and warns against excessive
 * animation, so nothing bounces or spins.
 */

import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { plans, currency, institutions } from '../../data/plans'

function PlanCard({ plan }) {
  const isFree = plan.price === 0

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-white p-6 transition-all duration-200 hover:-translate-y-1 md:p-7 ${
        plan.highlighted
          ? 'border-navy shadow-[0_4px_20px_-8px_rgba(16,42,67,0.35)] hover:shadow-[0_12px_32px_-10px_rgba(16,42,67,0.45)] lg:-mt-3 lg:mb-3'
          : 'border-slate-200 hover:border-navy/40 hover:shadow-[0_12px_28px_-14px_rgba(16,42,67,0.3)]'
      }`}
    >
      {/* accent bar on the featured plan */}
      {plan.highlighted && (
        <span
          className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-navy"
          aria-hidden="true"
        />
      )}

      {plan.badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-navy px-3 py-1 text-[10px] font-medium tracking-wide text-white shadow-sm">
          {plan.badge}
        </span>
      )}

      <h3 className="text-sm font-semibold uppercase tracking-wide text-navy/70">
        {plan.name}
      </h3>

      {plan.tagline && (
        <p className="mt-2 text-[13px] leading-relaxed text-navy/70">{plan.tagline}</p>
      )}

      {/* price */}
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="font-serif text-[2.75rem] font-medium leading-none text-navy">
          {isFree ? 'Free' : plan.price}
        </span>
        {!isFree && (
          <span className="text-sm font-medium text-navy/55">{currency}</span>
        )}
      </p>

      <div className="mt-6 h-px w-full bg-slate-100" />

      {/* features — hidden entirely while the list is empty */}
      {(plan.features.length > 0 || plan.notIncluded.length > 0) && (
        <ul className="mt-6 flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-[13px] leading-relaxed text-navy/80">
              <span
                className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-baby"
                aria-hidden="true"
              >
                <Check size={11} className="text-navy" />
              </span>
              {feature}
            </li>
          ))}
          {plan.notIncluded.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-[13px] leading-relaxed text-navy/35">
              <span
                className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-slate-100"
                aria-hidden="true"
              >
                <X size={11} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* keeps every card the same height while features are still empty */}
      {plan.features.length === 0 && plan.notIncluded.length === 0 && (
        <div className="min-h-[2.5rem] flex-1" />
      )}

      <Link
        to={`/checkout/${plan.id}`}
        className={`mt-7 rounded-lg px-5 py-3 text-center text-sm font-medium transition-colors duration-200 ${
          plan.highlighted
            ? 'bg-navy text-white hover:bg-[#1B3D5C]'
            : 'border border-navy/25 text-navy group-hover:border-navy group-hover:bg-navy group-hover:text-white'
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  )
}

function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-b border-slate-100 bg-slate-50 px-8 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[7px] w-[7px] border border-navy bg-baby" />
            <span className="text-xs tracking-[0.2em] text-navy">PACKAGES</span>
          </div>
          <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-navy md:text-4xl">
            Choose Your Package
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-navy/80 md:text-base">
            Start free, or unlock full access to the courses.
          </p>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* B2B — quoted, not bought off the page, so it isn't a priced card */}
        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-navy/15 bg-white p-7 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-xl">
            <h3 className="font-serif text-xl font-medium text-navy md:text-2xl">
              {institutions.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/75 md:text-sm">
              {institutions.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {institutions.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-1.5 text-[12px] text-navy/70"
                >
                  <Check size={13} className="flex-shrink-0 text-navy" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/contact"
            className="flex-shrink-0 rounded-lg bg-navy px-6 py-3 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1B3D5C]"
          >
            {institutions.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PricingSection