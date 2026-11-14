# Shaunak Ahluwalia — portfolio redesign

A complete React rebuild of the original CRA portfolio, positioning Shaunak as a product thinker with engineering depth. No additional animation libraries are needed.

## Start

```bash
npm install
npm start
```

Production: `npm run build`. Deploy the root folder to Netlify or Vercel as a Create React App project (build command `npm run build`, publish directory `build`).

## Highlights
- Responsive, editorial, scroll-driven site with a moving code-rain layer and reveal-on-scroll.
- Four interactive case studies including The Print Lab AI; results and dates based on the supplied resume.
- Product + engineering capabilities, chronology, and contact links.
- GitHub terminal that fetches the newest commits from **public** repositories at runtime, with historically verified fallbacks when GitHub is rate-limited.
- Reduced-motion support, keyboard-accessible modal, offsite link safety, no tracking scripts.
- All project screenshots shown in the cards are clearly labelled illustrative/concept visuals, not screenshots of real third-party interfaces.

## Integrate into existing repository

Replace `src/App.js`, `src/index.js` and `public/index.html`; add `src/portfolio.css`; optionally use the new `package.json` and this README. Existing files/assets may remain unchanged and are unused by the new app.

## Important

GitHub public API is rate-limited for unauthenticated browsers. The terminal displays real commits when available, or an explicit fallback using verified commits in the 2024 Portfolio repository. It does not expose private repositories or invent contributions.

The resume PDF is **not** published with the site: it contains personal details not needed for the public portfolio. If you want a public download, create a redacted resume first.

Update `cases` in `src/App.js` as you gather further case-study artifacts, discovery evidence, interview notes, and product screenshots. Business outcomes in this build are resume claims and should be checked against the latest internal data before public launch.
