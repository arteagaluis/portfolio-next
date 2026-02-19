# 01 - Architecture Map

## 🏗 Tipo de Arquitectura

Arquitectura **Feature-Based Modular** sobre Next.js App Router.

Separación por dominios funcionales:

- UI (design system)
- Layout
- Secciones (features)
- Estado
- Hooks
- Utilities
- AI Layer desacoplada

---

## 🧱 Principios SOLID Aplicados

- **S**: Componentes con responsabilidad única.
- **O**: Extensible mediante composición.
- **L**: Componentes reemplazables sin romper contratos.
- **I**: Hooks especializados.
- **D**: Dependencias invertidas (UI depende de interfaces, no de implementación AI).

---

## 🧩 Separación de Responsabilidades

| Capa | Responsabilidad |
|------|-----------------|
| UI | Renderizado puro |
| Sections | Orquestación de UI |
| Hooks | Lógica reutilizable |
| Context | Estado global mínimo |
| Lib | Funciones puras |
| AI | Lógica inteligente desacoplada |

---

## 🔄 Flujo General de Datos

1. Usuario interactúa con UI.
2. Evento invoca hook o acción.
3. Hook llama servicio (AI o util).
4. Resultado vuelve al componente.
5. Render condicionado.

No existe dependencia directa UI → AI sin capa intermedia.

---

## 🧠 Capa AI

Ubicación: `src/ai/`

- Flows desacoplados
- No contienen JSX
- Exportan funciones puras async
- Mockeables en testing

---

## 📦 Modularidad

Cada dominio puede evolucionar sin afectar otro:

- UI independiente de AI
- Hooks independientes del layout
- Estado desacoplado de routing

---

## 📈 Estrategia de Escalabilidad

- Migrable a micro-frontends si crece.
- Escalable a Zustand o Redux si aumenta complejidad.
- Posible extracción de AI a microservicio externo.

---

## 🧪 Estrategia de Desacoplamiento para Testing

- Hooks testeables aislados.
- AI flows testeados con mocks.
- Context envuelto en custom providers.
- Utilities con 95% cobertura mínima.

---

## 🧭 Diagrama Conceptual (Texto)

Usuario → UI Component → Hook → Service Layer → AI Flow / Util → Resultado → UI

No hay lógica de negocio dentro de componentes UI puros.

---

## 📐 Consistencia con Routing y Estado

- Routing gestionado exclusivamente por Next App Router.
- Estado global mínimo con Context.
- Sin contradicciones entre capas.

---

## ✅ Patrones Utilizados

- Container/Presentational Pattern
- Custom Hooks Pattern
- Service Layer Pattern
- Dependency Injection manual
- Composition over inheritance
