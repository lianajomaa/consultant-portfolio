/**
 * LESSON PAGE — /courses/:slug/lessons/:lessonId
 * Specification section 13.
 *
 * One template for every lesson in every course. Sections whose content Jana
 * has not written yet are hidden rather than shown empty, so an unfinished
 * lesson still looks intentional.
 */

import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Download, PlayCircle } from 'lucide-react'

import {
  getCourse,
  getLesson,
  getLessonNeighbours,
} from '../../data/courses'

import { useProgress } from '../../context/ProgressContext'
import CourseSidebar from '../../components/academy/CourseSidebar'
import QuizBlock from '../../components/academy/QuizBlock'

/* ------------------------------------------------------------------ */
/* VIDEO PLAYER                                                        */
/* Handles an empty videoUrl, an embed link, and a direct file.        */
/* ------------------------------------------------------------------ */

function VideoPlayer({ lesson }) {
  const url = lesson.videoUrl

  if (!url) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
        <PlayCircle
          size={40}
          className="text-navy/25"
          aria-hidden="true"
        />

        <p className="mt-3 text-sm font-medium text-navy/70">
          Video coming soon
        </p>

        <p className="mt-1 text-[12px] text-navy/50">
          Approximately {lesson.durationMinutes} minutes
        </p>
      </div>
    )
  }

  const isEmbed = /youtube|youtu\.be|vimeo/i.test(url)

  if (isEmbed) {
    return (
      <iframe
        src={url}
        title={lesson.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-xl border border-slate-200"
      />
    )
  }

  return (
    <video
      controls
      className="aspect-video w-full rounded-xl border border-slate-200 bg-black"
    >
      <source src={url} />
      Your browser does not support the video tag.
    </video>
  )
}

/* ------------------------------------------------------------------ */
/* LESSON PAGE                                                         */
/* ------------------------------------------------------------------ */

