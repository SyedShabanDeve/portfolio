<div align="center">

# Syed Shaban Ahmad — Developer Portfolio

**Full Stack Developer · MERN &amp; WordPress · Lahore, Pakistan**

[![Build](https://github.com/SyedShabanDeve/portfolio/actions/workflows/build.yml/badge.svg)](https://github.com/SyedShabanDeve/portfolio/actions/workflows/build.yml)
[![Live Site](https://img.shields.io/badge/Live-syedshabandeve.github.io%2Fportfolio-e63946?style=flat-square)](https://syedshabandeve.github.io/portfolio/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![No runtime deps](https://img.shields.io/badge/Runtime%20deps-React%20only-d4a853?style=flat-square)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-6c757d?style=flat-square)](LICENSE)

<a href="https://syedshabandeve.github.io/portfolio/">
  <img src="public/og-image.png" alt="Syed Shaban Ahmad — Full Stack Developer" width="720" />
</a>

**→ [View it live](https://syedshabandeve.github.io/portfolio/)**

</div>

---

## About

A single-page portfolio built from scratch — no template, no page builder, no UI kit, and no
component library. It presents my experience, the work I have shipped, and a direct route to
contact me.

The only runtime dependencies are `react` and `react-dom`. Everything else — the design system,
the icon set, the scroll and reveal behaviour, the theme switching — is written for this project.

## Features

| | |
| --- | --- |
| **Light and dark themes** | A toggle that respects `prefers-color-scheme`, persists the visitor's choice, and applies it in an inline script before first paint so the page never flashes the wrong palette. |
| **Design-token system** | One layer of CSS custom properties drives both palettes, a fluid `clamp()` type scale, spacing, radii and easing. Changing a token changes the whole site. |
| **Section-aware navigation** | The nav highlight tracks whichever section is nearest the top of the viewport, and anchors to the last section at the end of the page. |
| **Scroll progress + back to top** | A single rAF-throttled scroll listener feeds the progress bar, the sticky nav state and the back-to-top button. |
| **Filterable project grid** | Work filters by discipline — full stack, WordPress, open source — with featured builds given a wider card. |
| **Reveal animations** | A reusable `Reveal` component fades content in once, then disconnects its observer so nothing keeps running off-screen. |
| **Validated contact form** | Inline, screen-reader-linked error messages; a valid submission opens the visitor's own mail client with the whole message composed. Nothing routes through a third party. |
| **Downloadable CV** | A typeset, text-selectable PDF plus the original DOCX for applicant tracking systems. |
| **Accessible** | Skip link, semantic landmarks, `aria-invalid` / `aria-describedby` wiring, `aria-pressed` filters, labelled icon links, visible focus rings, and a `prefers-reduced-motion` fallback that disables animation. |
| **SEO and social ready** | Descriptive metadata, canonical URL, Open Graph and Twitter cards, JSON-LD `Person` structured data, `robots.txt`, `sitemap.xml` and a web manifest. |

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Hand-written CSS with custom properties — no framework |
| Icons | Inline SVG sprite in `components/ui/Icon.jsx` — no icon package |
| Linting | ESLint 10 (`react-hooks`, `react-refresh`) |
| CI | GitHub Actions — lint and build on every push and PR |
| Hosting | GitHub Pages via `gh-pages` |

## Running Locally

```bash
git clone https://github.com/SyedShabanDeve/portfolio.git
cd portfolio
npm install
npm run dev
```

Vite prints a local URL, by default `http://localhost:5173/portfolio/`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot module replacement |
| `npm run build` | Produce the optimised production bundle in `dist/` |
| `npm run preview` | Serve the built bundle locally |
| `npm run lint` | Run ESLint across the project |
| `npm run deploy` | Build, then publish `dist/` to GitHub Pages |

## Project Structure

```
portfolio/
├── public/
│   ├── og-image.png              # 1200x630 social preview card
│   ├── logo.svg  favicon.svg     # Brand mark
│   ├── Syed-Shaban-Ahmad-CV.pdf  # Downloadable CV
│   ├── robots.txt  sitemap.xml  site.webmanifest
├── src/
│   ├── data/site.js              # Every piece of page content, in one file
│   ├── styles/
│   │   ├── tokens.css            # Palettes, type scale, spacing, easing
│   │   ├── base.css              # Reset, layout primitives, animations
│   │   └── components.css        # Component classes
│   ├── hooks/
│   │   ├── useTheme.js           # Light/dark with system + localStorage
│   │   ├── useScrollState.js     # Progress, sticky nav, past-the-fold
│   │   ├── useActiveSection.js   # Nav highlight tracking
│   │   ├── useInView.js          # One-shot IntersectionObserver
│   │   └── useTypewriter.js      # Hero role cycling
│   ├── components/
│   │   ├── ui/                   # Icon, Reveal, SectionHead
│   │   └── Navbar · Hero · Marquee · About · Skills
│   │       Experience · Projects · Contact · ContactForm
│   │       Footer · BackToTop
│   ├── index.css                 # Imports the three style layers
│   ├── App.jsx
│   └── main.jsx
├── index.html                    # Metadata, theme boot script, JSON-LD
└── vite.config.js                # `base` is /portfolio/ for GitHub Pages
```

Content lives in `src/data/site.js` and nowhere else — components read from it, so updating a
job, a project or a skill never means touching markup.

## Deployment

```bash
npm run deploy
```

`vite.config.js` sets `base: '/portfolio/'` so hashed assets resolve under the repository
subpath. If you fork this and host it elsewhere, change `base` to match, and update the absolute
URLs in `index.html` (canonical, `og:url`, `og:image`) plus `sitemap.xml`, `robots.txt` and
`site.webmanifest`.

## Contact

- **Email** — [syedshaban785@gmail.com](mailto:syedshaban785@gmail.com)
- **LinkedIn** — [syedshaban785](https://www.linkedin.com/in/syedshaban785)
- **GitHub** — [SyedShabanDeve](https://github.com/SyedShabanDeve)
- **Location** — Lahore, Pakistan · open to remote work

## License

Released under the [MIT License](LICENSE). The code is free to reuse; please replace the personal
content, images, CV and contact details with your own.
