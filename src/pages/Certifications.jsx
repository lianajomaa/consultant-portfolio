import { useState } from 'react'
import ai from '../assets/certs/ai.webp'
import aibusiness from '../assets/certs/aibusiness.webp'
import aiscience from '../assets/certs/aiscience.webp'
import aub from '../assets/certs/aub.webp'
import aubbcer from '../assets/certs/aubbcer.webp'
import britishcousil from '../assets/certs/britishcousil.webp'
import businessemail from '../assets/certs/businessemail.webp'
import coursera from '../assets/certs/coursera.webp'
import digitalmarketing from '../assets/certs/digitalmarketing.webp'
import introtoai from '../assets/certs/introtoai.webp'
import judge from '../assets/certs/judge.webp'
import london from '../assets/certs/london.webp'
import midleeast from '../assets/certs/midleeast.webp'
import remotelearning from '../assets/certs/remotelearning.webp'
import seo from '../assets/certs/seo.webp'
import socialmedia from '../assets/certs/socialmedia.webp'

function Certifications() {
  const certificates = [
    { title: "AI Policies in Scientific Research", issuer: "Harvard GSE · MEPLI", year: "2025", image: aiscience },
    { title: "The Interconnected Classroom in the New Era", issuer: "Harvard GSE · MEPLI", year: "2025", image: midleeast },
    { title: "Introduction to Artificial Intelligence (AI)", issuer: "IBM · Coursera", year: "2022", image: introtoai },
    { title: "Artificial Intelligence for Business Leaders", issuer: "LinkedIn Learning", year: "2023", image: aibusiness },
    { title: "QS Reimagine Education Awards — Judge", issuer: "QS Quacquarelli Symonds", year: "2025", image: judge },
    { title: "Rotaract District 2452 Summit on AI & Digital Transformation", issuer: "Rotaract District 2452", year: "2023", image: ai },
    { title: "Community Based Research: Getting Started", issuer: "UCL & Lebanese University", year: "2024", image: london },
    { title: "Effective Teaching & Learning in Higher Education", issuer: "American University of Beirut", year: "2025", image: aubbcer },
    { title: "REACH Conference", issuer: "American University of Beirut", year: "2024", image: aub },
    { title: "Creating Your Own Learning Materials", issuer: "British Council", year: "2023", image: britishcousil },
    { title: "Academic Adolescence in Remote Learning Forum", issuer: "Kuwait College of Science & Technology", year: "2026", image: remotelearning },
    { title: "Digital Marketing Certified", issuer: "HubSpot Academy", year: "2022", image: digitalmarketing },
    { title: "Social Media Certified", issuer: "HubSpot Academy", year: "2022", image: socialmedia },
    { title: "Improve SEO for Your Ecommerce Site", issuer: "LinkedIn Learning", year: "2023", image: seo },
    { title: "Tips for Writing Business Emails", issuer: "LinkedIn Learning", year: "2023", image: businessemail },
    { title: "Start Writing Prompts Like a Pro", issuer: "Google · Coursera", year: "2023", image: coursera },
  ]

  const areas = [
    "Artificial Intelligence", "Natural Language Processing", "Communication",
    "Research Methods", "Leadership", "Professional Development",
  ]

  const [index, setIndex] = useState(0)
  const next = () => setIndex((i) => (i + 1) % certificates.length)
  const prev = () => setIndex((i) => (i - 1 + certificates.length) % certificates.length)
  const cert = certificates[index]

  return (
    <div>
      {/* NAVY header band */}
      <section className="bg-navy px-8 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.75 w-1.75 bg-baby" />
            <span className="text-xs tracking-[0.2em] text-white">CERTIFICATIONS</span>
          </div>
          <h1 className="font-serif text-3xl font-medium text-white md:text-4xl">
            Professional Development
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-loose text-white">
            I believe that learning is a continuous journey! Here are highlights of
            professional certifications and specialized training completed in areas
            including:
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {areas.map((area) => (
              <span key={area} className="rounded border border-white/20 px-4 py-2 text-xs text-white">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHITE carousel section */}
      <section className="bg-white px-8 py-16 md:px-12">
        <div className="mx-auto max-w-2xl">

          <div className="mb-8 text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-1.75 w-1.75 border border-navy bg-baby" />
              <span className="text-xs tracking-[0.2em] text-navy">A SELECTION OF</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-navy">
              Certificates &amp; Training
            </h2>
          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={prev}
              aria-label="Previous"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy/20 bg-white text-lg text-navy transition hover:bg-navy hover:text-white"
            >
              ‹
            </button>

            {/* just the certificate image — no box */}
            <div className="flex flex-1 flex-col items-center">
              <div className="flex h-80 w-full items-center justify-center">
                <img
                  key={cert.image}
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-base font-medium text-navy">
                  {cert.title}
                </h3>
                <p className="mt-1 text-xs text-navy">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </div>

            <button
              onClick={next}
              aria-label="Next"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy/20 bg-white text-lg text-navy transition hover:bg-navy hover:text-white"
            >
              ›
            </button>

          </div>

          {/* dots */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to certificate ${i + 1}`}
                className={`h-2 rounded-full transition ${
                  i === index ? "w-5 bg-navy" : "w-2 bg-navy/25 hover:bg-navy/50"
                }`}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-navy">
            {index + 1} / {certificates.length}
          </p>

        </div>
      </section>
    </div>
  )
}

export default Certifications