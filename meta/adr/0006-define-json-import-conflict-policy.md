# 6. Define JSON Import Conflict Policy

Data: 2026-04-18

## Status

Aceita

## Contexto

O app permite importar cadastros em JSON. Sem uma politica explicita de conflito, importacoes podem gerar duplicidade ou sobrescrita inesperada de jogadores.

## Decisao

Decidimos que, em importacao valida, os dados serao mesclados sem duplicar por nome. Em caso de conflito por nome, o cadastro local existente sera mantido e o usuario recebera sinalizacao.

## Alternativas Consideradas

### Alternativa 1: Sobrescrever registro local

**Descricao**: Quando nomes coincidirem, usar dado importado como fonte final.

**Pros**:

- Atualizacao direta por importacao.
- Menor ambiguidade de origem para quem importa.

**Contras**:

- Risco de perda de ajustes locais.
- Surpresa para usuario sem confirmacao explicita.

**Razao para rejeicao**: Preservar dado local foi considerado mais seguro no fluxo atual.

### Alternativa 2: Perguntar usuario por conflito

**Descricao**: Abrir decisao interativa para cada conflito detectado.

**Pros**:

- Controle total do usuario.
- Evita regra fixa unica.

**Contras**:

- Fluxo mais lento e cansativo.
- Maior complexidade de UX.

**Razao para rejeicao**: Impacto de usabilidade para o escopo casual.

## Consequencias

### Positivas

- Evita duplicidade por nome.
- Reduz risco de sobrescrita acidental local.
- Mantem fluxo de importacao simples.

### Negativas

- Pode impedir atualizacao automatica desejada em alguns cenarios.
- Depende de consistencia de nomes para deduplicacao.

### Neutras

- Exige feedback claro sobre conflitos detectados.
- Requer validacoes de schema antes da mesclagem.

## Trade-offs

Priorizamos seguranca de dados locais e simplicidade de fluxo sobre flexibilidade de resolucao de conflito caso a caso.

## Notas de Implementacao

- Chave de conflito: nome do jogador.
- Importacao invalida deve abortar com mensagem de erro.
- Importacao valida com conflito deve concluir e notificar conflitos.

## Validacao

- Importacoes nao geram duplicatas de nome.
- Usuarios recebem sinalizacao clara de conflitos tratados.

## Revisao

2026-04-18: Criacao inicial.
