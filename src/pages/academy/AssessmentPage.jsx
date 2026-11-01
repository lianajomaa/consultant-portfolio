/**
 * FINAL ASSESSMENT  —  /courses/:slug/assessment
 * Specification section 12, "FINAL ASSESSMENT".
 *
 * Same quiz engine as the knowledge checks, but the score is stored as the
 * course's assessment result, which is the last item standing between the
 * learner and their certificate.
 */

import { Link, useNavigate, useParams } from 'react-router-dom'
import { Award } from 'lucide-react'
import { getCourse } from '../../data/courses'
import { useProgress } from '../../context/ProgressContext'
import CourseSidebar from '../../components/academy/CourseSidebar'
import QuizBlock from '../../components/academy/QuizBlock'

function AssessmentPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const course = getCourse(slug)
  const { saveAssessment, getAssessment, getCourseProgress, issueCertificate } = useProgress()

  if (!course || !course.finalAssessment) {
    return (
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-serif text-3xl font-medium text-navy">Assessment not found</h1>
          <Link
            to="/courses"
            className="mt-6 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white"
          >
            Browse courses
          </Link>
        </div>
      </section>
    )
  }

  const assessment = course.finalAssessment
  const result = getAssessment(course.slug)
  const progress = getCourseProgress(course)

  // Lessons the learner still has open before the assessment counts for much.
  const lessonsRemaining = progress.total - progress.completed - (result?.passed ? 0 : 1)

  const finish = ({ score, total }) => {
    saveAssessment(course.slug, {
      score,
      total,
      passingScore: assessment.passingScore,
    })
  }

  /* Issue the certificate if everything is now complete. */
  const claimCertificate = () => {
    const certificate = issueCertificate(course)
    navigate(certificate ? `/certificate/${course.slug}` : `/courses/${course.slug}`)
  }

  return (
    <div className="px-8 py-10 md:px-12 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">

        <CourseSidebar course={course} currentLessonId={null} />

        <article className="min-w-0 max-w-2xl">
          <div className="text-[12px] text-navy/55">
            <Link to={`/courses/${course.slug}`} className="hover:underline">
              {course.title}
            </Link>
          </div>

          <p className="mt-5 text-[11px] tracking-[0.18em] text-navy/50">FINAL ASSESSMENT</p>
          <h1 className="mt-2 font-serif text-3xl font-medium leading-tight tracking-tight text-navy md:text-4xl">
            {assessment.title}
          </h1>

          {assessment.description && (
            <p className="mt-4 text-sm leading-relaxed text-navy/80 md:text-base">
              {assessment.description}
            </p>
          )}

          <p className="mt-3 text-[13px] text-navy/60">
            Passing requirement: {assessment.passingScore}%
            {result && (
              <span className="ml-2">
                · Your score: {result.percentage}% ({result.passed ? 'passed' : 'not yet passed'})
              </span>
            )}
          </p>

          {/* Honest nudge rather than a hard block — the learner stays in control. */}
          {lessonsRemaining > 0 && !result?.passed && (
            <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-navy/70">
              You still have {lessonsRemaining} lesson{lessonsRemaining === 1 ? '' : 's'} to
              complete. You can take the assessment now, but the lessons cover what it asks about.
            </p>
          )}

          <div className="mt-8">
            <QuizBlock
              quiz={assessment}
              passingScore={assessment.passingScore}
              onFinish={finish}
              continueLabel="Back to course"
              onContinue={() => navigate(`/courses/${course.slug}`)}
            />
          </div>

          {/* certificate, once everything is done */}
          {progress.isComplete && (
            <section className="mt-10 rounded-xl border border-navy/20 bg-baby/40 p-6 md:p-7">
              <Award size={22} className="text-navy" aria-hidden="true" />
              <h2 className="mt-3 font-serif text-2xl font-medium text-navy">
                You&apos;ve completed the course
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy/80">
                {course.certificate.description}
              </p>
              <button
                onClick={claimCertificate}
                className="mt-5 rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
              >
                View Certificate
              </button>
            </section>
          )}
        </article>
      </div>
    </div>
  )
}

export default AssessmentPage