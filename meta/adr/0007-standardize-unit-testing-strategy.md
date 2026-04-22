# 7. Standardize Unit Testing Strategy

Data: 2026-04-18

## Status

Aceita

## Contexto

As regras de negocio (validacao, sorteio, importacao/exportacao e formatacao para clipboard) sao fundamentais para o valor do produto. E necessario reduzir regressao e manter confiabilidade de evolucao.

## Decisao

Decidimos padronizar testes unitarios com Vitest + Vue Test Utils e adotar meta minima de 80% de cobertura.

## Alternativas Consideradas

### Alternativa 1: Jest + Vue Test Utils

**Descricao**: Usar Jest como runner de testes.

**Pros**:

- Ferramenta consolidada no ecossistema JS.
- Grande quantidade de exemplos e plugins.

**Contras**:

- Menos alinhado ao ecossistema Vite por padrao.
- Setup potencialmente menos enxuto nesse contexto.

**Razao para rejeicao**: Vitest integra melhor com a stack definida do projeto.

### Alternativa 2: Sem meta formal de cobertura

**Descricao**: Manter testes sem threshold definido.

**Pros**:

- Menor pressao inicial na criacao de testes.
- Mais flexibilidade para evolucao incremental.

**Contras**:

- Risco de cobertura cair silenciosamente.
- Menor governanca de qualidade.

**Razao para rejeicao**: Meta explicita fortalece disciplina de qualidade nas regras criticas.

## Consequencias

### Positivas

- Maior confianca para refatoracao.
- Melhor protecao contra regressao em funcionalidades centrais.
- Alinhamento com objetivo de qualidade declarado no projeto.

### Negativas

- Custo continuo de manutencao de testes.
- Threshold pode incentivar foco excessivo em percentual se mal gerido.

### Neutras

- Necessidade de selecionar bem escopo de testes por camada.
- CI deve executar testes e reportar cobertura.

## Trade-offs

Priorizamos confiabilidade e estabilidade de evolucao em vez de menor esforco inicial de desenvolvimento.

## Notas de Implementacao

- Foco principal em testes de dominio e servicos.
- Componentes de UI com testes orientados a comportamento critico.

## Validacao

- Pipeline falha quando cobertura ficar abaixo de 80%.
- Defeitos regressivos em regra de negocio reduzem ao longo do tempo.

## Revisao

2026-04-18: Criacao inicial.
