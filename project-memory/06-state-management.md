# 06 — State Management

## Overview

State management is handled using native React tools and minimal abstraction.

No external state libraries (Redux, Zustand, etc.) are currently used.

---

## Global State

### Loader Context

Location:
```
src/context/loader-context.tsx
```

Purpose:
- Manage global loading states
- Coordinate UI transitions
- Support pre-loader component

---

## Toast System

Location:
```
src/components/ui/toast.tsx
src/components/ui/toaster.tsx
src/hooks/use-toast.ts
```

Purpose:
- Global notification system
- Hook-based API
- UI primitive abstraction

---

## Local State

Handled via:
- `useState`
- `useEffect`
- `useMemo`
- `useCallback`

Used primarily inside:
- Interactive components
- Theme toggling
- Language switching

---

## Theme State

Managed via:
- `theme-provider.tsx`
- `theme-toggle.tsx`

Likely based on:
- Class-based dark mode
- Context provider pattern

---

## AI State

- AI logic is server-side
- No persistent AI state in client
- Flow results passed as response data

---

## Design Philosophy

- Prefer local state over global state
- Context only when truly global
- Keep state close to where it's used
- Avoid premature abstraction

---

This file documents how state is handled across the application.
