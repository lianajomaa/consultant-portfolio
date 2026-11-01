/**
 * COURSE CARD — used on the academy homepage, the path pages and later the
 * dashboard. Reads stats from the course object rather than hardcoded numbers,
 * so a new course in courses.js renders correctly with no changes here.
 *
 * If the learner has started the course, the card shows a progress bar and the
 * button changes from "View Course" to "Continue".
 */

import { Link } from 'react-router-dom'
import { Award, BookOpen, Clock, FileText, PenLine, GraduationCap } from 'lucide-react'
import { getCourseStats } from '../../data/courses'
import { useProgress } from '../../context/ProgressContext'

function CourseCard({ course, featured = false }) {
  const { getCourseProgress, isEnrolled } = useProgress()

  const stats = getCourseStats(course)
  const progress = getCourseProgress(course)
  // Button wording follows enrolment; the progress bar follows real progress.
  const enrolled = isEnrolled(course.slug)
  const started = progress.percent > 0

  const meta = [
    { icon: GraduationCap, label: course.level },
    { icon: Clock, label: course.duration },
    { icon: BookOpen, label: `${stats.lessons} lessons` },
    { icon: PenLine, label: `${stats.quizzes} quizzes` },
    { icon: FileText, label: `${stats.exercises} practical exercises` },
    { icon: Award, label: 'Certificate of Completion' },
  ]

  return (
    <article
      className={`flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:border-navy/30 md:p-7 ${
        featured ? 'md:p-8' : ''
      }`}
    >
      {course.audience === 'students' ? (
        <span className="mb-4 inline-flex w-fit rounded-md bg-baby px-2.5 py-1 text-[11px] font-medium tracking-wide text-navy">
          University Students
        </span>
      ) : (
        <span className="mb-4 inline-flex w-fit rounded-md bg-baby px-2.5 py-1 text-[11px] font-medium tracking-wide text-navy">
          Professionals
        </span>
      )}

      <h3
        className={`font-serif font-medium leading-tight text-navy ${
          featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
        }`}
      >
        {course.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-navy/80 md:text-base">
        {course.description}
      </p>

      {/* course information */}
      <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {meta.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-[13px] text-navy/80">
            <Icon size={15} className="flex-shrink-0 text-navy/50" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>

      {/* progress, only once started */}
      {started && (
        <div className="mt-6">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-navy/70">
            <span>{progress.percent}% complete</span>
            <span>
              {progress.completed} of {progress.total}
            </span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${course.title} progress`}
          >
            <div
              className="h-full rounded-full bg-navy transition-all"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-7 flex items-center gap-4">
        <Link
          to={`/courses/${course.slug}`}
          className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
        >
          {enrolled ? 'Continue' : 'View Course'}
        </Link>
        {enrolled && progress.resumeLesson && (
          <span className="text-[12px] text-navy/60">
            Next: {progress.resumeLesson.title}
          </span>
        )}
      </div>
    </article>
  )
}

export default CourseCard