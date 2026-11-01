/**
 * CERTIFICATE PAGE  —  /certificate/:slug
 * Specification section 17.
 *
 * "Download Certificate" opens the browser's print dialog, where the learner
 * chooses "Save as PDF". That is deliberate: it needs no PDF library, works on
 * every browser and phone, and prints at proper resolution. The print styles at
 * the bottom hide the site chrome so only the certificate itself comes out.
 */

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Award } from 'lucide-react'
import { getCourse } from '../../data/courses'
import { useProgress } from '../../context/ProgressContext'

function CertificatePage() {
  const { slug } = useParams()
  const course = getCourse(slug)

  const { getCertificate, getCourseProgress, issueCertificate, learner } = useProgress()
  const [copied, setCopied] = useState(false)

  if (!course) {
    return (
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-serif text-3xl font-medium text-navy">Certificate not found</h1>
          <Link
            to="/dashboard"
            className="mt-6 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white"
          >
            Back to dashboard
          </Link>
        </div>
      </section>
    )
  }

  const progress = getCourseProgress(course)
  let certificate = getCertificate(course.slug)

  // Course finished but the certificate was never claimed (e.g. the learner
  // navigated straight here) — issue it now.
  if (!certificate && progress.isComplete) {
    certificate = issueCertificate(course)
  }

  /* ---------- not earned yet ---------- */
  if (!certificate) {
    return (
      <section className="px-8 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Award size={32} className="mx-auto text-navy/30" aria-hidden="true" />
          <h1 className="mt-5 font-serif text-3xl font-medium text-navy md:text-4xl">
            Not yet earned
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-navy/75 md:text-base">
            Complete every lesson and pass the final assessment for{' '}
            <span className="font-medium text-navy">{course.title}</span> to earn your
            Certificate of Completion. You&apos;re {progress.percent}% of the way there.
          </p>

          <div className="mx-auto mt-7 max-w-sm">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={progress.percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-navy transition-all"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>

          <Link
            to={`/courses/${course.slug}`}
            className="mt-8 inline-block rounded-md bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-navy/90"
          >
            Back to course
          </Link>
        </div>
      </section>
    )
  }

  /* ---------- earned ---------- */
  const issued = new Date(certificate.issuedAt)
  const displayName = certificate.learnerName || learner.name

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: certificate.courseTitle, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // The learner dismissed the share sheet, or the clipboard was blocked.
      // Nothing to recover from — leave the page as it is.
    }
  }

  return (
    <section className="px-8 py-14 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl">

        <div className="text-center print:hidden">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-navy md:text-4xl">
            Congratulations!
          </h1>
          <p className="mt-3 text-sm text-navy/75 md:text-base">
            You have successfully completed this course.
          </p>
        </div>

        {/* ---------- the certificate itself ---------- */}
        <article
          id="certificate"
          className="mt-10 rounded-xl border-2 border-navy/15 bg-white px-8 py-12 text-center md:px-14 md:py-16 print:mt-0 print:rounded-none print:border"
        >
          <div className="flex items-center justify-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-xs font-semibold text-white">
              JS
            </span>
            <span className="text-base font-semibold text-navy">Jana Saab</span>
          </div>

          <p className="mt-10 text-[11px] tracking-[0.28em] text-navy/50">
            CERTIFICATE OF COMPLETION
          </p>

          <p className="mt-8 text-[13px] text-navy/60">This is to certify that</p>

          <p className="mt-2 font-serif text-3xl font-medium text-navy md:text-4xl">
            {displayName || '—'}
          </p>

          {!displayName && (
            <p className="mt-2 text-[12px] text-navy/50 print:hidden">
              Add your name on the dashboard and it will appear here.
            </p>
          )}

          <p className="mt-8 text-[13px] text-navy/60">has successfully completed</p>

          <p className="mt-2 font-serif text-2xl font-medium leading-snug text-navy md:text-3xl">
            {certificate.courseTitle}
          </p>

          <div className="mx-auto mt-12 grid max-w-md gap-6 border-t border-slate-200 pt-8 sm:grid-cols-2">
            <div>
              <p className="text-[10px] tracking-[0.18em] text-navy/45">COMPLETION DATE</p>
              <p className="mt-1 text-[13px] font-medium text-navy">
                {issued.toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.18em] text-navy/45">CERTIFICATE ID</p>
              <p className="mt-1 font-mono text-[13px] font-medium text-navy">{certificate.id}</p>
            </div>
          </div>
        </article>

        {/* ---------- actions ---------- */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="rounded-md bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-navy/90"
          >
            Download Certificate
          </button>

          <button
            onClick={share}
            className="rounded-md border border-navy/30 px-6 py-3 text-sm font-medium text-navy transition hover:bg-slate-50"
          >
            {copied ? 'Link copied' : 'Share Certificate'}
          </button>

          <Link to="/dashboard" className="text-[13px] text-navy/70 hover:underline">
            Back to dashboard
          </Link>
        </div>

        <p className="mt-4 text-center text-[12px] text-navy/50 print:hidden">
          Choose “Save as PDF” in the print dialog to keep a copy.
        </p>
      </div>

      {/* Print only the certificate, not the header, footer or buttons. */}
      <style>{`
        @media print {
          header, footer { display: none !important; }
          body { background: #fff; }
          @page { margin: 12mm; }
        }
      `}</style>
    </section>
  )
}

export default CertificatePage