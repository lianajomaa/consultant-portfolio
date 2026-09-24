# Consultant Portfolio Website

A nine-page portfolio website built for a PhD researcher and AI communication consultant, delivered as a paid client project — currently being extended into a full learning platform.

**Live site:** https://janasaab.vercel.app

## Overview

The client needed a professional web presence that presents research, consulting, training and speaking work to an academic and corporate audience — something to send people to instead of a PDF CV. The site was designed and built from scratch: structure, layout, content flow, deployment and handover.

Phase one is live and in daily use. Phase two, in private development, turns the site from a static brochure into a platform the client can teach on — user accounts, a database-backed course structure, and an admin area she can publish from herself.

## Phase one — the live site

### Features

- Nine responsive pages covering profile, research, services, media and contact
- Mobile navigation menu with animated open and close transitions
- Interactive accordions for dense research and service content
- Image carousels for media and event galleries
- Contact form with email delivery via Formspree, routed straight to the client's inbox
- Deployed on Vercel with automatic redeploys on every push

### Tech stack

| Layer | Tools |
| --- | --- |
| Framework | React 18 |
| Build | Vite |
| Routing | React Router |
| Styling | Tailwind CSS |
| Forms | Formspree |
| Hosting | Vercel |

### Delivery notes

- 40+ client-supplied images optimised before deployment to keep page weight low on mobile connections
- Continuous deployment from `main`, so content changes requested by the client go live within minutes
- Built and handed over as a live client engagement, not a demo

## Phase two — learning platform (in private development)

The static site is being rebuilt around a real backend so the client can sell and deliver courses directly, instead of pointing students to third-party tools.

### Scope

- **Accounts and authentication** — student sign-up, email verification, password reset, session handling
- **Course and lesson structure** — courses contain ordered lessons; lessons carry text, video and downloadable material
- **Progress tracking** — per-student completion state, resume where you left off
- **Admin area** — the client creates, edits, reorders and publishes lessons herself, with no developer involvement
- **Role-based access** — student and admin, enforced on both client and server

### Data model (working draft)

- `User` — profile, role, verification state
- `Course` — title, description, publish state
- `Lesson` — belongs to a course, ordered position, content blocks
- `Enrollment` — links a user to a course
- `Progress` — per user, per lesson, completion state and timestamp

### Open technical decisions

The scope above is settled; the stack is not. These are the choices being weighed before any backend code is written:

- **Backend shape** — a separate Node/Express API, or a full-stack framework where the frontend and API live together. Depends on whether the client ever needs a mobile app against the same backend.
- **Database** — the data is naturally relational (courses contain lessons, students have progress per lesson), which argues for PostgreSQL over a document store.
- **Authentication** — building JWT auth directly, as in my pizza-delivery-app, versus a managed provider. Trade-off is control and cost against time to launch.
- **Video and file delivery** — lesson video is the expensive part; hosting it myself versus embedding a provider changes both the cost model and the build.
- **Payments** — whether the client sells courses through the platform or handles that outside it, which decides whether payment handling is in scope at all.

Each of these is being decided against one constraint: the client must be able to run the platform herself, without a developer, after handover.

### Why it is private

Development happens in a private repository while the client's course content and materials are being produced. This repository holds the live phase-one site. The platform repo will be opened, or its live URL linked here, once it launches.

## Running locally

```bash
git clone https://github.com/lianajomaa/consultant-portfolio.git
cd consultant-portfolio
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`.

```bash
npm run build     # production build
npm run preview   # preview the production build locally
```

## Contact

Built by **Liana Zouher Jomaa** — [GitHub](https://github.com/lianajomaa) · lianajomaa95@gmail.com
