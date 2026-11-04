<div align="center">
  <img alt="Logo" src="https://www.reysanchez.dev/logo/logo-180x180.png" width="100" />
</div>

<h1 align="center">
  Portfolio Website
</h1>

<p align="center">
  A portfolio of work built with <a href="https://nextjs.org" target="_blank">Next.js</a> and <a href="https://react.dev" target="_blank">React 19</a>, hosted with <a href="https://vercel.com/" target="_blank">Vercel</a>. (<a href="https://reysanchez.dev" target="_blank">reysanchez.dev</a>)
</p>

![App Screenshot](https://www.reysanchez.dev/assets/share.png)

## Tech Stack

Declared in `package.json`:

- **Next.js** 16.2 (`next.config.ts`, Turbopack build)
- **React** 19.2 / **React DOM** 19.2
- **TypeScript** 5 (`tsconfig.json`; the current source is still plain JavaScript)
- **Tailwind CSS** 4 via `@tailwindcss/postcss` (`postcss.config.mjs`), with `tailwind-merge`, `tailwindcss-animate`, `clsx`, `class-variance-authority`
- **Radix UI** primitives: dialog, select, tabs, label, slot, progress, separator
- **Three.js** 0.185 with **React Three Fiber** 9, **Drei** 10, **Rapier** 2
- **Framer Motion** 12
- **Embla Carousel** 8
- **React Hook Form** 7, **Zod** 4, `@hookform/resolvers`
- **Lucide React** icons
- **EmailJS** (`@emailjs/browser` 4)
- **LogRocket** 9
- **ESLint** 9 with `eslint-config-next`
- **Node**: `>=20.9.0` (the `engines` field of the installed `next` package; this repo has no `.nvmrc` and no `engines` field of its own)

See **Migration status** below before relying on this list: the source code does not use most of it yet.

## Migration status

This repo is partway through a move from Create React App + styled-components to Next.js. `package.json` and the config files (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`) describe the target stack. The code in `src/` is still the old app:

- `src/index.js` is a CRA-style entry (`ReactDOM.createRoot(document.getElementById("root"))`) and `public/index.html` is the CRA template. There is no `src/app/` directory. Next.js picks up `src/pages/index.js` as a Pages Router route, so `next build` compiles the old source.
- The source imports libraries that are **not declared** in `package.json`: `styled-components` (every component), `swiper` (`src/components/projectSwiper.js`), `tua-body-scroll-lock` (`src/pages/index.js`), `react-device-detect` (`src/App.js`, `src/components/loading.js`) and `react-scroll` (`src/components/navBar.js`). Nothing in `src/` imports Tailwind, Radix, Embla, React Hook Form, Zod or Lucide yet.
- Environment variables use the CRA `REACT_APP_*` prefix, which Next.js does not expose to the browser (it expects `NEXT_PUBLIC_*`).
- `package-lock.json` is from the old app (`portfolio-v1`, React 18, Framer Motion 7, Fiber 8) and does not match `package.json`. See the install note below.

Finishing the migration is a separate task; the commands below are documented as they behave today.

## Installation

Install dependencies

```bash
  npm install
```

**Current state: fails.** The stale `package-lock.json` makes npm resolve `@react-three/drei@9.x`, which conflicts with the declared `@react-three/drei@^10.7.7` and `react@19.2.4` (`ERESOLVE could not resolve`). Removing `package-lock.json` first lets `npm install` complete (476 packages, Node 22 / npm 10). Do not commit the regenerated lockfile unless that is the task.

Start the development server

```bash
  npm run dev
```

Runs `next dev`. Not verified in this pass; it compiles the same source as `npm run build`, so expect the same unresolved imports.

## Building for Production

```bash
  npm run build
```

Runs `next build` (Turbopack). **Current state: fails** with 26 `Module not found` errors, all for the undeclared imports listed in Migration status (`styled-components`, `swiper/*`, `tua-body-scroll-lock`, `react-device-detect`, `react-scroll`). It will build once the migration completes or those packages are declared.

Serve a production build

```bash
  npm start
```

Runs `next start`. This serves a previous `next build` output; it is **not** a dev server and has nothing to serve until the build passes.

## Linting

```bash
  npm run lint
```

Runs `eslint` with `eslint.config.mjs`. **Current state: fails** with 25 problems (12 errors, 13 warnings) in the existing `src/` code, mostly `react-hooks/*` rules and unused variables.

## Tests

There is no `test` script in `package.json` and no test suite in the repo.

## Environment variables

The code reads these variables (names only; values are never committed):

- `REACT_APP_EMAILJS_PUBLIC_KEY`
- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_LOADING_TIME`
- `REACT_APP_SHOW_LOADING`

`.env*` files are gitignored (except `.env.example`). As noted above, the `REACT_APP_` prefix will need to become `NEXT_PUBLIC_` for Next.js to expose them to the browser.
