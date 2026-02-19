# 03 - Routing and i18n

## 🧭 Estrategia de Routing

Se utiliza **Next.js App Router (v14)** con estructura basada en carpetas.

Ubicación principal:

```
src/app/
  layout.tsx
  page.tsx
  [locale]/
    layout.tsx
    page.tsx
```

El sistema permite renderizado por idioma dinámico mediante segmento `[locale]`.

---

## 🌍 Organización por Dominio

Las rutas no contienen lógica de negocio.  
Las secciones se delegan a:

```
src/components/sections/
```

Las rutas solo orquestan layout y carga de contenido.

---

## 🔁 Rutas Dinámicas

Estructura actual:

- `/`
- `/{locale}`

Escalable a:

- `/{locale}/projects/[slug]`
- `/{locale}/blog/[slug]`

---

## 🧱 Manejo de Layouts

- layout.tsx raíz: estructura global
- layout.tsx por locale: configuración de idioma
- Layout desacoplado de lógica AI

---

## 🌐 Estrategia i18n

Ubicación de mensajes:

```
messages/
  en.json
  es.json
```

Implementación:

- Carga por locale
- Hook personalizado de traducción
- Sin lógica de UI en archivos de idioma

---

## 📈 Escalabilidad del Sistema de Navegación

- Navegación desacoplada
- Fácil expansión a más idiomas
- Posibilidad de lazy loading por idioma

---

## 🧪 Estrategia de Testing de Rutas

- Render con wrapper de router mock
- Validar redirecciones
- Validar carga correcta por locale
- Testear layouts independientemente

---

## ⚠ Riesgos Identificados

- Inconsistencia entre mensajes
- Errores en slug dinámico
- Re-render innecesario en cambio de idioma

---

## ✅ Coherencia Arquitectónica

Routing:

- No contiene lógica de negocio
- No contiene llamadas AI directas
- Solo orquesta vistas

Totalmente alineado con 01-architecture-map.md
