# Regras de Negócio

## Regras Críticas

### Regra 1: Estrutura Mínima de Jogador

**Descrição**: Todo jogador deve possuir nome, posição e nível de habilidade.

**Justificativa**: Esses campos são obrigatórios para sorteio e avaliação de equilíbrio.

**Implementação**: Validação de formulário e validação de domínio no módulo de jogador.

**Validações**:

- nome obrigatório e não vazio;
- posição obrigatória;
- habilidade obrigatória.

**Exceções**: Nenhuma prevista.

### Regra 2: Posições Permitidas

**Descrição**: A posição do jogador deve estar no conjunto: Goleiro, Defesa, Meio, Atacante.

**Justificativa**: Evita inconsistência semântica e padroniza o cadastro.

**Implementação**: Enum de domínio para posição de jogador.

**Validações**:

- rejeitar valores fora da lista;
- normalizar entradas para padrão interno único.

**Exceções**: Não aceitar variações textuais fora do conjunto definido.

### Regra 3: Faixa de Habilidade

**Descrição**: Nível de habilidade deve ser inteiro entre 1 e 10.

**Justificativa**: Mantém escala uniforme para cálculo de equilíbrio.

**Implementação**: Validação de formulário e validação no parser de importação JSON.

**Validações**:

- tipo numérico inteiro;
- mínimo 1;
- máximo 10.

**Exceções**: Nenhuma prevista.

### Regra 4: Participação na Partida

**Descrição**: Somente jogadores selecionados para a partida entram no sorteio.

**Justificativa**: Cadastro é persistente; elenco da partida é subconjunto dinâmico.

**Implementação**: Estado específico de seleção da rodada.

**Validações**:

- impedir sorteio com menos de 4 jogadores selecionados;
- considerar apenas IDs selecionados no algoritmo.

**Exceções**: Nenhuma prevista.

### Regra 5: Balanceamento dos Times

**Descrição**: Sorteio deve priorizar balanceamento por posição entre os dois times, mantendo diferença máxima de um jogador entre equipes e, em seguida, minimizar a diferença de habilidade total.

**Justificativa**: Garantir partidas mais equilibradas e competitivas.

**Implementação**: Algoritmo de distribuição com prioridade léxica: (1) violações de posição, (2) diferença de habilidade.

**Validações**:

- abs(quantidadeTimeA - quantidadeTimeB) <= 1;
- para cada posição, buscar abs(qtdPosicaoTimeA - qtdPosicaoTimeB) <= 1 quando houver partição viável;
- com exatamente 2 jogadores da mesma posição, exigir 1 por time quando houver partição viável;
- cálculo e exibição da diferença de habilidade total entre os times após aplicação do critério de posição.

**Exceções**:

- Quando não existir partição que satisfaça simultaneamente tamanho de times e regras de posição, o algoritmo relaxa posição e aplica ranking de fallback: menor violação total de posição, depois menor diferença de habilidade.
- Em empates de qualidade entre soluções, o desempate é aleatório.

### Regra 6: Ressorteio sem Perda de Cadastro

**Descrição**: Ressorteio não pode apagar cadastro nem seleção atual.

**Justificativa**: Usuário precisa comparar combinações mantendo o mesmo conjunto base.

**Implementação**: Sorteio reexecutável sobre estado atual sem reset estrutural.

**Validações**:

- após ressorteio, lista de jogadores permanece íntegra;
- seleção de participantes é preservada por padrão; qualquer reset deve ser ação explícita do usuário.

**Exceções**: Nenhuma prevista.

### Regra 7: Formato de Compartilhamento

**Descrição**: Resultado copiado deve seguir formato textual padronizado com Time A e Time B em blocos separados.

**Justificativa**: Facilita compartilhamento em chats sem retrabalho manual.

**Implementação**: Formatador de saída + chamada da Clipboard API.

**Validações**:

- preservar ordem de nomes exibida na UI;
- incluir cabeçalhos de time;
- evitar campos vazios na saída.

**Exceções**: Em falha de clipboard, exibir textarea com conteúdo pronto para cópia manual.

## Validações e Restrições

- Integridade de estrutura JSON no fluxo de importação.
- Rejeição de registros inválidos na importação.
- Em importação válida, mesclar com base atual sem duplicar jogadores por nome.
- Coerência entre jogadores cadastrados e jogadores selecionados.
- Proibição de habilidade fora da faixa válida.

## Políticas e Workflows

Fluxo principal:

1. Cadastrar e manter jogadores.
2. Selecionar participantes da partida.
3. Executar sorteio.
4. Avaliar métricas.
5. Ressortear se necessário.
6. Copiar resultado final para compartilhamento.

## Cálculos e Algoritmos

- Distribuição por posição com prioridade sobre habilidade quando houver viabilidade.
- Score de violação por posição: soma, para cada posição, de `max(0, abs(qtdPosicaoTimeA - qtdPosicaoTimeB) - 1)`.
- Soma de habilidade por time.
- Diferença absoluta de habilidade entre times.
- Diferença absoluta de quantidade de jogadores.
- Critério de qualidade do sorteio: minimizar violações de posição e, em seguida, minimizar diferença de habilidade com restrição de tamanho máximo entre times.

## Compliance e Regulamentações

- Não há processamento de dados sensíveis por backend próprio no escopo atual.
- Dados permanecem localmente no navegador, com compartilhamento explícito via exportação/importação.
- Não há requisito regulatório setorial específico identificado para a versão atual do produto.

## Regras de Domínio

- Jogador é a entidade central.
- Partida é uma composição temporária de jogadores selecionados.
- Resultado de sorteio é derivado e pode ser recalculado sem mutar cadastro base.
- Métricas de equilíbrio são parte obrigatória da interpretação do resultado.
- Balanceamento por posição é aplicado como critério principal sempre que houver solução viável.
