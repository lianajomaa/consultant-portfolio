import { Link } from 'react-router-dom'
import teaserPhoto from '../assets/janaheroimage.webp'

function About() {
  return (
    <section className="border-b border-slate-100 bg-white px-8 py-16 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:gap-16">

        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[7px] w-[7px] border border-navy bg-baby" />
            <span className="text-xs tracking-[0.2em] text-navy">WELCOME</span>
          </div>

          <h2 className="mb-4 font-serif text-2xl font-medium text-navy md:text-3xl">
            Meet Jana!
          </h2>

          <p className="max-w-2xl text-sm leading-loose text-navy md:text-base">
            My journey began with a passion for language, communication, and
            understanding how people create meaning. It evolved into research,
            university teaching, consulting, and discovering the relationship
            between communication and artificial intelligence.
          </p>

          <Link to="/about" className="mt-6 inline-block border-b border-navy pb-0.5 text-sm font-medium text-navy md:text-base">
            More about me →
          </Link>
        </div>

        {/* photo on light grey box */}
        <div className="flex h-72 w-60 flex-shrink-0 items-end justify-center overflow-hidden rounded-xl bg-slate-100">
          <img
            src={teaserPhoto}
            alt="Jana Saab"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </div>

      </div>
    </section>
  )
}

export default About