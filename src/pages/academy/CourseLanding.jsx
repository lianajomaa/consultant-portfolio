import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  FileText,
  GraduationCap,
  PenLine,
  PlayCircle,
} from 'lucide-react'
import { getCourse, getCourseStats } from '../../data/courses'
import { useProgress } from '../../context/ProgressContext'

function LessonTags({ lesson }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {lesson.duration && (
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <Clock size={13} aria-hidden="true" />
          {lesson.duration}
        </span>
      )}

      {lesson.type && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {lesson.type}
        </span>
      )}

      {lesson.completed && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
          <CheckCircle2 size={13} aria-hidden="true" />
          Completed
        </span>
      )}
    </div>
  )
}

function ModuleRow({
  module,
  moduleIndex,
  expanded,
  onToggle,
  completedLessons,
  onLessonClick,
}) {
  const lessons = module.lessons || []

  const completedCount = lessons.filter((lesson) =>
    completedLessons?.has?.(lesson.id)
  ).length

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-slate-50"
        aria-expanded={expanded}
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-navy">
            {moduleIndex + 1}
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-navy">
              {module.title || `Module ${moduleIndex + 1}`}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {completedCount} of {lessons.length} lessons completed
            </p>
          </div>
        </div>

        <ChevronDown
          size={20}
          className={`shrink-0 text-slate-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div className="border-t border-slate-200">
          {lessons.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {lessons.map((lesson, lessonIndex) => {
                const completed = completedLessons?.has?.(lesson.id)

                return (
                  <button
                    key={lesson.id || `${moduleIndex}-${lessonIndex}`}
                    type="button"
                    onClick={() => onLessonClick(lesson)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        completed
                          ? 'bg-green-100 text-green-600'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {completed ? (
                        <Check size={16} aria-hidden="true" />
                      ) : (
                        <PlayCircle size={17} aria-hidden="true" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy">
                        {lesson.title || `Lesson ${lessonIndex + 1}`}
                      </p>

                      <div className="mt-1">
                        <LessonTags lesson={lesson} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="px-5 py-6 text-sm text-slate-500">
              No lessons available yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function CourseLanding() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const course = getCourse(slug)

  const progressContext = useProgress() || {}

  const {
    completedLessons = [],
    getCourseProgress,
    isLessonComplete,
  } = progressContext

  const [expandedModules, setExpandedModules] = useState(() => new Set([0]))

  if (!course) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h1 className="text-2xl font-semibold text-navy">
            Course not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The course you are looking for does not exist.
          </p>

          <Link
            to="/courses"
            className="mt-6 inline-flex items-center rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white"
          >
            Back to courses
          </Link>
        </div>
      </main>
    )
  }

  const modules = course.modules || []
  const resources = course.resources || []

  const completedSet =
    completedLessons instanceof Set
      ? completedLessons
      : new Set(completedLessons || [])

  const totalLessons = modules.reduce(
    (total, module) => total + (module.lessons?.length || 0),
    0
  )

  const completedCount = modules.reduce(
    (total, module) =>
      total +
      (module.lessons || []).filter((lesson) => {
        if (typeof isLessonComplete === 'function') {
          return isLessonComplete(lesson.id)
        }

        return completedSet.has(lesson.id)
      }).length,
    0
  )

  let progress = 0

  if (typeof getCourseProgress === 'function') {
    const result = getCourseProgress(course)

    if (typeof result === 'number') {
      progress = result
    } else if (result && typeof result.progress === 'number') {
      progress = result.progress
    }
  }

  if (!progress && totalLessons > 0) {
    progress = Math.round((completedCount / totalLessons) * 100)
  }

  const stats =
    typeof getCourseStats === 'function'
      ? getCourseStats(course)
      : {
          lessons: totalLessons,
          modules: modules.length,
        }

  const toggleModule = (index) => {
    setExpandedModules((current) => {
      const next = new Set(current)

      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }

      return next
    })
  }

  const handleLessonClick = (lesson) => {
    if (!lesson) return

    if (lesson.path) {
      navigate(lesson.path)
      return
    }

    if (lesson.slug) {
      navigate(`/courses/${course.slug}/lessons/${lesson.slug}`)
      return
    }

    if (lesson.id) {
      navigate(`/courses/${course.slug}/lessons/${lesson.id}`)
    }
  }

  const continueCourse = () => {
    for (const module of modules) {
      for (const lesson of module.lessons || []) {
        const complete =
          typeof isLessonComplete === 'function'
            ? isLessonComplete(lesson.id)
            : completedSet.has(lesson.id)

        if (!complete) {
          handleLessonClick(lesson)
          return
        }
      }
    }

    const firstLesson = modules[0]?.lessons?.[0]

    if (firstLesson) {
      handleLessonClick(firstLesson)
    }
  }

  return (
    <>
      <main>
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                  <Link
                    to="/courses"
                    className="transition hover:text-navy"
                  >
                    Courses
                  </Link>

                  <span>/</span>

                  <span>{course.category || 'Course'}</span>
                </div>

                <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                  {course.title}
                </h1>

                {course.description && (
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                    {course.description}
                  </p>
                )}

                <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-600">
                  {stats?.lessons !== undefined && (
                    <span className="inline-flex items-center gap-2">
                      <BookOpen size={17} aria-hidden="true" />
                      {stats.lessons} lessons
                    </span>
                  )}

                  {stats?.modules !== undefined && (
                    <span className="inline-flex items-center gap-2">
                      <GraduationCap size={17} aria-hidden="true" />
                      {stats.modules} modules
                    </span>
                  )}

                  {course.duration && (
                    <span className="inline-flex items-center gap-2">
                      <Clock size={17} aria-hidden="true" />
                      {course.duration}
                    </span>
                  )}
                </div>
              </div>

              <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-navy">
                    Your progress
                  </span>

                  <span className="text-sm font-semibold text-navy">
                    {progress}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-navy transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(0, progress))}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  {completedCount} of {totalLessons} lessons completed
                </p>

                <button
                  type="button"
                  onClick={continueCourse}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <PlayCircle size={17} aria-hidden="true" />
                  {progress > 0 ? 'Continue course' : 'Start course'}
                </button>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-navy">
                  Course content
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Work through each module at your own pace.
                </p>
              </div>

              <div className="space-y-4">
                {modules.length > 0 ? (
                  modules.map((module, index) => (
                    <ModuleRow
                      key={module.id || index}
                      module={module}
                      moduleIndex={index}
                      expanded={expandedModules.has(index)}
                      onToggle={() => toggleModule(index)}
                      completedLessons={completedSet}
                      onLessonClick={handleLessonClick}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                    Course modules are not available yet.
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <Award
                      size={20}
                      className="text-navy"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-navy">
                      Course completion
                    </h2>

                    <p className="text-xs text-slate-500">
                      Finish all lessons to complete the course.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-green-600"
                      aria-hidden="true"
                    />
                    <span>Complete every lesson.</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-green-600"
                      aria-hidden="true"
                    />
                    <span>Review the course resources.</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-green-600"
                      aria-hidden="true"
                    />
                    <span>Track your progress as you learn.</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <PenLine
                    size={20}
                    className="text-navy"
                    aria-hidden="true"
                  />

                  <h2 className="font-semibold text-navy">
                    Need a hand?
                  </h2>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Use the lessons and supporting resources to keep moving
                  through the course.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
            <div className="mb-7">
              <h2 className="text-2xl font-semibold text-navy">
                Course resources
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Helpful files and materials for this course.
              </p>
            </div>

            {resources.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => {
                  const ready = Boolean(resource.file)

                  return (
                    <div
                      key={resource.id}
                      className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <div>
                        <FileText
                          size={20}
                          className="text-navy"
                          aria-hidden="true"
                        />

                        <h3 className="mt-3 text-sm font-medium leading-snug text-navy">
                          {resource.title}
                        </h3>
                      </div>

                      {ready ? (
                        <a
                          href={resource.file}
                          download
                          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-navy hover:underline"
                        >
                          <Download size={14} aria-hidden="true" />
                          Download {resource.type || 'file'}
                        </a>
                      ) : (
                        <span className="mt-5 text-[12px] text-navy/45">
                          Coming soon
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                No resources are available for this course yet.
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}