# Durga Printers — Website (Next.js)

A modern, premium rebuild of the Durga Printers site: Next.js 14 (App Router), TypeScript,
Tailwind CSS, and Framer Motion. Built from the brand identity in your original HTML/CSS
(red / ink-black / white, Playfair Display + Inter + JetBrains Mono).

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build && npm run start   # production build
```

Requires internet access on first build/dev run — `next/font/google` fetches
Playfair Display, Inter, and JetBrains Mono at build time and self-hosts them
(no runtime calls to Google after that).

## What's included

- **Dark glass navbar** (brand + theme toggle + CTA on all sizes; full link list on desktop)
- **Persistent mobile bottom tab bar** (Home / Heritage / Services / Gallery / Contact) with
  scroll-spy active state — the app-like navigation pattern from your reference video
- **Hero** with a bold glowing gradient-orb backdrop and a pill-shaped eyebrow badge
- **Animated stat counters**
- **Heritage timeline** (1996 → today) + "why us" grid
- **Signature card** — a hand-built, flippable devotional pocket-card mockup (this is the
  site's signature visual element, built in CSS/SVG since no photography was supplied)
- **Services bento grid** with glass/glow cards and a spec modal (size / finish / material / price)
- **Testimonials**
- **Gallery** with category filtering and glow-on-hover tiles
- **FAQ accordion**
- **CTA band**
- **Contact section** with a validated enquiry form that opens a pre-filled WhatsApp chat,
  plus an embedded Google Map
- **WhatsApp floating action button** (repositioned above the mobile tab bar)
- Dark mode by default (toggle to light in the navbar), reduced-motion support, keyboard-focus
  states, semantic HTML, SEO metadata

## About the logo & images

Only `favicon.svg` was supplied (a red rounded square with a serif "D"). That mark is now
used as the real logo in the navbar and footer at `public/logo.svg` / `public/favicon.svg`.

**`durga-files/` and `assets/` (real photos + logo) have not come through on any upload so
far** — only HTML/CSS/JS files and a reference video have arrived. Once those files are
actually attached, drop them into `public/images/...` and:

1. In `components/sections/Services.tsx` and `components/sections/Gallery.tsx`, replace the
   icon-tile `<button>`/`<div>` background with `next/image` pointing at your photo.
2. In `components/sections/Signature.tsx`, replace the two `CardFace` divs with your actual
   front/back card photography if you'd rather use real photos than the illustrated mockup.
3. If you have a separate logo file (distinct from the favicon), swap `public/logo.svg`.

## Structure

```
app/                 # App Router: layout, globals.css, page.tsx
components/
  layout/            # Navbar, Footer, WhatsAppFloat
  sections/          # Hero, Stats, WhyUs, Signature, Services, Testimonials, Gallery, FAQ, CTA, Contact
  ui/                 # Button, Reveal (scroll animation), AnimatedCounter, Modal, Accordion, ThemeToggle
lib/
  data.ts            # All copy/content — services, stats, timeline, testimonials, FAQ
  utils.ts           # cn() class-merge helper
public/
  favicon.svg, logo.svg
```

## Deploying

Ready for Vercel: push to a Git repo and import it at vercel.com/new, or run `vercel` from
this folder with the Vercel CLI. No environment variables are required.
