# Lokesh — 3D Portfolio

Immersive, scroll-driven portfolio built with **Vite**, **React**, **TypeScript**, **React Three Fiber**, **Drei**, **TailwindCSS**, **Framer Motion**, and **Zustand**. Scrolling drives camera paths, central geometry morphing, lighting, and section reveals; projects open in a glass modal. On small screens, the site switches to a lightweight 2D layout with the same content.

## Prerequisites

- Node.js 18+ recommended

## Setup

```bash
cd portfolio
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Customize your content

| What | Where |
|------|--------|
| Resume (JSON) | `public/resume.json` — edit and refresh; no code change required |
| Projects | `src/data/projects.ts` — titles, copy, tech tags, URLs, thumbnail paths |
| Thumbnails | `public/project-thumbnails/` — replace SVG/PNG paths in project entries |
| Scroll phase breakpoints | `src/lib/scrollPhases.ts` — intro / projects / resume blend windows |

## Structure

- `src/App.tsx` — canvas visibility, scroll hook, header, sections, modal
- `src/components/Scene.tsx` — lighting, fog, camera damping, composition
- `src/components/MorphCore.tsx` — scroll-morphed icosahedron + torus
- `src/components/Projects3D.tsx` — spiral cards, fly-in, pointer tilt
- `src/components/Resume3D.tsx` — loads `resume.json`, timeline panels, skill orbit
- `src/components/Particles.tsx` — starfield points
- `src/components/PostFX.tsx` — bloom + vignette (`@react-three/postprocessing`)
- `src/hooks/useScrollProgress.ts` — maps page scroll to `0..1` in Zustand

## Performance notes

- Particle count and effect multisampling are tuned for mid-range GPUs; adjust in `Particles.tsx` and `PostFX.tsx`.
- The 3D canvas is disabled below `768px` width in favor of `MobileFallback` (`src/hooks/useIsMobile3D.ts`).

## License

Private / personal portfolio — adapt freely for your own site.
