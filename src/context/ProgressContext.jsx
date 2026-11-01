/**
 * LEARNER PROGRESS STORE
 * ---------------------------------------------------------------------------
 * Holds everything about the learner: enrolments, completed lessons, quiz
 * scores, exercise responses, resume point, and earned certificates.
 *
 * Right now it persists to localStorage (one key, one JSON blob).
 *
 * WHEN THE BACKEND IS BUILT, only this file changes. Replace `readStorage` /
 * `writeStorage` with API calls and every page keeps working, because no page
 * touches localStorage directly — they all go through `useProgress()`.
 *
 * SETUP: main.jsx must wrap the app in <ProgressProvider> (step 7).
 * ---------------------------------------------------------------------------
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getCompletableItems, getLessons } from '../data/courses'

const STORAGE_KEY = 'jana-academy-progress-v1'

/** The shape of a brand new learner with no history. */
const EMPTY_STATE = {
  learner: {
    name: '', // used on the certificate; set on the dashboard for now
  },
  // slug -> course record
  courses: {},
  // slug -> certificate record
  certificates: {},
}

/** A fresh, empty record for one course. */
function emptyCourseRecord() {
  return {
    enrolledAt: null,
    lastLessonId: null, // resume point
    lessons: {}, // lessonId -> ISO completion date
    quizzes: {}, // quizId  -> { score, total, passed, answeredAt }
    exercises: {}, // exerciseId -> { response, submittedAt }
    assessment: null, // { score, total, passed, answeredAt }
  }
}

/* ------------------------------------------------------------------ *
 * STORAGE
 * The only two functions that know where data physically lives.
 * Swap these for API calls when the backend exists.
 * ------------------------------------------------------------------ */

function readStorage() {
  // localStorage throws in private mode and some embedded browsers,
  // so a failure here must never break the app — we just start empty.
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_STATE
    const parsed = JSON.parse(raw)
    return {
      ...EMPTY_STATE,
      ...parsed,
      learner: { ...EMPTY_STATE.learner, ...(parsed.learner || {}) },
      courses: parsed.courses || {},
      certificates: parsed.certificates || {},
    }
  } catch {
    return EMPTY_STATE
  }
}

function writeStorage(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Out of quota or storage blocked — progress stays in memory for
    // this session only. Not worth interrupting the learner over.
  }
}

/* ------------------------------------------------------------------ *
 * CERTIFICATE IDs
 * ------------------------------------------------------------------ */

function makeCertificateId(courseSlug) {
  // Initials of the course slug + a short random block, e.g. "JS-PE-7K2M9X"
  const initials = courseSlug
    .split('-')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3)

  const random = Math.random().toString(36).toUpperCase().slice(2, 8)
  return `JS-${initials}-${random}`
}

