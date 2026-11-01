/**
 * COURSE CONTENT
 * ---------------------------------------------------------------------------
 * This file is the single source of truth for all course content.
 *
 * To add a new course later, append another object to the `courses` array.
 * No page or component needs to change — every page reads from this file.
 *
 * Fields left as '' or [] are intentional placeholders for Jana to fill in.
 * Nothing breaks while they are empty; the pages simply hide those blocks.
 *
 * When a backend is added, this file is replaced by an API response with the
 * exact same shape, and the rest of the app keeps working unchanged.
 * ---------------------------------------------------------------------------
 *
 * SHAPE
 *
 * course
 *   slug, title, subtitle, description, audience, level, duration,
 *   outcomes[], includes[], resources[], modules[],
 *   finalAssessment, certificate
 *
 * module
 *   id, title, lessons[]
 *
 * lesson
 *   id, title, durationMinutes, videoUrl, intro, objectives[], takeaways[],
 *   resource, quiz, exercise
 *
 * quiz        { id, title, questions[] }
 * question    { id, prompt, options[], correctIndex, explanation }
 * exercise    { id, title, scenario, task, modelAnswer, keyConsiderations[] }
 * resource    { id, title, type, file }
 */

/* ------------------------------------------------------------------ *
 * AUDIENCE PATHS  (homepage "Choose Your Learning Path" cards)
 * ------------------------------------------------------------------ */

export const paths = [
  {
    id: 'students',
    route: '/students',
    label: 'University Students',
    tagline: 'Build stronger academic and professional skills.',
    description:
      'Develop practical research and communication skills that support your university journey and prepare you for the workplace.',
    cta: 'Explore Student Learning',
    heroTitle: 'University skills that go beyond the classroom.',
    heroSubtitle:
      'Build practical academic and professional skills through focused, self-paced courses.',
  },
  {
    id: 'professionals',
    route: '/professionals',
    label: 'Professionals',
    tagline: 'Build practical skills for the modern workplace.',
    description:
      'Learn how to use AI more effectively and communicate more clearly through focused, practical learning.',
    cta: 'Explore Professional Learning',
    heroTitle: 'Practical skills for the modern workplace.',
    heroSubtitle:
      'Learn how to communicate more effectively and use AI more strategically through focused, practical learning.',
  },
]

/* ------------------------------------------------------------------ *
 * COURSES
 * ------------------------------------------------------------------ */

