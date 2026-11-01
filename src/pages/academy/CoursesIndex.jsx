import { courses, paths } from '../../data/courses'
import CourseCard from '../../components/academy/CourseCard'

function CoursesIndex() {
  return (
    <>
      <section className="border-b border-slate-100 bg-white px-8 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-0.5 w-6 bg-navy" />
            <span className="text-xs tracking-[0.2em] text-navy">COURSES</span>
          </div>

          <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy md:text-5xl">
            All Courses
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-navy/80 md:text-base">
            Focused courses. Short lessons. Practical application.
          </p>
        </div>
      </section>

      {paths.map((path, index) => {
        const list = courses.filter((course) => course.audience === path.id)
        if (list.length === 0) return null

        return (
          <section
            key={path.id}
            className={`border-b border-slate-100 px-8 py-16 md:px-12 md:py-20 ${
              index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
            }`}
          >
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-[7px] w-[7px] border border-navy bg-baby" />
                <span className="text-xs tracking-[0.2em] text-navy">
                  {path.label.toUpperCase()}
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {list.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

export default CoursesIndex