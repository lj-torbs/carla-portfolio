# Carla Jean Zozobrado — Personal portfolio

A React + TypeScript portfolio with Vite, Tailwind CSS, and Three.js, personalized from Carla's CV with a light-blue theme, pale panels, and dark blue text.

## Run locally

Use Node.js 22.12+ (Node 24 LTS recommended).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Customize

- `src/data/portfolio.ts`: profile, contact details, skills, projects, experience, education, and recognition. Project links appear when a project's optional `url` is supplied. The CV does not specify project technology stacks or live URLs, so none are assumed.
- `src/App.tsx`: page layout and sections.
- `src/components/PortfolioWorld.tsx`: the architectural Three.js background and scroll-driven camera.
- `src/hooks/useSpatialBrowsing.ts`: section depth, pointer tilt, chapter tracking, and reading progress.
- `src/index.css`: Tailwind import and global styles.
- `index.html`: page title and description.
- `public/favicon.svg`: site icon.

The whole page uses an integrated spatial design: layered portrait and project artwork, raised reading panels, pointer-responsive cards, chapter navigation, and a scroll-driven Three.js camera. Scrolling remains native and every section remains usable by keyboard and on touchscreens. Mobile layouts keep panels flat for readability.

3D browsing is enabled automatically for new visitors, including when the device requests reduced motion. Visitors can turn it off with the toggle; that explicit choice is remembered locally. If preference storage is unavailable, 3D still starts enabled. Turning it off stops camera movement and card tilt. The background pauses in hidden tabs and disposes GPU resources on unmount. A CSS perspective grid remains when WebGL is unavailable.

The original portrait extracted from the supplied CV is in `public/images/`. The unchanged downloadable CV is in `public/documents/`. Replace these files to update them.

Manrope body text and Cormorant Garamond headings are served locally through Fontsource packages. The site does not need a Google Fonts connection.

Tailwind uses the official `@tailwindcss/vite` plugin and `@import "tailwindcss"`; no legacy Tailwind configuration file is required.

## Checks and production

```sh
npm run lint
npm run build
npm run preview
```

The build command checks TypeScript and creates the production site in `dist/`. Deploy that folder to your preferred static host. No backend or environment variables are required.

## Documentation

- [Vite](https://vite.dev/guide/)
- [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Three.js scenes](https://threejs.org/manual/pages/creating-a-scene.html)
