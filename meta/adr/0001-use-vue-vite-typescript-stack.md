# 1. Use Vue + Vite + TypeScript as Core Stack

Data: 2026-04-18

## Status

Aceita

## Contexto

O projeto precisa de uma base frontend moderna para construir rapidamente um app de uso casual, com boa organizacao de componentes e fluxo de desenvolvimento simples. Tambem e necessario manter qualidade de manutencao em uma aplicacao com regras de dominio relevantes (cadastro, validacoes e sorteio balanceado).

## Decisao

Vamos usar Vue.js como framework de UI, Vite para desenvolvimento/build e TypeScript como linguagem principal do frontend.

## Alternativas Consideradas

### Alternativa 1: React + Vite + TypeScript

**Descricao**: Construir a aplicacao em React mantendo Vite e TypeScript.

**Pros**:

- Ecossistema muito amplo.
- Forte adocao de mercado.

**Contras**:

- Exigiria redefinir convencoes e estrutura planejada para Vue.
- Maior custo de alinhamento para o direcionamento atual do projeto.

**Razao para rejeicao**: O direcionamento tecnico do projeto ja estava definido para Vue.

### Alternativa 2: JavaScript sem TypeScript

**Descricao**: Implementar com Vue + Vite, mas sem tipagem estatica.

**Pros**:

- Menor friccao inicial.
- Setup ligeiramente mais simples.

**Contras**:

- Menor seguranca em regras de dominio.
- Maior risco de regressao em evolucao do codigo.

**Razao para rejeicao**: A tipagem de TypeScript melhora confiabilidade para regras de negocio e refatoracoes.

## Consequencias

### Positivas

- Base moderna e produtiva para frontend.
- Melhor manutencao e refatoracao com tipagem estatica.
- Build e hot reload rapidos com Vite.

### Negativas

- Exige disciplina de tipagem desde o inicio.
- Aumenta complexidade inicial comparado a JavaScript puro.

### Neutras

- Necessidade de configurar lint/format e padroes de projeto.
- Dependencia do ecossistema Node.js para build e testes.

## Trade-offs

Priorizamos qualidade estrutural e manutencao de medio prazo em vez da menor friccao possivel de curto prazo.

## Notas de Implementacao

- Evidencias principais: docs de stack e padroes do repositiorio.
- Stack de testes e deploy complementa essa decisao nos ADRs 0007 e 0008.

## Validacao

- Ciclo de desenvolvimento fluido no Vite.
- Evolucao de funcionalidades sem aumento excessivo de defeitos.
- Boa legibilidade e estabilidade de tipos em modulos de dominio.

## Revisao

2026-04-18: Criacao inicial.
