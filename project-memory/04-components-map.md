# 04 - Components Map

## 🧩 Clasificación de Componentes

### 1️⃣ UI (Design System)
Ubicación:
```
src/components/ui/
```

- Componentes puros
- Sin lógica de negocio
- Altamente reutilizables
- Testeables mediante render aislado

Ejemplos:
- button
- card
- dialog
- input
- tabs
- toast

---

### 2️⃣ Layout

Ubicación:
```
src/components/layout/
```

Responsabilidad:
- Header
- Footer
- Estructura global
- No lógica de dominio

---

### 3️⃣ Feature / Sections

Ubicación:
```
src/components/sections/
```

Ejemplos:
- hero-section
- about-section
- experience-section
- projects-section
- contact-section

Responsabilidad:
- Orquestación de UI
- Invocación de hooks
- Comunicación con AI si aplica

---

### 4️⃣ Shared Components

Ubicación:
```
src/components/
```

Ejemplos:
- project-card
- language-toggle
- theme-toggle
- content-wrapper

---

## 🧱 Aplicación de Atomic Design

- Atoms → ui/
- Molecules → combinaciones UI
- Organisms → sections/
- Templates → layouts
- Pages → app router

---

## 📐 Convenciones de Nombrado

- kebab-case para archivos
- PascalCase para componentes
- Hook prefix: useX
- Test suffix: .test.tsx

---

## 🔄 Separación Lógica / Presentación

- UI components no importan hooks de dominio.
- Sections pueden usar hooks.
- AI nunca se importa directamente en UI pura.

---

## 🔁 Estrategia de Reutilización

- Componentes UI genéricos.
- Props tipadas estrictamente.
- No hardcodear textos (usar i18n).

---

## 🔥 Componentes Críticos

- project-card
- loader-context consumer
- hero-section
- AI suggestion flow integrator

Requieren alta cobertura (>90%).

---

## 🧪 Estrategia de Testing por Tipo

### UI
- Snapshot limitado
- Test visual lógico
- Props validation

### Sections
- Test de integración ligera
- Mock de hooks
- Mock de AI

### Layout
- Render simple
- Validar estructura

### Shared
- Test funcional
- Eventos y callbacks

---

## ⚠ Riesgos

- Mezclar lógica de negocio en UI.
- Duplicación de componentes.
- Props no tipadas correctamente.

---

## ✅ Coherencia Arquitectónica

- UI no depende de AI.
- Sections actúan como capa intermedia.
- Compatible con 01-architecture-map.md.
