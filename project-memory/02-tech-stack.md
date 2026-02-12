# 02 — Tech Stack

## Core Framework

- Next.js (App Router)
- React ^18.x
- React-DOM ^18.x
- TypeScript

---

## Styling & UI

- TailwindCSS
- PostCSS
- shadcn/ui component system
- Utility-first styling approach

---

## Internationalization (i18n)

- next-intl
- Locale-based routing using `app/[locale]/`
- Middleware-based locale detection
- Translation files in `/messages`
  - en.json
  - es.json

---

## AI Integration

- Genkit
- Custom AI flows located in:
  - `src/ai/genkit.ts`
  - `src/ai/flows/`
- Server-side AI execution
- Suggest Project Flow implemented

---

## State & Utilities

- React Context API
- Custom hooks (`src/hooks`)
- Toast system
- Loader context
- Utility helpers in `src/lib`

---

## Environment & Tooling

- Node.js
- npm
- Docker support
- TypeScript strict mode enabled

---

## NPM Scripts (Expected Standard)

- `dev` → Run development server
- `build` → Production build
- `start` → Start production server
- `lint` → Lint project
- `type-check` → TypeScript validation (if configured)

---

## Architectural Constraints

- App Router only (no Pages Router)
- Locale required at route level
- AI logic isolated from UI layer
- Modular separation under `src/`

---

This file documents the full technical stack of the system.
