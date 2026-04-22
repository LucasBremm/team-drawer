# 3. Use localStorage with JSON Portability

Data: 2026-04-18

## Status

Aceita

## Contexto

O app precisa manter cadastro de jogadores localmente, sem banco externo, e permitir transporte simples dos dados entre pessoas/dispositivos.

## Decisao

Decidimos usar localStorage para persistencia local automatica e exportacao/importacao em JSON para portabilidade do cadastro.

## Alternativas Consideradas

### Alternativa 1: IndexedDB

**Descricao**: Persistencia local estruturada em banco no navegador.

**Pros**:

- Maior capacidade e flexibilidade.
- Operacoes mais robustas para volume alto.

**Contras**:

- Complexidade maior para o escopo atual.
- Custo de implementacao superior ao necessario.

**Razao para rejeicao**: localStorage atende bem ao volume e simplicidade esperados.

### Alternativa 2: Persistencia remota

**Descricao**: Salvar cadastro em backend ou BaaS.

**Pros**:

- Sincronizacao entre dispositivos.
- Backup centralizado.

**Contras**:

- Exige infraestrutura/autenticacao.
- Contraria objetivo de app frontend-only.

**Razao para rejeicao**: fora do escopo atual de simplicidade.

## Consequencias

### Positivas

- Persistencia imediata sem servidor.
- Facilidade de backup e compartilhamento por JSON.
- Menor custo de operacao.

### Negativas

- Dados atrelados ao navegador/dispositivo.
- Risco de perda local sem exportacao preventiva.

### Neutras

- Necessidade de validar schema e erros de parse na importacao.
- Necessidade de lidar com disponibilidade de APIs do navegador.

## Trade-offs

Priorizamos autonomia local e simplicidade de uso em vez de sincronizacao automatica multiplataforma.

## Notas de Implementacao

- Validar estrutura de jogador na importacao.
- Exibir feedback de erro/sucesso para operacoes de arquivo.

## Validacao

- Cadastro persiste entre recargas.
- JSON exportado e reimportado sem corromper dados validos.

## Revisao

2026-04-18: Criacao inicial.