/* ------------------------------------------------------------------ *
 * CONTEXT
 * ------------------------------------------------------------------ */

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  // Lazy initialiser: read storage once on mount, not on every render.
  const [state, setState] = useState(readStorage)

  // Persist on every change.
  useEffect(() => {
    writeStorage(state)
  }, [state])

  /** Update one course's record immutably, creating it if it doesn't exist. */
  const updateCourse = useCallback((slug, updater) => {
    setState((previous) => {
      const current = previous.courses[slug] || emptyCourseRecord()
      const updated = updater(current)

      // If the updater decided nothing changed, return the SAME state object.
      // React then skips the re-render entirely. Without this, a no-op update
      // (e.g. re-visiting the lesson you're already on) still produces a new
      // state object, re-renders, and can drive an effect into a render loop.
      if (updated === current) return previous

      return {
        ...previous,
        courses: {
          ...previous.courses,
          [slug]: updated,
        },
      }
    })
  }, [])

  /* ---------------- learner ---------------- */

  const setLearnerName = useCallback((name) => {
    setState((previous) => ({
      ...previous,
      learner: { ...previous.learner, name },
    }))
  }, [])

  /* ---------------- enrolment ---------------- */

  const enroll = useCallback(
    (slug) => {
      updateCourse(slug, (course) =>
        course.enrolledAt
          ? course // already enrolled, don't reset the date
          : { ...course, enrolledAt: new Date().toISOString() }
      )
    },
    [updateCourse]
  )

  const isEnrolled = useCallback(
    (slug) => Boolean(state.courses[slug]?.enrolledAt),
    [state.courses]
  )

  /* ---------------- lessons ---------------- */

  const completeLesson = useCallback(
    (slug, lessonId) => {
      updateCourse(slug, (course) => ({
        ...course,
        enrolledAt: course.enrolledAt || new Date().toISOString(),
        lastLessonId: lessonId,
        lessons: {
          ...course.lessons,
          [lessonId]: course.lessons[lessonId] || new Date().toISOString(),
        },
      }))
    },
    [updateCourse]
  )

  const uncompleteLesson = useCallback(
    (slug, lessonId) => {
      updateCourse(slug, (course) => {
        const lessons = { ...course.lessons }
        delete lessons[lessonId]
        return { ...course, lessons }
      })
    },
    [updateCourse]
  )

  const isLessonComplete = useCallback(
    (slug, lessonId) => Boolean(state.courses[slug]?.lessons?.[lessonId]),
    [state.courses]
  )

  /** Called when a lesson page opens, so "Continue Learning" is accurate. */
  const visitLesson = useCallback(
    (slug, lessonId) => {
      updateCourse(slug, (course) =>
        course.lastLessonId === lessonId
          ? course
          : {
              ...course,
              enrolledAt: course.enrolledAt || new Date().toISOString(),
              lastLessonId: lessonId,
            }
      )
    },
    [updateCourse]
  )

  /* ---------------- quizzes ---------------- */

  const saveQuizScore = useCallback(
    (slug, quizId, { score, total, passingScore = 70 }) => {
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0
      updateCourse(slug, (course) => ({
        ...course,
        quizzes: {
          ...course.quizzes,
          [quizId]: {
            score,
            total,
            percentage,
            passed: percentage >= passingScore,
            answeredAt: new Date().toISOString(),
          },
        },
      }))
    },
    [updateCourse]
  )

  const getQuizScore = useCallback(
    (slug, quizId) => state.courses[slug]?.quizzes?.[quizId] || null,
    [state.courses]
  )

  /* ---------------- exercises ---------------- */

  const saveExercise = useCallback(
    (slug, exerciseId, response) => {
      updateCourse(slug, (course) => ({
        ...course,
        exercises: {
          ...course.exercises,
          [exerciseId]: {
            response,
            submittedAt: new Date().toISOString(),
          },
        },
      }))
    },
    [updateCourse]
  )

  const getExercise = useCallback(
    (slug, exerciseId) => state.courses[slug]?.exercises?.[exerciseId] || null,
    [state.courses]
  )

  /* ---------------- final assessment ---------------- */

  const saveAssessment = useCallback(
    (slug, { score, total, passingScore = 70 }) => {
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0
      updateCourse(slug, (course) => ({
        ...course,
        assessment: {
          score,
          total,
          percentage,
          passed: percentage >= passingScore,
          answeredAt: new Date().toISOString(),
        },
      }))
    },
    [updateCourse]
  )

  const getAssessment = useCallback(
    (slug) => state.courses[slug]?.assessment || null,
    [state.courses]
  )

  /* ---------------- progress ---------------- */

  /**
   * Progress for one course. Pass the course OBJECT (from courses.js),
   * because the total depends on how many lessons that course has.
   *
   * Returns { percent, completed, total, nextLesson, resumeLesson, isComplete }
   */
  const getCourseProgress = useCallback(
    (course) => {
      if (!course) {
        return {
          percent: 0,
          completed: 0,
          total: 0,
          nextLesson: null,
          resumeLesson: null,
          isComplete: false,
        }
      }

      const record = state.courses[course.slug] || emptyCourseRecord()
      const items = getCompletableItems(course)
      const lessons = getLessons(course)

      const completed = items.filter((item) =>
        item.type === 'lesson'
          ? Boolean(record.lessons[item.id])
          : Boolean(record.assessment?.passed)
      ).length

      const total = items.length
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0

      // First lesson the learner hasn't finished — where "Start" should go.
      const nextLesson = lessons.find((l) => !record.lessons[l.id]) || null

      // Where they actually were last — where "Continue" should go.
      const resumeLesson =
        lessons.find((l) => l.id === record.lastLessonId) || nextLesson || lessons[0] || null

      return {
        percent,
        completed,
        total,
        nextLesson,
        resumeLesson,
        isComplete: total > 0 && completed === total,
      }
    },
    [state.courses]
  )

  /* ---------------- certificates ---------------- */

  /**
   * Issues a certificate if the course is fully complete.
   * Safe to call repeatedly — an existing certificate is returned, not replaced,
   * so the ID and date stay stable once earned.
   */
  const issueCertificate = useCallback(
    (course) => {
      if (!course) return null

      const existing = state.certificates[course.slug]
      if (existing) return existing

      const { isComplete } = getCourseProgress(course)
      if (!isComplete) return null

      const certificate = {
        id: makeCertificateId(course.slug),
        courseSlug: course.slug,
        courseTitle: course.title,
        learnerName: state.learner.name || '',
        issuedAt: new Date().toISOString(),
      }

      setState((previous) => ({
        ...previous,
        certificates: { ...previous.certificates, [course.slug]: certificate },
      }))

      return certificate
    },
    [state.certificates, state.learner.name, getCourseProgress]
  )

  const getCertificate = useCallback(
    (slug) => state.certificates[slug] || null,
    [state.certificates]
  )

  const certificates = useMemo(
    () => Object.values(state.certificates),
    [state.certificates]
  )

  /** Slugs of every course the learner has started. */
  const enrolledSlugs = useMemo(
    () =>
      Object.entries(state.courses)
        .filter(([, record]) => record.enrolledAt)
        .map(([slug]) => slug),
    [state.courses]
  )

  /* ---------------- reset (useful while testing) ---------------- */

  const resetCourse = useCallback((slug) => {
    setState((previous) => {
      const courses = { ...previous.courses }
      const certificates = { ...previous.certificates }
      delete courses[slug]
      delete certificates[slug]
      return { ...previous, courses, certificates }
    })
  }, [])

  const resetAll = useCallback(() => setState(EMPTY_STATE), [])

  const value = useMemo(
    () => ({
      learner: state.learner,
      certificates,
      enrolledSlugs,
      setLearnerName,
      enroll,
      isEnrolled,
      completeLesson,
      uncompleteLesson,
      isLessonComplete,
      visitLesson,
      saveQuizScore,
      getQuizScore,
      saveExercise,
      getExercise,
      saveAssessment,
      getAssessment,
      getCourseProgress,
      issueCertificate,
      getCertificate,
      resetCourse,
      resetAll,
    }),
    [
      state.learner,
      certificates,
      enrolledSlugs,
      setLearnerName,
      enroll,
      isEnrolled,
      completeLesson,
      uncompleteLesson,
      isLessonComplete,
      visitLesson,
      saveQuizScore,
      getQuizScore,
      saveExercise,
      getExercise,
      saveAssessment,
      getAssessment,
      getCourseProgress,
      issueCertificate,
      getCertificate,
      resetCourse,
      resetAll,
    ]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

/** Hook used by every academy page. */
export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used inside <ProgressProvider>')
  }
  return context
}