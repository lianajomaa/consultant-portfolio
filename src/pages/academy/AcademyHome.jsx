
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Download,
  PenLine,
  PlayCircle,
  Briefcase,
} from 'lucide-react'
import { courses, paths } from '../../data/courses'
import CourseCard from '../../components/academy/CourseCard'

/* Section heading used throughout, keeps hierarchy consistent. */
function SectionHeading({ eyebrow, title, supporting }) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <div className="mb-4 flex items-center gap-3">
          <span className="h-[7px] w-[7px] border border-navy bg-baby" />
          <span className="text-xs tracking-[0.2em] text-navy">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-navy md:text-4xl">
        {title}
      </h2>

      {supporting && (
        <p className="mt-3 text-sm leading-relaxed text-navy/80 md:text-base">
          {supporting}
        </p>
      )}
    </div>
  )
}

const steps = [
  {
    number: '01',
    title: 'Watch',
    text: 'Watch short, focused video lessons.',
  },
  {
    number: '02',
    title: 'Practice',
    text: 'Apply each concept through practical activities.',
  },
  {
    number: '03',
    title: 'Check',
    text: 'Test your understanding with short quizzes.',
  },
  {
    number: '04',
    title: 'Apply',
    text: 'Complete practical tasks based on realistic situations.',
  },
]

const included = [
  {
    icon: PlayCircle,
    title: 'Short Video Lessons',
    text: 'Focused lessons designed to make learning manageable.',
  },
  {
    icon: CheckCircle2,
    title: 'Knowledge Checks',
    text: 'Short quizzes to reinforce key concepts.',
  },
  {
    icon: PenLine,
    title: 'Practical Exercises',
    text: 'Apply what you learn instead of only watching videos.',
  },
  {
    icon: Download,
    title: 'Downloadable Resources',
    text: 'Worksheets, templates and course materials.',
  },
  {
    icon: Briefcase,
    title: 'Real-World Scenarios',
    text: 'Practice with situations relevant to university or the workplace.',
  },
  {
    icon: Award,
    title: 'Certificate of Completion',
    text: 'Receive a certificate after successfully completing the course requirements.',
  },
]

const principles = [
  {
    title: 'Practical',
    text: 'Learn skills you can immediately apply.',
  },
  {
    title: 'Focused',
    text: 'No unnecessary theory or overly long courses.',
  },
  {
    title: 'Structured',
    text: 'Every course follows a clear learning path.',
  },
  {
    title: 'Human-Centered',
    text: 'Technology supports learning; it does not replace critical thinking and human judgment.',
  },
]

function AcademyHome() {
  return (
    <>
      {/* MAIN SECTION */}
      <section className="border-b border-slate-100 bg-white px-8 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-6 bg-navy" />
              <span className="text-xs tracking-[0.2em] text-navy">
                LEARN · PRACTICE · APPLY
              </span>
            </div>

            <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy md:text-5xl">
              Learn the skills you need to study, work, and communicate better.
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-navy/80 md:text-base">
              Practical, focused online courses designed to help university
              students and professionals build skills they can actually use.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#courses"
                className="rounded-md bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-navy/90 md:text-base"
              >
                Explore Courses
              </a>

              <a
                href="#paths"
                className="border-b border-navy pb-0.5 text-sm font-medium text-navy md:text-base"
              >
                Choose your path →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR LEARNING PATH */}
      <section
        id="paths"
        className="scroll-mt-20 border-b border-slate-100 bg-white px-8 py-16 md:px-12 md:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="WHERE TO START"
            title="Choose Your Learning Path"
            supporting="Different goals require different skills. Choose the path that fits where you are today."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {paths.map((path) => (
              <div
                key={path.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-7 transition hover:border-navy/30 md:p-8"
              >
                <h3 className="font-serif text-2xl font-medium text-navy">
                  {path.label}
                </h3>

                <p className="mt-2 text-sm font-medium text-navy md:text-base">
                  {path.tagline}
                </p>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/80">
                  {path.description}
                </p>

                <Link
                  to={path.route}
                  className="mt-7 inline-flex w-fit items-center gap-2 border-b border-navy pb-0.5 text-sm font-medium text-navy"
                >
                  {path.cta}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section
        id="courses"
        className="scroll-mt-20 border-b border-slate-100 bg-slate-50 px-8 py-16 md:px-12 md:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="COURSES"
            title="Start Learning"
            supporting="Focused courses. Short lessons. Practical application."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW LEARNING WORKS */}
      <section className="border-b border-slate-100 bg-white px-8 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="Learn. Practice. Apply."
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.number}
                className="border-t border-navy/20 pt-5"
              >
                <span className="font-serif text-2xl text-navy/40">
                  {step.number}
                </span>

                <h3 className="mt-2 text-base font-medium text-navy">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-navy/80">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="border-b border-slate-100 bg-slate-50 px-8 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="WHAT'S INCLUDED"
            title="Everything You Need to Learn Effectively"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {included.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <Icon
                  size={22}
                  className="text-navy"
                  aria-hidden="true"
                />

                <h3 className="mt-4 text-base font-medium text-navy">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-navy/80">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THIS PLATFORM */}
      <section className="border-b border-slate-100 bg-white px-8 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="WHY THIS PLATFORM"
            title="Learning Designed for Real Life"
          />

          <div className="grid max-w-3xl gap-x-12 gap-y-8 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title}>
                <h3 className="text-base font-medium text-navy">
                  {principle.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-navy/80">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy px-8 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white md:text-4xl">
            Ready to start learning?
          </h2>

          <p className="mt-3 text-sm text-white/80 md:text-base">
            Choose the path that fits your goals.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/students"
              className="w-full rounded-md bg-white px-6 py-3 text-sm font-medium text-navy transition hover:bg-baby sm:w-auto"
            >
              I&apos;m a University Student
            </Link>

            <Link
              to="/professionals"
              className="w-full rounded-md border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 sm:w-auto"
            >
              I&apos;m a Professional
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AcademyHome

