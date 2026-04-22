# 2. Adopt Frontend-Only SPA Architecture

Data: 2026-04-18

## Status

Aceita

## Contexto

O produto e um app de organizacao de times casuais com foco em uso rapido e sem friccao de infraestrutura. O escopo inicial prioriza simplicidade operacional, custo baixo e distribuicao publica por hosting estatico.

## Decisao

Decidimos adotar arquitetura SPA frontend-only, sem backend proprio no escopo atual.

## Alternativas Consideradas

### Alternativa 1: Backend proprio com API e banco

**Descricao**: Construir API para persistencia e regras de negocio no servidor.

**Pros**:

- Maior controle de dados e auditoria.
- Facilita recursos multiusuario futuros.

**Contras**:

- Maior custo de infraestrutura e manutencao.
- Aumenta complexidade de desenvolvimento e deploy.

**Razao para rejeicao**: Nao atende a prioridade de simplicidade e baixo custo para o escopo atual.

### Alternativa 2: BaaS (Firebase/Supabase)

**Descricao**: Usar servico gerenciado para dados e autenticacao.

**Pros**:

- Reduz operacao de backend proprio.
- Facilita evolucao para features online.

**Contras**:

- Introduz dependencia externa e custo recorrente.
- Complexidade maior do que necessario para o caso atual.

**Razao para rejeicao**: Escopo atual nao exige persistencia remota.

## Consequencias

### Positivas

- Deploy simplificado como site estatico.
- Menor custo e menor superficie operacional.
- Experiencia rapida para uso casual.

### Negativas

- Sem sincronizacao nativa entre dispositivos.
- Sem controle centralizado de dados.

### Neutras

- Evolucoes para multiusuario exigirao nova decisao arquitetural.
- Regras de dominio ficam no cliente, demandando bom teste local.

## Trade-offs

Priorizamos simplicidade e autonomia local em vez de colaboracao online e persistencia centralizada.

## Notas de Implementacao

- Evidencias: docs de stack, integracoes e indice da documentacao.
- Integracao principal com APIs de plataforma do navegador.

## Validacao

- Aplicacao funciona integralmente sem backend.
- Fluxos principais operam localmente com baixa friccao.

## Revisao

2026-04-18: Criacao inicial.
