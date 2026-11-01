/**
 * LEARNER DASHBOARD  —  /dashboard
 * Specification section 16.
 *
 * Continue Learning · My Courses · My Certificates
 *
 * There are no accounts yet, so "the learner" is whoever is using this
 * browser. The name field feeds the certificate. When real auth arrives,
 * the name comes from the account and this field goes away.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, ArrowRight } from 'lucide-react'
import { courses, getCourse } from '../../data/courses'
import { useProgress } from '../../context/ProgressContext'
import CourseCard from '../../components/academy/CourseCard'

function Dashboard() {
  const { learner, setLearnerName, enrolledSlugs, certificates, getCourseProgress } = useProgress()

  const [nameDraft, setNameDraft] = useState(learner.name)
  const [savedName, setSavedName] = useState(false)

  const enrolledCourses = enrolledSlugs.map(getCourse).filter(Boolean)

  // The course to surface at the top: the one with progress, furthest along
  // but not yet finished.
  const activeCourse =
    enrolledCourses
      .map((course) => ({ course, progress: getCourseProgress(course) }))
      .filter(({ progress }) => !progress.isComplete)
      .sort((a, b) => b.progress.percent - a.progress.percent)[0] || null

  const saveName = () => {
    setLearnerName(nameDraft.trim())
    setSavedName(true)
    window.setTimeout(() => setSavedName(false), 2000)
  }

  return (
    <>
      {/* ---------------- HEADER ---------------- */}
      <section className="border-b border-slate-100 bg-white px-8 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-navy md:text-5xl">
            {learner.name ? `Welcome back, ${learner.name.split(' ')[0]}!` : 'Welcome back!'}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-navy/80 md:text-base">
            {enrolledCourses.length > 0
              ? 'Pick up where you left off.'
              : 'You haven’t started a course yet.'}
          </p>

          {/* name — needed for the certificate */}
          <div className="mt-8 max-w-md">
            <label htmlFor="learner-name" className="text-[13px] font-medium text-navy">
              Your name
            </label>
            <p className="mt-1 text-[12px] text-navy/60">
              This is the name that will appear on your certificates.
            </p>
            <div className="mt-2 flex gap-3">
              <input
                id="learner-name"
                value={nameDraft}
                onChange={(event) => setNameDraft(event.target.value)}
                placeholder="e.g. Jana Saab"
                className="w-full rounded-md border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none transition focus:border-navy"
              />
              <button
                onClick={saveName}
                className="flex-shrink-0 rounded-md bg-navy px-4 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
              >
                {savedName ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CONTINUE LEARNING ---------------- */}
      {activeCourse && (
        <section className="border-b border-slate-100 bg-slate-50 px-8 py-14 md:px-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-[7px] w-[7px] border border-navy bg-baby" />
              <span className="text-xs tracking-[0.2em] text-navy">CONTINUE LEARNING</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="font-serif text-2xl font-medium text-navy md:text-3xl">
                {activeCourse.course.title}
              </h2>

              <div className="mt-6 max-w-md">
                <div className="mb-1.5 flex items-center justify-between text-[12px] text-navy/70">
                  <span>{activeCourse.progress.percent}% complete</span>
                  <span>
                    {activeCourse.progress.completed} of {activeCourse.progress.total}
                  </span>
                </div>
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-valuenow={activeCourse.progress.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-navy transition-all"
                    style={{ width: `${activeCourse.progress.percent}%` }}
                  />
                </div>
              </div>

              {activeCourse.progress.resumeLesson && (
                <p className="mt-4 text-[13px] text-navy/70">
                  Last lesson: {activeCourse.progress.resumeLesson.title}
                </p>
              )}

              <Link
                to={
                  activeCourse.progress.resumeLesson
                    ? `/courses/${activeCourse.course.slug}/lessons/${activeCourse.progress.resumeLesson.id}`
                    : `/courses/${activeCourse.course.slug}`
                }
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-navy/90"
              >
                Continue Learning
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- MY COURSES ---------------- */}
      <section className="border-b border-slate-100 bg-white px-8 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-[7px] w-[7px] border border-navy bg-baby" />
            <span className="text-xs tracking-[0.2em] text-navy">MY COURSES</span>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-sm text-navy/70">
                You haven&apos;t enrolled in a course yet.
              </p>
              <Link
                to="/courses"
                className="mt-5 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- MY CERTIFICATES ---------------- */}
      <section className="bg-slate-50 px-8 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-[7px] w-[7px] border border-navy bg-baby" />
            <span className="text-xs tracking-[0.2em] text-navy">MY CERTIFICATES</span>
          </div>

          {certificates.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
                >
                  <div>
                    <Award size={20} className="text-navy" aria-hidden="true" />
                    <h3 className="mt-3 text-base font-medium leading-snug text-navy">
                      {certificate.courseTitle}
                    </h3>
                    <p className="mt-2 text-[12px] text-navy/60">
                      Issued {new Date(certificate.issuedAt).toLocaleDateString()} ·{' '}
                      {certificate.id}
                    </p>
                  </div>

                  <Link
                    to={`/certificate/${certificate.courseSlug}`}
                    className="mt-6 inline-block w-fit rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
                  >
                    View Certificate
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-navy/70">
              Complete your first course to earn your certificate.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default Dashboard