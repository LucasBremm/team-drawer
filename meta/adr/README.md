# Architecture Decision Records (ADRs)

Este diretorio contem os registros de decisoes arquiteturais do projeto Team Drawer.

## O que e um ADR?

Um ADR (Architecture Decision Record) e um documento que captura uma decisao arquitetural importante, incluindo contexto, alternativas consideradas e consequencias.

## Indice de Decisoes

### Decisoes Ativas

| ADR | Titulo | Status | Data |
|-----|--------|--------|------|
| [0001](0001-use-vue-vite-typescript-stack.md) | Use Vue + Vite + TypeScript as Core Stack | Aceita | 2026-04-18 |
| [0002](0002-adopt-frontend-only-spa-architecture.md) | Adopt Frontend-Only SPA Architecture | Aceita | 2026-04-18 |
| [0003](0003-use-localstorage-and-json-portability.md) | Use localStorage with JSON Portability | Aceita | 2026-04-18 |
| [0004](0004-separate-domain-logic-from-ui.md) | Separate Domain Logic from UI | Aceita | 2026-04-18 |
| [0005](0005-adopt-heuristic-team-draw-balancing.md) | Adopt Hybrid Team Draw Balancing (Combinatorial + Heuristic) | Aceita | 2026-04-18 |
| [0006](0006-define-json-import-conflict-policy.md) | Define JSON Import Conflict Policy | Aceita | 2026-04-18 |
| [0007](0007-standardize-unit-testing-strategy.md) | Standardize Unit Testing Strategy | Aceita | 2026-04-18 |
| [0008](0008-deploy-static-app-with-github-pages-actions.md) | Deploy Static App with GitHub Pages via Actions | Aceita | 2026-04-18 |
| [0009](0009-adopt-pt-br-ui-and-english-code-convention.md) | Adopt pt-BR UI and English Code Convention | Aceita | 2026-04-18 |

### Decisoes Superseded (Substituidas)

Nenhuma.

### Decisoes Deprecated (Descontinuadas)

Nenhuma.

## Categorias de Decisoes

### Stack Tecnologica

- ADR 0001: Use Vue + Vite + TypeScript as Core Stack

### Arquitetura

- ADR 0002: Adopt Frontend-Only SPA Architecture
- ADR 0004: Separate Domain Logic from UI

### Dados e Persistencia

- ADR 0003: Use localStorage with JSON Portability
- ADR 0006: Define JSON Import Conflict Policy

### Regras de Dominio

- ADR 0005: Adopt Hybrid Team Draw Balancing (Combinatorial + Heuristic)

### Operacoes e Deploy

- ADR 0007: Standardize Unit Testing Strategy
- ADR 0008: Deploy Static App with GitHub Pages via Actions

### Convencoes de Desenvolvimento

- ADR 0009: Adopt pt-BR UI and English Code Convention

## Como Propor um Novo ADR

1. Copie [template.md](template.md).
2. Numere sequencialmente com o proximo numero disponivel.
3. Preencha contexto, decisao, alternativas, consequencias e trade-offs.
4. Submeta para review e registre o status inicial como Proposta.
5. Apos aprovacao, altere o status para Aceita e atualize este indice.

## Template ADR

Ver [template.md](template.md) para o formato padrao.

## Documentacao Relacionada

- [Visao Geral da Arquitetura](../architecture/system-overview.md)
- [Padroes de Comunicacao](../architecture/communication-patterns.md)
- [Indice Meta](../INDEX.md)
