import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCourse, getLesson, getLessonNeighbours } from '../../data/courses'
import { useProgress } from '../../context/ProgressContext'
import CourseSidebar from '../../components/academy/CourseSidebar'
import QuizBlock from '../../components/academy/QuizBlock'

function QuizPage() {
  const { slug, lessonId } = useParams()
  const navigate = useNavigate()

  const course = getCourse(slug)
  const lesson = course ? getLesson(course, lessonId) : null
  const quiz = lesson?.quiz || null

  const { saveQuizScore, getQuizScore, completeLesson } = useProgress()

  if (!course || !lesson || !quiz) {
    return (
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-serif text-3xl font-medium text-navy">Quiz not found</h1>
          <p className="mt-3 text-sm text-navy/70">
            This lesson doesn&apos;t have a knowledge check.
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

  const previousResult = getQuizScore(course.slug, quiz.id)
  const { next } = getLessonNeighbours(course, lesson.id)

  const continueOn = () => {
    completeLesson(course.slug, lesson.id)
    navigate(`/courses/${course.slug}/lessons/${lesson.id}`)
  }

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
            <Link to={`/courses/${course.slug}/lessons/${lesson.id}`} className="hover:underline">
              {lesson.title}
            </Link>
          </div>

          <p className="mt-5 text-[11px] tracking-[0.18em] text-navy/50">
            {lesson.moduleTitle.toUpperCase()}
          </p>

          <h1 className="mt-2 font-serif text-3xl font-medium leading-tight tracking-tight text-navy md:text-4xl">
            {quiz.title}
          </h1>

          <p className="mt-3 text-[13px] text-navy/60">
            {quiz.questions.length > 0
              ? `${quiz.questions.length} question${quiz.questions.length === 1 ? '' : 's'}`
              : 'Questions coming soon'}
            {previousResult && (
              <span className="ml-3">
                · Previous score: {previousResult.score}/{previousResult.total}
              </span>
            )}
          </p>

          <div className="mt-8">
            <QuizBlock
              quiz={quiz}
              onFinish={({ score, total }) => saveQuizScore(course.slug, quiz.id, { score, total })}
              continueLabel="Continue Lesson"
              onContinue={continueOn}
            />
          </div>

          <div className="mt-8">
            <Link
              to={`/courses/${course.slug}/lessons/${lesson.id}`}
              className="text-[13px] text-navy/70 hover:underline"
            >
              ← Back to lesson
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

export default QuizPage