# 04 — AI System

## Overview

The project includes an AI subsystem built using **Genkit**.  
AI logic is isolated from UI components and lives under:

```
src/ai/
```

---

## Structure

```
src/ai/
 ├── genkit.ts
 ├── dev.ts
 └── flows/
      └── suggest-project-flow.ts
```

---

## Responsibilities

### genkit.ts
- Genkit configuration
- Model initialization
- Environment bindings

### flows/
- Contains domain-specific AI flows
- Each flow encapsulates:
  - Input schema
  - Prompt logic
  - Model execution
  - Output formatting

---

## Implemented Flow

### Suggest Project Flow

Location:
```
src/ai/flows/suggest-project-flow.ts
```

Purpose:
- Suggest project ideas dynamically
- Can be extended with user context
- Server-side execution

---

## Execution Model

- AI runs server-side only
- No direct model calls from client
- Flows abstract AI complexity
- Designed for scalability

---

## Design Principles

- AI isolated from presentation layer
- Flow-based architecture
- Typed inputs/outputs
- Extendable for future AI features

---

This file documents how AI is structured and integrated.
