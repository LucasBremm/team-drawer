# Funcionalidades

## Funcionalidades Principais

### Cadastro CRUD de Jogadores

**Descrição**: Cadastro, edição, remoção e listagem de jogadores com nome, posição e nível de habilidade.

**Casos de Uso**:

- montar e atualizar base local de jogadores;
- ajustar nível/posição conforme evolução do grupo;
- remover jogadores inativos.

**Componentes Envolvidos**:

- formulário de jogador;
- lista de jogadores;
- serviço de persistência local.

**Dependências**:

- validação de dados de jogador;
- localStorage.

### Seleção de Participantes da Partida

**Descrição**: Permite marcar quais jogadores cadastrados participarão da partida atual.

**Casos de Uso**:

- selecionar somente presentes no dia;
- manter histórico local de cadastro sem excluir quem não joga na rodada.
- permitir sorteio apenas quando houver ao menos 4 jogadores selecionados.

**Componentes Envolvidos**:

- lista com seleção de participantes;
- estado da partida atual.

**Dependências**:

- cadastro de jogadores.

### Sorteio Balanceado de Times

**Descrição**: Gera dois times buscando equilíbrio de habilidade total e respeitando diferença máxima de um jogador entre os lados.

**Casos de Uso**:

- dividir grupo de forma mais justa;
- reduzir discrepância de nível entre os times.

**Componentes Envolvidos**:

- serviço/algoritmo de sorteio;
- visualização de resultado.

**Dependências**:

- participantes selecionados;
- cálculo de métricas.
- critério de desempate aleatório entre soluções equivalentes.

### Exibição de Métricas do Sorteio

**Descrição**: Exibe indicadores do resultado, como diferença de habilidade total e diferença de quantidade de jogadores.

**Casos de Uso**:

- comparar qualidade entre sorteios;
- decidir se mantém ou refaz o resultado.

**Componentes Envolvidos**:

- painel de métricas;
- cálculo de agregados por time.

**Dependências**:

- resultado do sorteio.

### Ressorteio

**Descrição**: Permite executar novo sorteio mantendo o cadastro e a seleção atual, sem reiniciar fluxo.

**Casos de Uso**:

- obter composição alternativa mais satisfatória;
- testar múltiplos cenários rapidamente.

**Componentes Envolvidos**:

- ação de ressorteio;
- persistência de estado da seleção.

**Dependências**:

- seleção vigente de jogadores;
- algoritmo de sorteio.

### Exportação e Importação de Cadastro em JSON

**Descrição**: Exporta base local de jogadores para JSON e importa arquivo JSON compatível, com mesclagem sem duplicar por nome.

**Casos de Uso**:

- compartilhar cadastro entre pessoas/dispositivos;
- restaurar backup de jogadores.

**Componentes Envolvidos**:

- serviço de serialização/deserialização;
- fluxo de upload/download de arquivo.

**Dependências**:

- modelo de dados de jogador;
- validação de schema do JSON.
- estratégia de resolução de duplicidade por nome.

### Cópia de Times para Clipboard

**Descrição**: Copia os dois times sorteados em formato textual padronizado.

**Casos de Uso**:

- envio rápido em grupos de mensagem;
- registro do sorteio com um clique.

**Componentes Envolvidos**:

- formatador de texto;
- integração com Clipboard API.

**Dependências**:

- sorteio concluído.
- fallback para textarea quando Clipboard API falhar.

## Funcionalidades Secundárias

- Feedback visual de validação no formulário de jogador.
- Avisos de sucesso/erro para importação, exportação e cópia.
- Persistência automática após alterações no cadastro.

## Funcionalidades em Desenvolvimento

- Refinamentos de UX para acelerar fluxo de cadastro, seleção e ressorteio.
- Opções avançadas de sorteio (ex.: configuração de seed e preferências de aleatoriedade).
- Melhorias de acessibilidade e eventual expansão de idioma além de pt-BR.

## Funcionalidades Deprecated

- Nenhuma funcionalidade marcada como deprecated no momento.
