# 05 - State Management

## 🧠 Estrategia Elegida

Se utiliza **React Context API** como solución de estado global mínima.

Justificación:

- El dominio actual no requiere Redux.
- El estado global es limitado.
- Menor complejidad cognitiva.
- Fácil de mockear en testing.

Escalable a Zustand si aumenta la complejidad.

---

## 🏗 Estructura Actual

Ubicación:

```
src/context/
  loader-context.tsx
```

Separación:

- Estado global mínimo
- Estado local en componentes
- Side-effects en hooks o Server Actions

---

## 🌍 Estado Global vs Local

### Global
- Loader state
- Configuración de tema
- Preferencias mínimas

### Local
- Estados de UI
- Formularios
- Interacciones temporales

Regla:
No elevar estado innecesariamente.

---

## 🔄 Manejo de Side-Effects

- Hooks personalizados
- Server Actions (Next)
- AI flows async desacoplados

Nunca dentro de componentes UI puros.

---

## 📈 Escalabilidad

Si el dominio crece:

- Migración a Zustand modular
- Separación por slices
- Persistencia opcional

Arquitectura preparada para transición sin refactor masivo.

---

# 🧪 Estrategia de Testing del Estado

## Testing de Context

- Crear wrapper provider mock
- Testear actualización de estado
- Validar re-render controlado

---

## Mockeo de Stores

- Mock manual del provider
- Inyección de estado inicial
- Verificación de callbacks

---

## Testing Async

- waitFor de Testing Library
- Mock de AI flows
- Control de promesas

---

## Coverage Objetivo

- Context: 90%
- Hooks que usan context: 85%

---

## ⚠ Riesgos

- Uso excesivo de contexto
- Re-render innecesario
- Lógica mezclada con UI

---

## ✅ Coherencia Arquitectónica

- Estado desacoplado de routing.
- Estado desacoplado de AI.
- Compatible con 01-architecture-map.md y 04-components-map.md.
