
import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom'

/* ------------------------------------------------------------------ *
 * SCROLL TO TOP
 * ------------------------------------------------------------------ */

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

/* ------------------------------------------------------------------ *
 * HEADER
 * ------------------------------------------------------------------ */

const navLinks = [
  {
    name: 'Home',
    path: '/learn',
    end: true,
  },
  {
    name: 'University Students',
    path: '/students',
  },
  {
    name: 'Professionals',
    path: '/professionals',
  },
  {
    name: 'Courses',
    path: '/courses',
  },
  {
    name: 'About',
    path: '/about',
  },
]

function AcademyHeader() {
  const [open, setOpen] = useState(false)

  function closeMenu() {
    setOpen(false)
  }

  function getDesktopLinkClass({ isActive }) {
    return [
      'border-b-2',
      'pb-1',
      'transition',
      isActive
        ? 'border-navy font-medium'
        : 'border-transparent hover:border-navy/30',
    ].join(' ')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4 md:px-12">

        {/* Logo */}
        <Link
          to="/learn"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-xs font-semibold tracking-wide text-white">
            JS
          </span>

          <span className="text-base font-semibold text-navy">
            Jana Saab
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 lg:flex">
          <ul className="flex items-center gap-6 text-sm text-navy">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  className={getDesktopLinkClass}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-slate-200 pl-5">
            <Link
              to="/dashboard"
              className="text-sm text-navy hover:underline"
            >
              Log In
            </Link>

            <Link
              to="/learn#paths"
              className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-navy/90"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-8 w-8 items-center justify-center text-xl text-navy lg:hidden"
        >
          {open ? '×' : '☰'}
        </button>
      </nav>

      {/* Mobile navigation */}
      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <ul className="flex flex-col px-8 py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      'block py-2.5 text-sm text-navy',
                      isActive ? 'font-semibold' : '',
                    ].join(' ')
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            <li className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="py-1 text-sm text-navy"
              >
                Log In
              </Link>

              <Link
                to="/learn#paths"
                onClick={closeMenu}
                className="rounded-md bg-navy px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

/* ------------------------------------------------------------------ *
 * FOOTER
 * ------------------------------------------------------------------ */

const footerLinks = [
  {
    name: 'Home',
    path: '/learn',
  },
  {
    name: 'University Students',
    path: '/students',
  },
  {
    name: 'Professionals',
    path: '/professionals',
  },
  {
    name: 'Courses',
    path: '/courses',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
]

function AcademyFooter() {
  const firstColumnLinks = footerLinks.slice(0, 3)
  const secondColumnLinks = footerLinks.slice(3)

  return (
    <footer className="bg-navy px-8 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">

        {/* Footer top */}
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1B3D5C] text-[10px] font-semibold text-white">
                JS
              </span>

              <span className="text-sm font-medium text-white">
                Jana Saab
              </span>
            </div>

            <p className="text-[11px] leading-relaxed text-white/80">
              Practical, focused online courses for university students and
              professionals.
            </p>
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 sm:gap-x-14">

            <div className="flex flex-col gap-2">
              {firstColumnLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[11px] text-white/80 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {secondColumnLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[11px] text-white/80 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>

          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#2C4A66] pt-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[10px] text-white/70">
            © {new Date().getFullYear()} Jana Saab. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">

            <Link
              to="/terms"
              className="text-[10px] text-white/70 hover:text-white"
            >
              Terms &amp; Conditions
            </Link>

            <Link
              to="/privacy"
              className="text-[10px] text-white/70 hover:text-white"
            >
              Privacy Policy
            </Link>

            <a
              href="https://www.linkedin.com/in/jana-saab/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-white/70 hover:text-white"
            >
              LinkedIn
            </a>

          </div>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ *
 * ACADEMY LAYOUT
 * ------------------------------------------------------------------ */

function AcademyLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />

      <AcademyHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <AcademyFooter />
    </div>
  )
}

export default AcademyLayout
