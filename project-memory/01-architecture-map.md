# 01 — Architecture Map

## High-Level Architecture

The project follows a modular layered structure:

```
src/
 ├── app/              → App Router entry points
 ├── components/       → UI + Layout + Sections
 ├── context/          → React Context providers
 ├── hooks/            → Custom hooks
 ├── lib/              → Utilities and helpers
 ├── ai/               → AI system (Genkit + flows)
```

---

## Layer Responsibilities

### App Layer
- Routing
- Layout composition
- Locale-based rendering
- Server/Client boundaries

### Component Layer
- Presentational components
- Layout components
- Section blocks
- UI primitives (shadcn/ui)

### AI Layer
- Genkit configuration
- AI flows
- Server-side execution
- Isolated business intelligence logic

### State Layer
- React Context
- Custom hooks
- Toast system
- Loader management

---

## Architectural Style

- Component-based
- Server/Client hybrid rendering
- Locale-scoped routing
- AI flows isolated from UI
- Domain separation inside `src/`

---

This file maps how the system is structured logically.
