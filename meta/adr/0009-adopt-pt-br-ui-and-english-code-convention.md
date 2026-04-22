# 9. Adopt pt-BR UI and English Code Convention

Data: 2026-04-18

## Status

Aceita

## Contexto

O publico do produto e majoritariamente brasileiro, enquanto boas praticas de desenvolvimento tendem a favorecer nomenclatura tecnica em ingles no codigo para consistencia com ecossistema e ferramentas.

## Decisao

Decidimos manter toda interface para usuario em portugues do Brasil (pt-BR) e codigo-fonte preferencialmente em ingles.

## Alternativas Consideradas

### Alternativa 1: UI e codigo em portugues

**Descricao**: Usar portugues em todas as camadas.

**Pros**:

- Coerencia linguistica unica.
- Curva menor para contribuidores lusofonos iniciantes.

**Contras**:

- Menor alinhamento com nomenclatura de bibliotecas/ecossistema.
- Pode dificultar contribuicao de publico tecnico mais amplo.

**Razao para rejeicao**: Inglês no codigo melhora interoperabilidade tecnica.

### Alternativa 2: UI e codigo em ingles

**Descricao**: Padronizar totalmente em ingles.

**Pros**:

- Maxima padronizacao tecnica internacional.
- Facilita colaboracao global.

**Contras**:

- Reduz aderencia para usuario final local.
- Piora experiencia de uso para publico casual brasileiro.

**Razao para rejeicao**: O produto e orientado a uso local em pt-BR.

## Consequencias

### Positivas

- Melhor UX para publico alvo.
- Codigo alinhado a convencoes tecnicas do ecossistema.

### Negativas

- Exige disciplina para evitar mistura inconsistente de idiomas.
- Revisoes precisam verificar convencao em duas frentes.

### Neutras

- Possivel evolucao futura para i18n sem alterar convencao de codigo.
- Documentacao deve deixar fronteira de idioma explicita.

## Trade-offs

Priorizamos acessibilidade para usuario final local sem abrir mao da consistencia tecnica no codigo.

## Notas de Implementacao

- Strings de UI em pt-BR.
- Identificadores de codigo, nomes de funcoes e modulos em ingles.

## Validacao

- Revisoes de PR verificam aderencia da convencao.
- Feedback de usuario confirma clareza textual da UI.

## Revisao

2026-04-18: Criacao inicial.
