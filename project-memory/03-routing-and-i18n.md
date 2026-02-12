# 03 — Routing & i18n

## Routing Strategy

The project uses **Next.js App Router** with locale-based dynamic routing:

```
src/app/[locale]/
```

All main pages are nested inside the `[locale]` segment.

---

## Middleware

- Middleware is defined in:
  - `src/middleware.ts`
- Handles:
  - Locale detection
  - Redirection to default locale
  - Internationalized routing enforcement

---

## next-intl Integration

- Config file: `src/i18n.ts`
- Messages stored in:
  - `/messages/en.json`
  - `/messages/es.json`
- Locale passed via route segment
- Translations consumed via hooks inside components

---

## Default Locale

- English (en) assumed as default
- Spanish (es) supported
- Middleware ensures fallback behavior

---

## Navigation

- Navigation helpers defined in:
  - `src/navigation.ts`
- Locale-aware linking
- Consistent routing pattern

---

## Constraints

- Every route must include a locale
- No root-level non-localized pages
- Middleware must remain synchronized with supported locales

---

This file defines how routing and localization are structured.
