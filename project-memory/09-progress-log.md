# 09 — Progress Log

This file tracks chronological progress of the project.

---

## 2026-02-11 — Client-Side Locale Refactor (Live Language Switching)

### Completed
- Removed locale dependency from URL
- Eliminated router-based language switching
- Implemented `LocaleProvider` with client-side state
- Loaded `en` and `es` messages directly in client
- Wrapped application with client-driven `NextIntlClientProvider`
- Language switch now updates instantly via React state

### Impact
- True live language switching
- No navigation
- No layout re-render
- No App Router involvement
- Full UI update in-place

---

## 2026-02-11 — Locale Switch Optimization (Smooth Transition)

### Completed
- Optimized language switch behavior
- Added `scroll: false` to `router.replace` in `LanguageToggle`
- Prevented scroll reset on locale change
- Maintained App Router locale segment structure
- No architectural refactor required
- No changes to middleware or i18n configuration

### Impact
- Smoother language transition
- Eliminated visual perception of full refresh caused by scroll reset
- Maintained routing integrity and next-intl stability
- Applied minimal, non-breaking modification

---

## 2026-02-11 — About Section Image Replacement

### Completed
- Replaced dynamic AI placeholder image in About section
- Removed dependency on `PlaceHolderImages` for this section
- Implemented static image reference: `/img/carnet.jpg`
- Preserved:
  - i18n (`t("imageAlt")`)
  - Layout structure
  - Styling and visual design
  - AI subsystem isolation

### Impact
- Simplified About section image rendering
- Reduced unnecessary dynamic dependency
- Maintained architectural stability
- Applied minimal, non-breaking UI change

---

## 2026-02-11 — Hero Section Scroll Indicator Adjustment

### Completed
- Refined Hero Scroll Indicator positioning
- Reduced bottom offset (`bottom-4 md:bottom-6`)
- Added `pointer-events-none` to prevent interaction conflicts
- Added `z-10` for proper stacking context
- Reduced opacity to minimize visual interference
- Preserved:
  - i18n system
  - 3D relief interaction logic
  - Layout structure
  - AI system integrity

### Impact
- Prevented overlap with Tech Stack Preview
- Improved visual hierarchy in Hero section
- Maintained architectural stability
- Applied minimal, non-breaking change

---

## 2026-02-11 — System Memory Initialization

### Completed
- Created `/project-memory` directory
- Defined 10 structured memory files
- Documented:
  - Project overview
  - Architecture map
  - Tech stack
  - Routing & i18n system
  - AI system
  - Components map
  - State management
  - Decision log
  - Active context

### Impact
- Established persistent architectural memory
- Reduced need for re-analysis of project structure
- Enabled memory-driven development workflow

---

## Previous Milestones (Historical)

- ✅ Base Next.js App Router setup
- ✅ TailwindCSS integration
- ✅ shadcn UI system integration
- ✅ Locale routing implementation
- ✅ Middleware for i18n
- ✅ AI Suggest Project flow implemented
- ✅ Docker configuration added

---

## 2026-02-12 — Hobbies Section Implementation

### Completed
- Created new modular section component:
  - `src/components/sections/hobbies-section.tsx`
- Integrated next-intl translations under `hobbies` namespace
  - Updated `messages/en.json`
  - Updated `messages/es.json`
- Registered `HobbiesSection` in:
  - `src/app/[locale]/page.tsx`
- Positioned section between Projects and Contact
- Preserved:
  - Routing structure
  - Middleware behavior
  - Client-side locale switching
  - AI system isolation
  - Component architecture

### Impact
- Expanded personal profile content with minimal changes
- Maintained visual and structural consistency
- No architectural refactor required
- Fully non-breaking enhancement

---

## 2026-02-12 — Hobbies Section Visual Refinement

### Completed
- Aligned section vertical rhythm with other sections (`py-12 md:py-24 lg:py-32`)
- Added `font-headline` to section title for typography consistency
- Standardized container padding to match About section
- Increased grid spacing (`gap-4`) and added `lg:grid-cols-3`
- Refined card styling:
  - `border-border/60`
  - Hover accent using `hover:border-primary/30`
  - Preserved `bg-card` and semantic color tokens
- No hardcoded colors introduced
- Fully theme-compatible (dark/light safe)

### Impact
- Improved visual coherence with overall design system
- Maintained semantic Tailwind token usage
- No architectural changes
- No routing, i18n, or state impact
- Non-breaking UI refinement

---

## 2026-02-12 — Hobbies Section Interactivity Upgrade

### ✅ Completado
- Implemented client-side microinteractions in `hobbies-section.tsx`
- Added local state management using `useState`
- Enabled toggle behavior on click/tap
- Added keyboard accessibility (Enter / Space support)
- Introduced smooth transitions (`transition-all`, `duration-300`, `ease-in-out`)
- Applied semantic Tailwind tokens only (`bg-card`, `border-border`, `primary`)
- Maintained dark/light mode compatibility
- No routing, middleware, or App Router modifications
- No external dependencies added

### 🔄 En progreso
- None

### 🧠 Decisiones
- Avoided animation libraries (e.g., Framer Motion) to preserve architectural stability
- Kept state local to component (aligned with Decision #006 — Native React State Management)
- Used semantic design tokens exclusively to preserve theme coherence

### ⚠ Problemas
- None detected
- No performance regression introduced

### ▶ Próximos pasos
- Evaluate subtle expansion pattern if richer hobby descriptions are introduced
- Consider accessibility audit across interactive sections

---

## Current Status

System stable.  
No active refactors in progress.  
Memory-driven workflow enabled.

---

## 2026-02-12 — Pre-loader Typing Speed Adjustment

### ✅ Completado
- Reduced code typing delay (15ms → 8ms)
- Reduced terminal command typing delay (100ms → 60ms)
- No structural refactor
- No routing, middleware, or i18n impact
- No external dependencies introduced

### 🧠 Decisión
- Reducción del delay por carácter para mejorar percepción de rendimiento

### ⚠ Problemas
- Ninguno

### ▶ Próximos pasos
- Evaluar si conviene parametrizar velocidad como constante configurable

---

All future updates must be logged chronologically.

---

## 2026-02-12 — Unificación velocidad Pre-loader Dark/Light

### ✅ Completado
- Eliminada cualquier posible dependencia de velocidad basada en tema (dark/light)
- Introducidas constantes globales en `pre-loader.tsx`:
  - `CODE_TYPING_SPEED`
  - `TERMINAL_TYPING_SPEED`
- Garantizada una única fuente de verdad para la velocidad de animación
- Confirmado:
  - Sin duplicación de timers
  - Sin reinicios inesperados al cambiar tema
  - Sin memory leaks
  - Sin impacto en routing, i18n o arquitectura

### 🧠 Decisión
- Eliminada dependencia de velocidad basada en tema
- Se unifica constante global desacoplada del sistema de theming

### ⚠ Problemas
- Ninguno

### ▶ Próximos pasos
- Evaluar parametrización futura vía configuración global UI
