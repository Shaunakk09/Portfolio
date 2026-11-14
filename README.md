# Shaunak Ahluwalia — Product × Engineering Portfolio

A creative, responsive portfolio for Shaunak Ahluwalia. Built on React 18 / Create React App, preserving the original repo assets and standard Netlify `npm run build` pipeline.

## What is included
- Personal hero with a real headshot, scroll-reactive code fragments, semantic structure and mobile-first typography.
- Two genuine independent product case studies: The Print Lab AI and XChange. The Print Lab brand art is copied from the owner's `FrameX` repository; XChange brand SVGs come from the owner's `xchange` repository.
- Real website screenshot loaded via third-party thumbnail service when available, with a local photographic fallback; actual wall art photography is from FrameX. A screenshot service is an external dependency and is not guaranteed to be available on every visit.
- Confidential professional work at Sumtracker and Paytm presented separately as employment experience.
- Full internships and earlier engineering project archive with original artwork.
- Live, repository-switchable GitHub commit graph generated from public GitHub commit parent SHAs (works without GitHub credentials, within GitHub's anonymous rate limit).
- Certifications vs. completed learning courses distinguished, and volunteering included.
- Accessibility: reduced-motion support, responsive navigation, keyboard-operable case-study modals, live region for commit fetching.

## Develop

```bash
npm install
npm start
```

## Deploy

```bash
npm run build
```

Netlify build command: `npm run build`; publish directory: `build`.

## Content notes

All company outcomes and data are sourced from the user's resume; company product mock-ups were deliberately removed to avoid confusing employment work with independently owned products. Clothes Box Foundation has been included conservatively because dates and specific responsibilities have not yet been supplied. Older project screenshot assets remain in `src/components/Pages/icons/projects`. Personal headshot and Navjyoti logo were supplied by the user.

## Source provenance

- The Print Lab brand assets: `Shaunakk09/FrameX` (`public/the-print-lab-logo-light-mode.png`, `public/hero-poster-wall.jpg`, `public/customer-prints/gojo.jpeg`).
- XChange brand assets: `Shaunakk09/xchange` (`public/xchange-mark.svg`, `public/xchange-lockup.svg`). The requested Focusback repository was not found in the connected GitHub account, so the actual XChange assets were sourced from its own repository.
- Headshot and Navjyoti Foundation logo: user supplied.

No GitHub private data or credentials are exposed through this public site.
