# 05 — Components Map

## Component Architecture Overview

Components are organized under:

```
src/components/
```

Structured into logical groups.

---

## Layout Components

Location:
```
src/components/layout/
```

Includes:
- header.tsx
- footer.tsx

Purpose:
- Global structure
- Navigation
- Footer information

---

## Section Components

Location:
```
src/components/sections/
```

Includes:
- hero-section.tsx
- about-section.tsx
- experience-section.tsx
- projects-section.tsx
- contact-section.tsx

Purpose:
- Page content blocks
- Portfolio presentation sections

---

## UI Components (shadcn)

Location:
```
src/components/ui/
```

Includes:
- button
- card
- dialog
- accordion
- toast
- tooltip
- and other primitives

Purpose:
- Design system primitives
- Reusable styled building blocks

---

## Utility Components

Location:
```
src/components/
```

Includes:
- content-wrapper.tsx
- theme-provider.tsx
- theme-toggle.tsx
- language-toggle.tsx
- pre-loader.tsx
- typing-animation.tsx
- project-card.tsx

Purpose:
- Cross-sectional helpers
- Global UI logic

---

## Component Classification

### Presentational
- Section components
- Project card
- UI primitives

### Layout
- Header
- Footer
- Layout wrappers

### Interactive
- Theme toggle
- Language toggle
- Dialogs
- Toast system

---

This file maps the component ecosystem of the project.
