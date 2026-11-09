<div align="center">
  <img alt="Logo" src="https://www.reysanchez.dev/logo/logo-180x180.png" width="100" />
</div>

<h1 align="center">
  Portfolio Website
</h1>

<p align="center">
  A portfolio of work built with <a href="https://react.dev" target="_blank">React</a> and <a href="https://threejs.org" target="_blank">Three.js</a>, hosted with <a href="https://vercel.com/" target="_blank">Vercel</a>. (<a href="https://reysanchez.dev" target="_blank">reysanchez.dev</a>)
</p>

![App Screenshot](https://www.reysanchez.dev/assets/share.png)

## Tech Stack

- **React** 18 via **Create React App** (`react-scripts` 5)
- **styled-components** 5
- **Three.js** 0.150 with **React Three Fiber** 8, **Drei** 9, **Rapier** 1
- **Framer Motion** 7
- **Swiper** 12
- **react-scroll**, **react-device-detect**, **tua-body-scroll-lock**
- **EmailJS** (`@emailjs/browser` 3)
- **LogRocket** 9

## Installation

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm start
```

Serves the app at http://localhost:3000.

## Building for Production

```bash
  npm run build
```

Outputs a static build to `build/`, which Vercel deploys.

## Environment variables

The code reads these variables (names only; values are never committed). Put them in `.env.local`:

- `REACT_APP_EMAILJS_PUBLIC_KEY`
- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_LOADING_TIME` (ms before the loading screen can dismiss)
- `REACT_APP_SHOW_LOADING` (`true` to show the loading screen)

## Tests

There is no test suite in the repo.
