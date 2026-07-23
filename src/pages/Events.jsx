import { useState } from 'react'
import e1 from '../assets/events/event1.webp'
import e2 from '../assets/events/event2.webp'
import e3 from '../assets/events/event3.webp'
import e4 from '../assets/events/event4.webp'
import e5 from '../assets/events/event5.webp'
import e6 from '../assets/events/event6.webp'
import e7 from '../assets/events/event7.webp'
import e8 from '../assets/events/event8.webp'
import e9 from '../assets/events/event9.webp'
import e10 from '../assets/events/event10.webp'
import e11 from '../assets/events/event11.webp'
import e12 from '../assets/events/event12.webp'
import e13 from '../assets/events/event13.webp'
import e14 from '../assets/events/event14.webp'
import e15 from '../assets/events/event15.webp'
import e16 from '../assets/events/event16.webp'
import e17 from '../assets/events/event17.webp'
import e18 from '../assets/events/event18.webp'
import e19 from '../assets/events/event19.webp'
import e20 from '../assets/events/event20.webp'
import e21 from '../assets/events/event21.webp'

function Events() {
  const events = [
    { caption: "Kuwait Digital Startup Campus", image: e1 },
    { caption: "Nexus Event in Kuwait", image: e2 },
    { caption: "Tech Conference", image: e3 },
    { caption: "LinkedIn University Workshop", image: e4 },
    { caption: "Oscar Award Winner", image: e5 },
    { caption: "Women in Data Science at AUB", image: e6 },
    { caption: "Conference Participation in Jordan", image: e7 },
    { caption: "Academic Writing Workshop for Medicine Students", image: e8 },
    { caption: "Doctoral Defense Day", image: e9 },
    { caption: "Open Access and Research Publications", image: e10 },
    { caption: "AUB Conference", image: e11 },
    { caption: "Scopus Workshop", image: e12 },
    { caption: "Kon Event in Kuwait", image: e13 },
    { caption: "Kafo Event in Kuwait", image: e14 },
    { caption: "Founder Story at Sabah Al Ahmad Center", image: e15 },
    { caption: "Kuwait Information Technology Society", image: e16 },
    { caption: "AI in Education Event", image: e17 },
    { caption: "GIL Mentor — UNICEF", image: e18 },
    { caption: "Oscar Award Ceremony", image: e19 },
    { caption: "Youth Forum at LAU", image: e20 },
    { caption: "British Council", image: e21 },
  ]

  const [index, setIndex] = useState(0)
  const next = () => setIndex((i) => (i + 1) % events.length)
  const prev = () => setIndex((i) => (i - 1 + events.length) % events.length)
  const ev = events[index]

  return (
    <div>
      {/* NAVY header band */}
      <section className="bg-navy px-8 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.75 w-1.75 bg-baby" />
            <span className="text-xs tracking-[0.2em] text-white">EVENTS</span>
          </div>
          <h1 className="font-serif text-3xl font-medium text-white md:text-4xl">
            Memorable Moments
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-loose text-white">
            Highlights from conferences, workshops, speaking engagements, and
            professional events.
          </p>
        </div>
      </section>

      {/* WHITE carousel */}
      <section className="bg-white px-8 py-16 md:px-12">
        <div className="mx-auto max-w-3xl">

          <div className="flex items-center gap-4">

            <button
              onClick={prev}
              aria-label="Previous"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy/20 bg-white text-lg text-navy transition hover:bg-navy hover:text-white"
            >
              ‹
            </button>

            <div className="flex flex-1 flex-col items-center">
              <div className="flex h-104 w-full items-center justify-center bg-white">
                <img
                  key={ev.image}
                  src={ev.image}
                  alt={ev.caption}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="mt-5 text-center font-serif text-base font-medium text-navy">
                {ev.caption}
              </p>
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
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to event ${i + 1}`}
                className={`h-2 rounded-full transition ${
                  i === index ? "w-5 bg-navy" : "w-2 bg-navy/25 hover:bg-navy/50"
                }`}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-navy">
            {index + 1} / {events.length}
          </p>

        </div>
      </section>
    </div>
  )
}

export default Events