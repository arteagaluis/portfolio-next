# 07 — Decision Log

This file tracks architectural and technical decisions in ADR-style format.

---

## Decision #001 — Use Modular Structure under `src/`

**Status:** Accepted  
**Reason:** Improves scalability and separation of concerns.  
**Impact:** Clear domain boundaries and maintainability.

---

## Decision #002 — Use Next.js App Router

**Status:** Accepted  
**Reason:** Modern routing model, server components support, better scalability.  
**Impact:** No Pages Router used. All routing inside `app/`.

---

## Decision #003 — Use next-intl for i18n

**Status:** Accepted  
**Reason:** App Router compatibility and structured translation system.  
**Impact:** Locale segment required in routing. Middleware integration necessary.

---

## Decision #004 — Integrate AI with Genkit

**Status:** Accepted  
**Reason:** Structured AI flow system with type-safe execution.  
**Impact:** AI isolated in `src/ai/`. No client-side model calls.

---

## Decision #005 — UI System Based on shadcn

**Status:** Accepted  
**Reason:** Composable UI primitives with Tailwind integration.  
**Impact:** UI components located in `src/components/ui/`.

---

## Decision #006 — Native React State Management

**Status:** Accepted  
**Reason:** Project scale does not justify external state library.  
**Impact:** Context API + hooks only.

---

Future decisions must be appended chronologically.
