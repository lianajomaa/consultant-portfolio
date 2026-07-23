import scholar from '../assets/pubs/scholar.webp'
import researchgate from '../assets/pubs/researchgate.webp'
import orcid from '../assets/pubs/orcid.webp'

function Publications() {
  const profiles = [
    {
      name: "Google Scholar",
      desc: "Citations, papers, and research metrics.",
      image: scholar,
      link: "https://scholar.google.com/citations?user=oQ6ON0gAAAAJ&hl=en",
    },
    {
      name: "ResearchGate",
      desc: "Publications, projects, and collaborations.",
      image: researchgate,
      link: "https://www.researchgate.net/profile/Jana-Saab-2",
    },
    {
      name: "ORCID",
      desc: "Verified researcher identity and record.",
      image: orcid,
      link: "https://orcid.org/0009-0009-7883-1019",
    },
  ]

  return (
    <div>
      {/* NAVY header band */}
      <section className="bg-navy px-8 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.75 w-1.75 bg-baby" />
            <span className="text-xs tracking-[0.2em] text-white">PUBLICATIONS</span>
          </div>
          <h1 className="font-serif text-3xl font-medium text-white md:text-4xl">
            Research &amp; Publications
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-loose text-white">
            A collection of my academic publications, conference papers, and
            research papers. Explore my full research record on the platforms below.
          </p>
        </div>
      </section>

      {/* WHITE — profile cards */}
      <section className="bg-white px-8 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-36 items-center justify-center border-b border-slate-100 bg-white p-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-navy group-hover:underline">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy">
                    {p.desc}
                  </p>
                  <span className="mt-3 inline-block text-[11px] font-medium text-navy">
                    Visit profile →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Publications