# Consultant Portfolio Website

A nine-page portfolio website built for a PhD researcher and AI communication consultant, delivered as a paid client project.

**Live site:** https://janasaab.vercel.app

## Overview

The client needed a professional web presence that presents research, services and speaking work to an academic and corporate audience — something to send people to instead of a PDF CV. The site was designed and built from scratch: structure, layout, content flow and deployment. It is now in a second phase of work.

## Features

- Nine responsive pages covering profile, research, services, media and contact
- Mobile navigation menu with animated open and close transitions
- Interactive accordions for dense research and service content
- Image carousels for media and event galleries
- Contact form with email delivery via Formspree, routed straight to the client's inbox
- Deployed on Vercel with a custom domain and automatic redeploys on every push

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | React 18 |
| Build | Vite |
| Routing | React Router |
| Styling | Tailwind CSS |
| Forms | Formspree |
| Hosting | Vercel |

## Delivery notes

- 40+ client-supplied images optimised before deployment to keep page weight low on mobile connections
- Continuous deployment from `main`, so content changes requested by the client go live within minutes
- Built and handed over as a live client engagement, not a demo

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

## Roadmap — phase two (in progress)

Extending the site from a static brochure into a tutorial platform:

- User accounts and authentication
- Structured lesson content with progress tracking
- Moving from static pages to a database-backed backend

## Contact

Built by **Liana Zouher Jomaa** — [GitHub](https://github.com/lianajomaa) · lianajomaa95@gmail.com
