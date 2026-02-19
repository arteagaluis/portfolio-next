# 02 - Tech Stack

## 🧱 Core Stack

- react: ^18.2.0
- react-dom: ^18.2.0
- next: 14.x (App Router)
- npm: 10.9.2
- typescript: 5.x
- tailwindcss: 3.x

---

## 📦 Dependencias Clave

- @testing-library/react: ^14.0.0
- @testing-library/jest-dom: ^6.0.0
- jest: ^29.7.0
- ts-jest: ^29.1.0
- eslint: ^8.x
- prettier: ^3.x

---

## 📜 Scripts npm

```json
{
  "start": "next start",
  "dev": "next dev",
  "build": "next build",
  "test": "jest --coverage",
  "lint": "next lint"
}
```

---

## 🧹 ESLint & Prettier

- ESLint con reglas React + TypeScript
- Prettier obligatorio
- No permitir any implícito
- No console.log en producción

---

## 🎨 UI Library

- TailwindCSS
- Componentes UI desacoplados
- Diseño reutilizable

---

## 📁 Estructura de Carpetas

```
src/
  app/
  components/
    ui/
    layout/
    sections/
  context/
  hooks/
  lib/
  ai/
```

Tests:

```
__tests__/
  components/
  hooks/
  lib/
  ai/
```

---

## ⚠ Limitaciones Técnicas

- npm 10.9.2 requiere lockfile consistente.
- Next App Router impone estructura específica.
- Server components requieren cuidado en testing.

---

# 🔬 Estrategia y Configuración de Testing

## Framework

- Jest ^29.7.0
- React Testing Library ^14.0.0

---

## Setup Global

Archivo: `jest.setup.ts`

- Importar @testing-library/jest-dom
- Configurar mocks globales
- Setup de entorno jsdom

---

## Coverage

Configuración en `jest.config.ts`:

- collectCoverage: true
- coverageThreshold:

```
global:
  branches: 80
  functions: 80
  lines: 80
  statements: 80
```

---

## Estrategia de Mocks

- Mock de AI flows
- Mock de context providers
- Mock de hooks externos
- MSW si se agregan requests

---

## Testing de Hooks

- @testing-library/react-hooks
- Mock de dependencias
- Test async con waitFor

---

## Testing de Componentes

- Render aislado
- Simulación de eventos
- Snapshot limitado (solo UI pura)

---

## Testing de Estado

- Context envuelto en custom provider
- Test de actualizaciones
- Test de side-effects

---

## Convenciones

- Nombre: component-name.test.tsx
- Tests organizados por dominio
- AAA Pattern (Arrange, Act, Assert)

---

# 📊 Auditoría del Sistema de Pruebas

## Estado Actual

- No existe configuración de Jest
- No existe estructura de tests
- Cobertura actual estimada: 0%

---

## Cobertura por Dominio

| Dominio | Cobertura |
|----------|-----------|
| UI | 0% |
| Hooks | 0% |
| AI | 0% |
| Lib | 0% |

---

## Componentes Críticos Sin Cobertura

- AI flows
- Loader context
- Project card
- Sections principales

---

## Deuda Técnica en Testing

Alta.

---

## Riesgos

- Regresiones silenciosas
- Cambios AI no detectados
- Bugs en routing sin validación

---

## Nivel de Madurez

Inicial.

---

## Plan de Mejora

1. Configurar Jest.
2. Testear hooks.
3. Testear utils.
4. Testear AI flows.
5. Agregar coverage gate.