export const courses = [
  /* ================================================================
   * COURSE 1 — UNIVERSITY STUDENTS
   * ================================================================ */
  {
    slug: 'academic-research-writing',
    audience: 'students',
    title: 'Academic Research & Writing Fundamentals',
    subtitle: '', // e.g. "Approach academic work with structure and confidence."
    description:
      'Build the foundations you need to approach academic research and writing with confidence.',
    longDescription: '',

    level: 'Beginner',
    duration: 'Approximately 3 hours',
    durationHours: 3,
    hasCertificate: true,

    outcomes: [
      'Develop and narrow a research topic',
      'Formulate research questions',
      'Understand basic research approaches',
      'Find and evaluate academic sources',
      'Read and organize academic literature',
      'Paraphrase and synthesize sources',
      'Develop academic arguments',
      'Structure academic writing',
      'Avoid plagiarism',
      'Communicate research clearly',
    ],

    includes: [
      'Video lessons',
      'Knowledge checks',
      'Research worksheets',
      'Practical exercises',
      'Downloadable workbook',
      'Final assessment',
      'Certificate of Completion',
    ],

    resources: [
      { id: 'arw-r1', title: 'Academic Research Workbook', type: 'PDF', file: '' },
      { id: 'arw-r2', title: 'Source Evaluation Checklist', type: 'PDF', file: '' },
      { id: 'arw-r3', title: 'Essay Structure Templates', type: 'PDF', file: '' },
      { id: 'arw-r4', title: 'Course Summary', type: 'PDF', file: '' },
    ],

    modules: [
      {
        id: 'arw-m1',
        title: 'Finding Your Research Focus',
        lessons: [
          {
            id: 'arw-l1',
            title: 'Developing and Narrowing a Research Topic',
            durationMinutes: 10,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: null,
            exercise: null,
          },
          {
            id: 'arw-l2',
            title: 'Formulating Research Questions',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: {
              id: 'arw-q1',
              title: 'Knowledge Check',
              questions: [],
            },
            exercise: null,
          },
          {
            id: 'arw-l3',
            title: 'Understanding Basic Research Approaches',
            durationMinutes: 15,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: {
              id: 'arw-w1',
              title: 'Research Approach Worksheet',
              type: 'PDF',
              file: '',
            },
            quiz: null,
            exercise: null,
          },
        ],
      },
      {
        id: 'arw-m2',
        title: 'Working With Sources',
        lessons: [
          {
            id: 'arw-l4',
            title: 'Finding and Evaluating Academic Sources',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: null,
            exercise: {
              id: 'arw-e1',
              title: 'Evaluate a Source',
              scenario: '',
              task: '',
              modelAnswer: '',
              keyConsiderations: [],
            },
          },
          {
            id: 'arw-l5',
            title: 'Reading and Organizing Academic Literature',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: {
              id: 'arw-q2',
              title: 'Knowledge Check',
              questions: [],
            },
            exercise: null,
          },
          {
            id: 'arw-l6',
            title: 'Paraphrasing and Synthesizing Sources',
            durationMinutes: 15,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: {
              id: 'arw-w2',
              title: 'Paraphrasing Practice Worksheet',
              type: 'PDF',
              file: '',
            },
            quiz: null,
            exercise: null,
          },
        ],
      },
      {
        id: 'arw-m3',
        title: 'Writing and Academic Integrity',
        lessons: [
          {
            id: 'arw-l7',
            title: 'Developing Academic Arguments',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: null,
            exercise: null,
          },
          {
            id: 'arw-l8',
            title: 'Structuring Academic Writing',
            durationMinutes: 15,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: null,
            exercise: {
              id: 'arw-e2',
              title: 'Structure an Argument',
              scenario: '',
              task: '',
              modelAnswer: '',
              keyConsiderations: [],
            },
          },
          {
            id: 'arw-l9',
            title: 'Avoiding Plagiarism and Communicating Research Clearly',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: {
              id: 'arw-q3',
              title: 'Knowledge Check',
              questions: [],
            },
            exercise: null,
          },
        ],
      },
    ],

    finalAssessment: {
      id: 'arw-final',
      title: 'Academic Research Challenge',
      description: '',
      passingScore: 70,
      questions: [],
    },

    certificate: {
      title: 'Certificate of Completion',
      description:
        'Awarded after completing all required lessons, exercises and the final assessment.',
    },
  },

  /* ================================================================
   * COURSE 2 — PROFESSIONALS
   * ================================================================ */
  {
    slug: 'prompt-engineering',
    audience: 'professionals',
    title: 'Prompt Engineering for Workplace Productivity',
    subtitle: 'Turn better instructions into better AI outputs.',
    description:
      'Learn how to write clearer prompts, get better AI outputs, and apply prompt engineering to everyday professional tasks.',
    longDescription:
      'Learn the fundamentals of prompt engineering and apply them to everyday workplace tasks.',

    level: 'Beginner–Intermediate',
    duration: 'Approximately 3 hours',
    durationHours: 3,
    hasCertificate: true,

    outcomes: [
      'Write clearer and more specific prompts',
      'Provide relevant context',
      'Define objectives and constraints',
      'Control tone and output format',
      'Improve weak prompts',
      'Create reusable workplace prompts',
      'Evaluate AI outputs critically',
      'Apply prompting to realistic workplace situations',
    ],

    includes: [
      'Video lessons',
      'Knowledge checks',
      'Prompt worksheets',
      'Practical exercises',
      'Downloadable prompt workbook',
      'Final assessment',
      'Certificate of Completion',
    ],

    resources: [
      { id: 'pe-r1', title: 'Prompt Engineering Workbook', type: 'PDF', file: '' },
      { id: 'pe-r2', title: 'Prompt Template Library', type: 'PDF', file: '' },
      { id: 'pe-r3', title: 'Workplace Prompt Examples', type: 'PDF', file: '' },
      { id: 'pe-r4', title: 'Course Summary', type: 'PDF', file: '' },
    ],

    modules: [
      {
        id: 'pe-m1',
        title: 'Introduction to Prompt Engineering',
        lessons: [
          {
            id: 'pe-l1',
            title: 'What Is Prompt Engineering?',
            durationMinutes: 10,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: null,
            exercise: null,
          },
          {
            id: 'pe-l2',
            title: 'Why Word Choice Matters',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: {
              id: 'pe-q1',
              title: 'Knowledge Check',
              questions: [],
            },
            exercise: null,
          },
          {
            id: 'pe-l3',
            title: 'The Anatomy of a Strong Prompt',
            durationMinutes: 15,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: {
              id: 'pe-w1',
              title: 'Prompt Structure Worksheet',
              type: 'PDF',
              file: '',
            },
            quiz: null,
            exercise: null,
          },
        ],
      },
      {
        id: 'pe-m2',
        title: 'Building Better Prompts',
        lessons: [
          {
            id: 'pe-l4',
            title: 'Context and Specificity',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: null,
            exercise: {
              id: 'pe-e1',
              title: 'Improve This Prompt',
              scenario: '',
              task: '',
              modelAnswer: '',
              keyConsiderations: [],
            },
          },
          {
            id: 'pe-l5',
            title: 'Role, Task and Objective',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: {
              id: 'pe-q2',
              title: 'Knowledge Check',
              questions: [],
            },
            exercise: null,
          },
          {
            id: 'pe-l6',
            title: 'Tone, Audience and Constraints',
            durationMinutes: 15,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: {
              id: 'pe-w2',
              title: 'Tone and Audience Worksheet',
              type: 'PDF',
              file: '',
            },
            quiz: null,
            exercise: null,
          },
        ],
      },
      {
        id: 'pe-m3',
        title: 'Prompting at Work',
        lessons: [
          {
            id: 'pe-l7',
            title: 'Emails and Professional Writing',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: null,
            exercise: null,
          },
          {
            id: 'pe-l8',
            title: 'Reports, Presentations and Summaries',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: null,
            exercise: {
              id: 'pe-e2',
              title: 'Build a Reusable Workplace Prompt',
              scenario: '',
              task: '',
              modelAnswer: '',
              keyConsiderations: [],
            },
          },
          {
            id: 'pe-l9',
            title: 'Improving and Iterating Prompts',
            durationMinutes: 12,
            videoUrl: '',
            intro: '',
            objectives: [],
            takeaways: [],
            resource: null,
            quiz: {
              id: 'pe-q3',
              title: 'Knowledge Check',
              questions: [],
            },
            exercise: null,
          },
        ],
      },
    ],

    finalAssessment: {
      id: 'pe-final',
      title: 'Workplace Prompt Challenge',
      description:
        'Learners create and improve three prompts based on realistic workplace situations.',
      passingScore: 70,
      questions: [],
    },

    certificate: {
      title: 'Certificate of Completion',
      description:
        'Awarded after completing all required lessons, exercises and the final assessment.',
    },
  },
]

