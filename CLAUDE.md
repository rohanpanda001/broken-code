@AGENTS.md

# Permanent Context

## Brand DNA
"Electric Debug" aesthetic. Dark UI.
Palette:
- True Charcoal (#0B0D10)
- Electric Cyan (#40E0FF)
- Digital Orange (#FF8C00)
- Cloud Dancer (#F0EEE9)

## Tech Stack
- **Monorepo:** Turborepo
- **Frontend:** apps/web (Next.js, Tailwind)
- **Backend:** apps/api (NestJS)
- **Database:** packages/database (Prisma + PostgreSQL)
- **Shared Logic:** packages/types

## Core Product Logic
A code assessment platform where candidates identify multi-line faults (Logic, Architecture, Data Structures).

## AI Evaluator
Backend uses an LLM agent to grade candidate critiques (0-100 score) against a stored "Ground Truth" for each question.
