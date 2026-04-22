# 4. Separate Domain Logic from UI

Data: 2026-04-18

## Status

Aceita

## Contexto

As regras de sorteio, validacao e metricas sao o nucleo do produto e precisam ser testaveis e evolutiveis sem acoplamento excessivo com a camada visual.

## Decisao

Decidimos organizar o projeto com separacao entre apresentacao (componentes/views), aplicacao (orquestracao), dominio (regras e entidades) e servicos de plataforma (localStorage, clipboard, file API), com funcoes puras para regras centrais.

## Alternativas Consideradas

### Alternativa 1: Lógica embutida nos componentes Vue

**Descricao**: Implementar regras diretamente em componentes/telas.

**Pros**:

- Menor quantidade de arquivos no inicio.
- Curva inicial mais simples.

**Contras**:

- Alta dificuldade de teste unitario de dominio.
- Acoplamento forte e manutencao mais dificil.

**Razao para rejeicao**: Conflita com objetivo de manter cobertura de testes robusta.

### Alternativa 2: Camadas mais profundas (DDD completo)

**Descricao**: Estrutura com maior formalismo e mais abstracoes.

**Pros**:

- Alto nivel de isolamento arquitetural.
- Escalabilidade para sistemas mais complexos.

**Contras**:

- Overhead para projeto pequeno/medio.
- Complexidade desproporcional ao escopo atual.

**Razao para rejeicao**: O projeto exige equilibrio entre organizacao e simplicidade.

## Consequencias

### Positivas

- Regras de dominio mais testaveis.
- Melhor separacao de responsabilidades.
- Evolucao de UI sem quebrar facilmente o dominio.

### Negativas

- Maior disciplina estrutural exigida.
- Mais arquivos e fronteiras para navegar.

### Neutras

- Necessidade de definir convencoes claras de pasta/modulo.
- Exige documentacao minima para manter consistencia.

## Trade-offs

Priorizamos manutencao e testabilidade em vez de menor esforco estrutural inicial.

## Notas de Implementacao

- Estrutura sugerida em docs: components, views, domain, services, stores, utils e tests/unit.
- Evitar acoplamento direto de API de navegador dentro do dominio.

## Validacao

- Testes de dominio executam sem dependencia de componentes.
- Mudancas de UI nao exigem reescrita de regra central de sorteio.

## Revisao

2026-04-18: Criacao inicial.
