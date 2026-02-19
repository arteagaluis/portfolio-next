# 00 - Project Overview

## 📌 Visión General

**Proyecto:** Portfolio Profesional con Integración AI  
**Stack base:** Next.js (App Router) + React 18  
**npm:** 10.9.2  

Aplicación SPA/SSR híbrida construida con React ^18.2.0 y react-dom ^18.2.0 sobre Next.js, diseñada para mostrar experiencia profesional, proyectos y permitir interacción inteligente mediante flujos AI desacoplados.

---

## 🎯 Problema que Resuelve

- Presentación profesional tradicional es estática.
- Falta diferenciación técnica en portfolios.
- Ausencia de interacción inteligente personalizada.

El sistema incorpora IA para sugerencia dinámica de proyectos y mejora de experiencia.

---

## 🎯 Objetivos Estratégicos

- Mostrar capacidades técnicas reales.
- Demostrar arquitectura escalable.
- Integrar AI desacoplada del UI.
- Mantener alta calidad de código.
- Garantizar mantenibilidad y cobertura ≥ 80%.

---

## ✅ Alcance Funcional

### In Scope
- Renderizado por locales (`/en`, `/es`)
- Secciones: Hero, About, Experience, Projects, Contact
- Sugerencia AI de proyectos
- Sistema de temas
- Layout modular

### Out of Scope
- Sistema de autenticación
- Panel administrativo
- Backend persistente

---

## 📋 Requisitos Funcionales

- Renderizado multi-idioma
- Componentes reutilizables
- Integración AI desacoplada
- Layout escalable
- Arquitectura modular

---

## 📐 Requisitos No Funcionales

### Performance
- Lazy loading en secciones
- Minimización de re-renderizados
- Uso eficiente de hooks

### Seguridad
- Sanitización de entradas AI
- No exponer claves sensibles

### Mantenibilidad
- Feature-based architecture
- Separación estricta UI / lógica
- Testing obligatorio ≥ 80%

---

## 📊 Criterios de Éxito

- Cobertura mínima global 80%
- Arquitectura documentada
- Modularidad clara
- Sin dependencias acopladas a UI

---

## 👥 Público Objetivo

- Reclutadores técnicos
- Empresas tech
- Equipos de ingeniería
- Clientes potenciales

---

## 🧠 Enfoque de Desarrollo

- SPA híbrida con Next.js App Router
- React ^18.2.0
- react-dom ^18.2.0
- npm 10.9.2
- Arquitectura modular por dominio

---

## 🔎 Estrategia General de Calidad

- ESLint + Prettier obligatorios
- Testing unitario y de componentes
- Coverage gates automáticos
- Logs de decisiones arquitectónicas (ADR)
- Revisión continua de impacto en testing

---

## 🧪 Política Mínima de Cobertura

- Global ≥ 80%
- Dominio crítico ≥ 90%
- Utilities ≥ 95%
- AI flows ≥ 85%
