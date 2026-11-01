import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Publications", path: "/publications" },
    { name: "Training", path: "/training" },
    { name: "Certifications", path: "/certifications" },
    { name: "Blog", path: "/blog" },
    { name: "Events", path: "/events" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4 md:px-12">

        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-xs font-semibold tracking-wide text-white">
            JS
          </span>
          <span className="text-base font-semibold text-navy">Jana Saab</span>
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-5 lg:flex">
          <ul className="flex items-center gap-6 text-sm text-navy">
            {links.map((link) => {
              const active = location.pathname === link.path
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`border-b-2 pb-1 transition ${
                      active ? "border-navy font-medium" : "border-transparent hover:border-navy/30"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* entry point into the learning platform */}
          <Link
            to="/learn"
            className="border-b-2 border-baby pb-1 text-sm font-medium text-navy transition hover:border-navy"
          >
            Courses
          </Link>

          <Link to="/contact" className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-white">
            Contact
          </Link>
        </div>

        {/* mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="flex flex-col gap-[5px] lg:hidden"
        >
          <span className={`h-0.5 w-6 bg-navy transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-navy transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-navy transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>

      </nav>

      {/* mobile dropdown */}
      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <ul className="flex flex-col px-8 py-4">
            {links.map((link) => {
              const active = location.pathname === link.path
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 text-sm text-navy ${active ? "font-semibold" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                to="/learn"
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm font-medium text-navy"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-md bg-navy px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar