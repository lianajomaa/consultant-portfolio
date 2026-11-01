/**
 * PRACTICAL EXERCISE PAGE  —  /courses/:slug/lessons/:lessonId/exercise
 * Specification section 15.
 *
 * "The objective is to make the learner do something, not just watch."
 *
 * The learner writes a response, submits it, and only then sees the model
 * answer — showing it earlier would defeat the point of the exercise.
 * Their response is saved, so returning to the page brings it back.
 */

import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { getCourse, getLesson, getLessonNeighbours } from '../../data/courses'
import { useProgress } from '../../context/ProgressContext'
import CourseSidebar from '../../components/academy/CourseSidebar'

function ExercisePage() {
  const { slug, lessonId } = useParams()
  const navigate = useNavigate()

  const course = getCourse(slug)
  const lesson = course ? getLesson(course, lessonId) : null
  const exercise = lesson?.exercise || null

  const { saveExercise, getExercise, completeLesson } = useProgress()
  const saved = exercise && course ? getExercise(course.slug, exercise.id) : null

  // Start from whatever the learner wrote last time.
  const [response, setResponse] = useState(saved?.response || '')
  const [submitted, setSubmitted] = useState(Boolean(saved))

  if (!course || !lesson || !exercise) {
    return (
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-serif text-3xl font-medium text-navy">Exercise not found</h1>
          <p className="mt-3 text-sm text-navy/70">
            This lesson doesn&apos;t have a practical exercise.
          </p>
          <Link
            to={course ? `/courses/${course.slug}` : '/courses'}
            className="mt-6 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white"
          >
            Back to course
          </Link>
        </div>
      </section>
    )
  }

  const { next } = getLessonNeighbours(course, lesson.id)

  const submit = () => {
    if (!response.trim()) return
    saveExercise(course.slug, exercise.id, response)
    setSubmitted(true)
  }

  const continueOn = () => {
    completeLesson(course.slug, lesson.id)
    navigate(
      next
        ? `/courses/${course.slug}/lessons/${next.id}`
        : `/courses/${course.slug}/assessment`
    )
  }

  const hasFeedback =
    Boolean(exercise.modelAnswer) || exercise.keyConsiderations.length > 0

  return (
    <div className="px-8 py-10 md:px-12 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">

        <CourseSidebar course={course} currentLessonId={lesson.id} />

        <article className="min-w-0 max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-2 text-[12px] text-navy/55">
            <Link to={`/courses/${course.slug}`} className="hover:underline">
              {course.title}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              to={`/courses/${course.slug}/lessons/${lesson.id}`}
              className="hover:underline"
            >
              {lesson.title}
            </Link>
          </div>

          <p className="mt-5 text-[11px] tracking-[0.18em] text-navy/50">PRACTICAL EXERCISE</p>
          <h1 className="mt-2 font-serif text-3xl font-medium leading-tight tracking-tight text-navy md:text-4xl">
            {exercise.title}
          </h1>

          {/* scenario */}
          <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <h2 className="text-sm font-medium text-navy">Scenario</h2>
            <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-navy/80">
              {exercise.scenario || 'A realistic scenario for this exercise is being written.'}
            </p>
          </section>

          {/* task */}
          <section className="mt-6">
            <h2 className="text-sm font-medium text-navy">Your task</h2>
            <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-navy/80">
              {exercise.task || 'Instructions for this exercise are being written.'}
            </p>
          </section>

          {/* response */}
          <section className="mt-8">
            <label htmlFor="exercise-response" className="text-sm font-medium text-navy">
              Your response
            </label>

            <textarea
              id="exercise-response"
              value={response}
              onChange={(event) => setResponse(event.target.value)}
              rows={10}
              placeholder="Write your answer here…"
              className="mt-3 w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-navy outline-none transition focus:border-navy"
            />

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={submit}
                disabled={!response.trim()}
                className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitted ? 'Save Changes' : 'Submit Exercise'}
              </button>

              {submitted && (
                <span className="inline-flex items-center gap-1.5 text-[13px] text-navy/70">
                  <Check size={14} aria-hidden="true" /> Saved
                </span>
              )}
            </div>
          </section>

          {/* feedback, only after submitting */}
          {submitted && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl font-medium text-navy">Model Answer</h2>

              {hasFeedback ? (
                <>
                  {exercise.modelAnswer && (
                    <div className="mt-4 rounded-xl border border-navy/20 bg-baby/40 p-5 md:p-6">
                      <p className="whitespace-pre-line text-[13px] leading-relaxed text-navy/85">
                        {exercise.modelAnswer}
                      </p>
                    </div>
                  )}

                  {exercise.keyConsiderations.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-navy">Key considerations</h3>
                      <ul className="mt-3 space-y-2">
                        {exercise.keyConsiderations.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2.5 text-[13px] leading-relaxed text-navy/80"
                          >
                            <Check
                              size={15}
                              className="mt-0.5 flex-shrink-0 text-navy"
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-[13px] text-navy/60">
                  A model answer for this exercise is being written. Your response has been saved.
                </p>
              )}

              <button
                onClick={continueOn}
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy/90"
              >
                {next ? `Next: ${next.title}` : 'Go to Final Assessment'}
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </section>
          )}
        </article>
      </div>
    </div>
  )
}

export default ExercisePage