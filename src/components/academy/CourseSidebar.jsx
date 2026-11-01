/**
 * COURSE SIDEBAR — the left rail on lesson, quiz, exercise and assessment pages.
 * Specification section 13, "Left Sidebar".
 *
 * Shows overall progress, then every module and lesson with its state:
 *   ✓ complete   → lesson finished
 *   → current    → the lesson being viewed
 *   ○ upcoming   → not started
 *
 * On mobile it collapses into a single "Course content" toggle so the lesson
 * itself stays the focus on a small screen.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronDown } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'

function LessonList({ course, currentLessonId, onNavigate }) {
  const { isLessonComplete, getAssessment } = useProgress()
  const assessment = getAssessment(course.slug)

  return (
    <>
      {course.modules.map((module, moduleIndex) => (
        <div key={module.id} className="mb-6">
          <p className="mb-2 text-[10px] tracking-[0.18em] text-navy/45">
            MODULE {moduleIndex + 1}
          </p>

          <ul className="space-y-0.5">
            {module.lessons.map((lesson) => {
              const complete = isLessonComplete(course.slug, lesson.id)
              const current = lesson.id === currentLessonId

              return (
                <li key={lesson.id}>
                  <Link
                    to={`/courses/${course.slug}/lessons/${lesson.id}`}
                    onClick={onNavigate}
                    aria-current={current ? 'page' : undefined}
                    className={`flex items-start gap-2.5 rounded-md px-2.5 py-2 text-[13px] leading-snug transition ${
                      current
                        ? 'bg-baby/60 font-medium text-navy'
                        : 'text-navy/75 hover:bg-slate-50'
                    }`}
                  >
                    <span className="mt-0.5 flex-shrink-0" aria-hidden="true">
                      {complete ? (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-navy text-white">
                          <Check size={10} />
                        </span>
                      ) : current ? (
                        <span className="flex h-4 w-4 items-center justify-center text-navy">→</span>
                      ) : (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300" />
                      )}
                    </span>
                    {lesson.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      {course.finalAssessment && (
        <div>
          <p className="mb-2 text-[10px] tracking-[0.18em] text-navy/45">FINAL ASSESSMENT</p>
          <Link
            to={`/courses/${course.slug}/assessment`}
            onClick={onNavigate}
            className="flex items-start gap-2.5 rounded-md px-2.5 py-2 text-[13px] leading-snug text-navy/75 transition hover:bg-slate-50"
          >
            <span className="mt-0.5 flex-shrink-0" aria-hidden="true">
              {assessment?.passed ? (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-navy text-white">
                  <Check size={10} />
                </span>
              ) : (
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300" />
              )}
            </span>
            {course.finalAssessment.title}
          </Link>
        </div>
      )}
    </>
  )
}

function CourseSidebar({ course, currentLessonId }) {
  const [open, setOpen] = useState(false)
  const { getCourseProgress } = useProgress()
  const progress = getCourseProgress(course)

  const ProgressHeader = (
    <div className="mb-6">
      <Link
        to={`/courses/${course.slug}`}
        className="text-[13px] font-medium text-navy hover:underline"
      >
        {course.title}
      </Link>

      <p className="mt-4 text-[11px] tracking-[0.18em] text-navy/45">COURSE PROGRESS</p>
      <p className="mt-1 text-sm font-medium text-navy">{progress.percent}% Complete</p>

      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={progress.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course progress"
      >
        <div
          className="h-full rounded-full bg-navy transition-all"
          style={{ width: `${progress.percent}%` }}
        />
      </div>

      <p className="mt-1.5 text-[11px] text-navy/55">
        {progress.completed} of {progress.total} completed
      </p>
    </div>
  )

  return (
    <>
      {/* ---------- desktop rail ---------- */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
          {ProgressHeader}
          <LessonList course={course} currentLessonId={currentLessonId} />
        </div>
      </aside>

      {/* ---------- mobile collapsible ---------- */}
      <div className="lg:hidden">
        <div className="rounded-xl border border-slate-200 bg-white">
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <span>
              <span className="block text-sm font-medium text-navy">Course content</span>
              <span className="mt-0.5 block text-[12px] text-navy/60">
                {progress.percent}% complete · {progress.completed} of {progress.total}
              </span>
            </span>
            <ChevronDown
              size={18}
              className={`flex-shrink-0 text-navy transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {open && (
            <div className="border-t border-slate-100 px-5 py-5">
              <LessonList
                course={course}
                currentLessonId={currentLessonId}
                onNavigate={() => setOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CourseSidebar