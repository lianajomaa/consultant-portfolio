import { Link, Navigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { getCoursesByAudience, getPath } from '../../data/courses'
import CourseCard from '../../components/academy/CourseCard'

function PathPage({ audience }) {
  const path = getPath(audience)
  const audienceCourses = getCoursesByAudience(audience)

  // Guard against a bad audience prop rather than rendering a blank page.
  if (!path) return <Navigate to="/learn" replace />

  const featured = audienceCourses[0] || null
  const others = audienceCourses.slice(1)

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="border-b border-slate-100 bg-white px-8 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-6 bg-navy" />
              <span className="text-xs tracking-[0.2em] text-navy">
                {path.label.toUpperCase()}
              </span>
            </div>

            <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy md:text-5xl">
              {path.heroTitle}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-navy/80 md:text-base">
              {path.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED COURSE ---------------- */}
      <section className="border-b border-slate-100 bg-slate-50 px-8 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-[7px] w-[7px] border border-navy bg-baby" />
            <span className="text-xs tracking-[0.2em] text-navy">FEATURED COURSE</span>
          </div>

          {featured ? (
            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
              <CourseCard course={featured} featured />

              <div>
                <h2 className="font-serif text-2xl font-medium text-navy">What You&apos;ll Learn</h2>
                <p className="mt-2 text-sm text-navy/70">
                  By the end of this course, you will be able to:
                </p>

                <ul className="mt-5 space-y-2.5">
                  {featured.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-navy/80">
                      <Check
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-navy"
                        aria-hidden="true"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-9 text-base font-medium text-navy">Course Includes</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {featured.includes.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] text-navy/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/courses/${featured.slug}`}
                  className="mt-9 inline-block rounded-md bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-navy/90"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-sm text-navy/70">
              Courses for this path are coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ---------------- MORE COURSES ---------------- */}
      {others.length > 0 && (
        <section className="border-b border-slate-100 bg-white px-8 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 font-serif text-3xl font-medium tracking-tight text-navy">
              More Courses
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- CTA ---------------- */}
      <section className="bg-navy px-8 py-16 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl font-medium text-white md:text-3xl">
              Not sure this is the right path?
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Compare both learning paths and choose what fits your goals.
            </p>
          </div>
          <Link
            to="/learn#paths"
            className="flex-shrink-0 rounded-md bg-white px-6 py-3 text-sm font-medium text-navy transition hover:bg-baby"
          >
            Compare Paths
          </Link>
        </div>
      </section>
    </>
  )
}

export default PathPage