# 06 - Decision Log (ADR)

---

## [2026-02-17] - Arquitectura Feature-Based Modular

### Contexto
El proyecto requiere escalabilidad y mantenibilidad sin sobreingeniería.

### Problema
Arquitectura poco estructurada puede generar acoplamiento.

### Alternativas
- Monolítica simple
- Clean Architecture estricta
- Feature-Based modular

### Decisión tomada
Adoptar arquitectura Feature-Based modular sobre Next App Router.

### Justificación
- Compatible con estructura actual.
- Escalable sin complejidad excesiva.
- Facilita testing por dominio.

### Impacto arquitectónico
Separación clara por capas y dominios.

### Impacto en testing
Permite tests aislados por módulo.

### Commit relacionado
Initial memory bank setup.

---

## [2026-02-17] - Estrategia de Testing con Jest

### Contexto
No existe sistema de pruebas implementado.

### Problema
Alto riesgo de regresiones.

### Alternativas
- Vitest
- Jest
- Cypress solo E2E

### Decisión tomada
Adoptar Jest + React Testing Library.

### Justificación
- Madurez del ecosistema.
- Integración con Next.
- Soporte completo de coverage.

### Impacto arquitectónico
Necesidad de desacoplar AI y hooks.

### Impacto en testing
Cobertura mínima obligatoria ≥ 80%.

### Commit relacionado
Memory bank documentation phase 1.

---

## [2026-02-17] - Uso de Context API

### Contexto
Estado global limitado.

### Problema
Evitar sobreingeniería con Redux.

### Alternativas
- Redux Toolkit
- Zustand
- Context API

### Decisión tomada
Context API.

### Justificación
Suficiente para dominio actual.

### Impacto arquitectónico
Estado mínimo centralizado.

### Impacto en testing
Fácil mockeo.

### Commit relacionado
State management documentation.

---

No eliminar historial.
