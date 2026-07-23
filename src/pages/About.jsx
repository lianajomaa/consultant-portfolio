import aboutPhoto from '../assets/janaheroimage.webp'

function About() {
  const combines = ["Communication", "AI", "Natural Language Processing", "Applied Linguistics", "Research"]
  const highlights = [
    "PhD Researcher", "Communication Consultant", "NLP Specialist",
    "Corporate Trainer", "Conference & Keynote Speaker", "Content Strategist",
  ]

  return (
    <div>
      {/* NAVY header — Welcome + photo */}
      <section className="bg-navy px-8 py-16 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:gap-16">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-1.75 w-1.75 bg-baby" />
              <span className="text-xs tracking-[0.2em] text-baby">WELCOME</span>
            </div>
            <h1 className="font-serif text-3xl font-medium text-white md:text-4xl">Meet Jana!</h1>
            <p className="mt-5 text-sm leading-loose text-white md:text-base">
              My journey began with a passion for language, communication, and
              understanding how people create meaning. Then, it evolved into
              research, university teaching, consulting, and discovering the
              relationship between communication and artificial intelligence.
            </p>
          </div>

          {/* photo on grey background */}
          <div className="h-80 w-64 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <img
              src={aboutPhoto}
              alt="Jana Saab"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHITE — my work combines */}
      <section className="border-b border-slate-100 bg-white px-8 py-14 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 font-serif text-xl font-medium text-navy md:text-2xl">My work combines</h2>
          <div className="flex flex-wrap gap-2.5">
            {combines.map((item) => (
              <span key={item} className="rounded border border-navy bg-white px-4 py-2 text-xs text-navy md:text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHITE — mission & vision */}
      <section className="bg-[#F5F9FD] px-8 py-14 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-3 font-serif text-xl font-medium text-navy md:text-2xl">Mission</h2>
            <p className="text-sm leading-loose text-navy md:text-base">
              My mission is to help professionals and organizations communicate
              effectively, integrate AI tools successfully, and transform research
              into practical actions through strategic communication solutions.
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-serif text-xl font-medium text-navy md:text-2xl">Vision</h2>
            <p className="text-sm leading-loose text-navy md:text-base">
              I aim at creating real impact through offering strong communication,
              embracing digital workplace transformation, and driving change with
              clarity and purpose.
            </p>
          </div>
        </div>
      </section>

      {/* WHITE — professional highlights */}
      <section className="border-t border-slate-100 bg-white px-8 py-14 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 font-serif text-xl font-medium text-navy md:text-2xl">Professional Highlights</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((role) => (
              <div key={role} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-navy md:text-base">
                {role}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About