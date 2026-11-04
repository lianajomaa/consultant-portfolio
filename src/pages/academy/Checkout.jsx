/**
 * CHECKOUT  —  /checkout/:planId
 *
 * A holding page until payments are wired up. It confirms which plan the
 * learner picked, states plainly that payment isn't live yet, and gives them
 * a way to get in touch.
 *
 * It deliberately does NOT ask for card details, and it does NOT grant access
 * to paid content — doing either before a real payment system exists would be
 * dishonest to the learner.
 *
 * WHEN PAYMENTS GO LIVE: replace the notice block below with the provider's
 * checkout (Stripe, Tap, MyFatoorah). `plan.id` is the key you map to the
 * provider's price ID. Access must be granted by your server after the
 * provider confirms payment — never here in the browser.
 */

import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import { getPlan, formatPrice } from '../../data/plans'

function Checkout() {
  const { planId } = useParams()
  const plan = getPlan(planId)

  /* unknown plan in the URL */
  if (!plan) {
    return (
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-3xl font-medium text-navy">Package not found</h1>
          <p className="mt-3 text-sm text-navy/70">
            That package doesn&apos;t exist or has been renamed.
          </p>
          <Link
            to="/courses#pricing"
            className="mt-7 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white"
          >
            View packages
          </Link>
        </div>
      </section>
    )
  }

  const isFree = plan.price === 0

  return (
    <section className="px-8 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-2xl">

        <Link
          to="/courses#pricing"
          className="inline-flex items-center gap-2 text-[13px] text-navy/70 hover:underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to packages
        </Link>

        <h1 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-tight text-navy md:text-4xl">
          {isFree ? 'Start learning for free' : 'Complete your enrolment'}
        </h1>

        {/* order summary */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 md:p-7">
          <p className="text-[11px] tracking-[0.18em] text-navy/50">SELECTED PACKAGE</p>

          <div className="mt-3 flex items-baseline justify-between gap-4">
            <span className="text-lg font-medium text-navy">{plan.name}</span>
            <span className="font-serif text-2xl font-medium text-navy">
              {formatPrice(plan)}
            </span>
          </div>

          {plan.tagline && (
            <p className="mt-2 text-[13px] leading-relaxed text-navy/70">{plan.tagline}</p>
          )}

          {plan.features.length > 0 && (
            <ul className="mt-5 space-y-1.5 border-t border-slate-100 pt-5">
              {plan.features.map((feature) => (
                <li key={feature} className="text-[13px] text-navy/75">
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* free plan needs no payment at all */}
        {isFree ? (
          <div className="mt-8">
            <p className="text-sm leading-relaxed text-navy/80">
              No payment needed. Head straight to the courses and begin.
            </p>
            <Link
              to="/courses"
              className="mt-6 inline-block rounded-md bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-navy/90"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            {/* ---- replace this block with the real checkout ---- */}
            <div className="mt-8 rounded-xl border border-navy/20 bg-baby/40 p-6 md:p-7">
              <h2 className="text-base font-medium text-navy">
                Online payment isn&apos;t available yet
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-navy/80">
                We&apos;re still setting up secure online payments. In the meantime, get in
                touch and we&apos;ll arrange your enrolment directly.
              </p>

              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
              >
                <Mail size={15} aria-hidden="true" />
                Contact us about {plan.name}
              </Link>
            </div>

            <p className="mt-5 text-[12px] leading-relaxed text-navy/55">
              You haven&apos;t been charged, and no payment details have been collected
              on this page.
            </p>
          </>
        )}
      </div>
    </section>
  )
}

export default Checkout