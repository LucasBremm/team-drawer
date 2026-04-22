# 8. Deploy Static App with GitHub Pages via Actions

Data: 2026-04-18

## Status

Aceita

## Contexto

O projeto sera publico e usado como portfolio e ferramenta utilitaria. E necessario um processo simples de publicacao, com baixo custo e boa repetibilidade.

## Decisao

Decidimos usar build estatico e publicar no GitHub Pages por meio de GitHub Actions acionado em push para a branch main.

## Alternativas Consideradas

### Alternativa 1: Deploy manual

**Descricao**: Gerar build local e publicar manualmente.

**Pros**:

- Simples para iniciar.
- Sem necessidade de workflow no inicio.

**Contras**:

- Maior risco de erro humano.
- Menor rastreabilidade de publicacoes.

**Razao para rejeicao**: Automacao aumenta confiabilidade e repetibilidade.

### Alternativa 2: Hosting alternativo (Vercel/Netlify)

**Descricao**: Publicar em outra plataforma de hosting estatico.

**Pros**:

- Recursos extras de preview e observabilidade.
- Fluxos de deploy maduros.

**Contras**:

- Introduz nova dependencia externa.
- Menos alinhado ao objetivo de centralizar no GitHub.

**Razao para rejeicao**: GitHub Pages atende o escopo com menor dispersao de ferramentas.

## Consequencias

### Positivas

- Publicacao automatizada e consistente.
- Custo operacional minimo.
- Alinhamento com repositorio publico de portfolio.

### Negativas

- Dependencia das limitacoes de GitHub Pages.
- Menor flexibilidade para cenarios de infra mais complexos.

### Neutras

- Necessidade de manter workflow de CI/CD.
- Exige monitoramento basico de falhas de pipeline.

## Trade-offs

Priorizamos simplicidade e integracao com GitHub sobre recursos avancados de plataformas especializadas.

## Notas de Implementacao

- Trigger principal: push em main.
- Etapas: install, test, build, publish.

## Validacao

- Alteracoes em main resultam em publicacao bem-sucedida.
- Build publicado corresponde ao estado versionado.

## Revisao

2026-04-18: Criacao inicial.