/* ------------------------------------------------------------------ *
 * HELPERS
 * Used by the pages so no component has to walk the data structure.
 * ------------------------------------------------------------------ */

export function getCourse(slug) {
  return courses.find((c) => c.slug === slug) || null
}

export function getCoursesByAudience(audience) {
  return courses.filter((c) => c.audience === audience)
}

export function getPath(id) {
  return paths.find((p) => p.id === id) || null
}

/** Every lesson in a course, flattened in order, each tagged with its module. */
export function getLessons(course) {
  if (!course) return []
  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title,
    }))
  )
}

export function getLesson(course, lessonId) {
  return getLessons(course).find((l) => l.id === lessonId) || null
}

/** The lesson before and after a given lesson, for prev/next navigation. */
export function getLessonNeighbours(course, lessonId) {
  const lessons = getLessons(course)
  const index = lessons.findIndex((l) => l.id === lessonId)
  if (index === -1) return { previous: null, next: null, index: -1, total: lessons.length }
  return {
    previous: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
    index,
    total: lessons.length,
  }
}

/** Course statistics, derived rather than hardcoded, so they stay accurate. */
export function getCourseStats(course) {
  if (!course) return { lessons: 0, quizzes: 0, exercises: 0, modules: 0 }
  const lessons = getLessons(course)
  return {
    modules: course.modules.length,
    lessons: lessons.length,
    // knowledge checks + the final assessment
    quizzes: lessons.filter((l) => l.quiz).length + (course.finalAssessment ? 1 : 0),
    exercises: lessons.filter((l) => l.exercise).length,
  }
}

/** Total of everything a learner must complete — used for progress percentage. */
export function getCompletableItems(course) {
  if (!course) return []
  const items = getLessons(course).map((l) => ({ type: 'lesson', id: l.id }))
  if (course.finalAssessment) {
    items.push({ type: 'assessment', id: course.finalAssessment.id })
  }
  return items
}