function LessonPage() {
  const { slug, lessonId } = useParams()
  const navigate = useNavigate()

  const course = getCourse(slug)
  const lesson = course ? getLesson(course, lessonId) : null

  const {
    visitLesson,
    completeLesson,
    uncompleteLesson,
    isLessonComplete,
    saveQuizScore,
    getQuizScore,
  } = useProgress()

  /*
   * Record the resume point whenever a lesson opens.
   *
   * Depend on the IDs, not on the course/lesson objects:
   * getLessons() may rebuild those objects on every render.
   */
  const courseSlug = course?.slug
  const currentLessonId = lesson?.id

  useEffect(() => {
    if (courseSlug && currentLessonId) {
      visitLesson(courseSlug, currentLessonId)
    }
  }, [courseSlug, currentLessonId, visitLesson])

  /* ---------------------------------------------------------------- */
  /* NOT FOUND                                                         */
  /* ---------------------------------------------------------------- */

  if (!course || !lesson) {
    return (
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-serif text-3xl font-medium text-navy">
            Lesson not found
          </h1>

          <p className="mt-3 text-sm text-navy/70">
            That lesson doesn&apos;t exist or has been moved.
          </p>

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

  const { previous, next, index, total } = getLessonNeighbours(
    course,
    lesson.id
  )

  const complete = isLessonComplete(course.slug, lesson.id)

  const quizResult = lesson.quiz
    ? getQuizScore(course.slug, lesson.quiz.id)
    : null

  /* ---------------------------------------------------------------- */
  /* COMPLETION                                                        */
  /* ---------------------------------------------------------------- */

  const toggleComplete = () => {
    if (complete) {
      uncompleteLesson(course.slug, lesson.id)
    } else {
      completeLesson(course.slug, lesson.id)
    }
  }

  const completeAndContinue = () => {
    completeLesson(course.slug, lesson.id)

    if (next) {
      navigate(`/courses/${course.slug}/lessons/${next.id}`)
    } else {
      navigate(`/courses/${course.slug}/assessment`)
    }
  }

  /* ---------------------------------------------------------------- */
  /* PAGE                                                               */
  /* ---------------------------------------------------------------- */

  return (
    <div className="px-8 py-10 md:px-12 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">

        <CourseSidebar
          course={course}
          currentLessonId={lesson.id}
        />

        {/* ============================ MAIN ============================ */}

        <article className="min-w-0">

          {/* Breadcrumb */}

          <div className="flex flex-wrap items-center gap-x-2 text-[12px] text-navy/55">
            <Link
              to={`/courses/${course.slug}`}
              className="hover:underline"
            >
              {course.title}
            </Link>

            <span aria-hidden="true">·</span>

            <span>{lesson.moduleTitle}</span>
          </div>

          {/* Lesson number */}

          <p className="mt-5 text-[11px] tracking-[0.18em] text-navy/50">
            LESSON {index + 1} OF {total}
          </p>

          {/* Title */}

          <h1 className="mt-2 font-serif text-3xl font-medium leading-tight tracking-tight text-navy md:text-4xl">
            {lesson.title}
          </h1>

          {/* Duration / completion */}

          <p className="mt-3 text-[13px] text-navy/60">
            {lesson.durationMinutes} minutes

            {complete && (
              <span className="ml-3 inline-flex items-center gap-1 text-navy">
                <Check size={13} aria-hidden="true" />
                Completed
              </span>
            )}
          </p>

          {/* Lesson introduction */}

          {lesson.intro && (
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-navy/80 md:text-base">
              {lesson.intro}
            </p>
          )}

          {/* Learning objectives */}

          {lesson.objectives?.length > 0 && (
            <div className="mt-8 max-w-2xl rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-6">
              <h2 className="text-sm font-medium text-navy">
                Learning Objectives
              </h2>

              <p className="mt-1 text-[13px] text-navy/60">
                By the end of this lesson, you will be able to:
              </p>

              <ul className="mt-3 space-y-2">
                {lesson.objectives.map((objective) => (
                  <li
                    key={objective}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-navy/80"
                  >
                    <Check
                      size={15}
                      className="mt-0.5 flex-shrink-0 text-navy"
                      aria-hidden="true"
                    />

                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Video */}

          <div className="mt-9">
            <VideoPlayer lesson={lesson} />

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={toggleComplete}
                className={`rounded-md px-5 py-2.5 text-sm font-medium transition ${
                  complete
                    ? 'border border-navy/30 text-navy hover:bg-slate-50'
                    : 'bg-navy text-white hover:bg-navy/90'
                }`}
              >
                {complete
                  ? 'Mark as Incomplete'
                  : 'Mark as Complete'}
              </button>

              <span className="text-[12px] text-navy/50">
                {lesson.durationMinutes}:00
              </span>
            </div>
          </div>

          {/* Key takeaways */}

          {lesson.takeaways?.length > 0 && (
            <section className="mt-12 max-w-2xl">
              <h2 className="font-serif text-2xl font-medium text-navy">
                Key Takeaways
              </h2>

              <ul className="mt-4 space-y-2.5">
                {lesson.takeaways.map((takeaway) => (
                  <li
                    key={takeaway}
                    className="flex gap-3 text-sm leading-relaxed text-navy/80"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-navy"
                      aria-hidden="true"
                    />

                    {takeaway}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Knowledge check */}

          {lesson.quiz && (
            <section className="mt-12 max-w-2xl">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-2xl font-medium text-navy">
                  Knowledge Check
                </h2>

                {quizResult && (
                  <span className="text-[12px] text-navy/60">
                    Best: {quizResult.score}/{quizResult.total}
                  </span>
                )}
              </div>

              <QuizBlock
                quiz={lesson.quiz}
                onFinish={({ score, total }) =>
                  saveQuizScore(
                    course.slug,
                    lesson.quiz.id,
                    { score, total }
                  )
                }
                continueLabel={next ? 'Continue' : 'Finish'}
                onContinue={completeAndContinue}
              />
            </section>
          )}

          {/* Practical exercise */}

          {lesson.exercise && (
            <section className="mt-12 max-w-2xl">
              <h2 className="font-serif text-2xl font-medium text-navy">
                Practical Exercise
              </h2>

              <div className="mt-4 rounded-xl border border-navy/20 bg-baby/40 p-6">
                <h3 className="text-base font-medium text-navy">
                  {lesson.exercise.title}
                </h3>

                <p className="mt-2 text-[13px] leading-relaxed text-navy/75">
                  Apply this lesson to a realistic situation.
                </p>

                <Link
                  to={`/courses/${course.slug}/lessons/${lesson.id}/exercise`}
                  className="mt-5 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
                >
                  Start Exercise
                </Link>
              </div>
            </section>
          )}

          {/* Downloadable resource */}

          {lesson.resource && (
            <section className="mt-12 max-w-2xl">
              <h2 className="font-serif text-2xl font-medium text-navy">
                Downloadable Resource
              </h2>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <Download
                    size={18}
                    className="text-navy"
                    aria-hidden="true"
                  />

                  <span className="text-sm font-medium text-navy">
                    {lesson.resource.title}
                  </span>
                </div>

                {lesson.resource.file ? (
                  <a
                    href={lesson.resource.file}
                    download
                    className="rounded-md bg-navy px-4 py-2 text-[13px] font-medium text-white transition hover:bg-navy/90"
                  >
                    Download {lesson.resource.type}
                  </a>
                ) : (
                  <span className="text-[12px] text-navy/45">
                    Coming soon
                  </span>
                )}
              </div>
            </section>
          )}

          {/* Previous / Next */}

          <nav className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

            {previous ? (
              <Link
                to={`/courses/${course.slug}/lessons/${previous.id}`}
                className="text-[13px] text-navy/70 hover:underline"
              >
                ← Previous: {previous.title}
              </Link>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={completeAndContinue}
              className="inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
            >
              {next
                ? `Next: ${next.title}`
                : 'Go to Final Assessment'}

              <ArrowRight
                size={15}
                aria-hidden="true"
              />
            </button>
          </nav>

        </article>
      </div>
    </div>
  )
}

export default LessonPage