# 5. Adopt Hybrid Team Draw Balancing (Combinatorial + Heuristic)

Data: 2026-04-18

## Status

Aceita

## Contexto

O objetivo central do produto e dividir jogadores em dois times com equilibrio de habilidade e diferenca maxima de um jogador entre equipes, mantendo experiencia rapida no uso casual.

Durante o refinamento da v1, foi identificado que uma estrategia unica puramente heuristica reduz complexidade, mas pode perder qualidade de equilibrio em conjuntos menores onde uma busca mais precisa ainda e viavel sem impactar UX.

Com o uso do produto, observou-se que o equilibrio apenas por habilidade pode gerar concentracao de posicoes-chave no mesmo time (ex.: 2 atacantes juntos), reduzindo a percepcao de justica do sorteio.

## Decisao

Decidimos adotar uma estrategia hibrida de balanceamento:

- Busca combinatoria com poda quando houver ate 20 jogadores selecionados, com prioridade para balanceamento por posicao e, depois, minimizacao da diferenca total de habilidade.
- Fallback heuristico para conjuntos acima de 20 jogadores selecionados, preservando latencia de resposta.
- Restricao obrigatoria de diferenca de tamanho entre times <= 1.
- Para exatamente 2 jogadores de uma mesma posicao, distribuir obrigatoriamente 1 por time quando houver particao viavel.
- Para contagens impares por posicao, manter diferenca maxima de 1 por posicao entre times quando houver particao viavel.
- Relaxar regra de posicao somente quando nao existir nenhuma particao valida que respeite simultaneamente tamanho dos times e regras de posicao.
- Em empates de qualidade entre solucoes equivalentes, aplicar desempate aleatorio.

Para teste e depuracao, permitimos seed opcional de aleatoriedade em nivel interno (sem obrigacao de exposicao na UI da v1).

## Alternativas Consideradas

### Alternativa 1: Sempre combinatoria/exata

**Descricao**: Usar busca combinatoria para todos os tamanhos de entrada.

**Pros**:

- Resultado potencialmente otimo global.
- Criterio deterministico forte.

**Contras**:

- Custo computacional cresce rapidamente com o numero de jogadores.
- Risco de degradacao de UX em grupos maiores.

**Razao para rejeicao**: Nao atende bem ao requisito de latencia para volumes maiores.

### Alternativa 2: Sempre heuristica

**Descricao**: Usar apenas heuristica para todos os tamanhos de entrada.

**Pros**:

- Implementacao mais simples.
- Latencia previsivel mesmo em volumes maiores.

**Contras**:

- Pode perder qualidade de equilibrio em conjuntos menores, onde exata ainda seria viavel.

**Razao para rejeicao**: Perde oportunidade de melhorar qualidade de balanceamento sem custo relevante em entradas pequenas.

### Alternativa 3: Sorteio aleatorio simples

**Descricao**: Sortear jogadores sem funcao de minimizacao.

**Pros**:

- Implementacao muito simples.
- Execucao extremamente rapida.

**Contras**:

- Maior chance de desequilibrio.
- Menor confianca no resultado.

**Razao para rejeicao**: Nao atende o objetivo de equilibrio como criterio primario.

## Consequencias

### Positivas

- Melhor equilibrio em conjuntos pequenos/medios com busca combinatoria.
- Mantem resposta rapida em conjuntos maiores com fallback heuristico.
- Permite exibicao de metricas objetivas (habilidade e tamanho).

### Negativas

- Aumenta complexidade de implementacao e testes (dois caminhos de execucao).
- Nao garante otimo global em todos os cenarios (quando aciona fallback heuristico).

### Neutras

- Documentar claramente a prioridade de balanceamento por posicao e o criterio de fallback.
- Necessidade de validar comportamento em limiar (20 -> 21 jogadores).

## Trade-offs

Priorizamos abordagem hibrida para equilibrar qualidade de resultado (entradas menores) e desempenho/fluidez (entradas maiores).

## Notas de Implementacao

- Restricao obrigatoria: diferenca de quantidade entre times <= 1.
- Criterio principal: minimizar violacoes de distribuicao por posicao.
- Criterio secundario: minimizar diferenca de habilidade total.
- Formula de violacao de posicao: soma por posicao de `max(0, abs(deltaPosicao) - 1)`.
- Limiar de estrategia: busca combinatoria com poda ate 20 selecionados; acima disso, fallback heuristico.
- Estrategia heuristica implementada: gerar distribuicoes candidatas de contagem por posicao para cada tamanho alvo de time e amostrar particoes com tentativas suficientes, aplicando o mesmo ranking lexico do modo exato.
- Regra de fallback: so relaxar posicao quando nao houver particao viavel com regras completas.
- Empates de qualidade: resolucao aleatoria.
- Seed opcional interna para execucoes deterministicas de teste/debug.

## Validacao

- Diferenca media de habilidade em patamar aceitavel nos sorteios.
- Ressorteio com ate 30 selecionados atende meta de latencia do produto.
- Comportamento no limiar de 20 selecionados e coberto por testes.
- Casos com exatamente 2 jogadores da mesma posicao distribuem 1 por time quando viavel.
- Casos com contagem impar por posicao respeitam diferenca maxima de 1 por posicao quando viavel.

## Revisao

2026-04-18: Criacao inicial.
2026-04-18: Atualizacao para estrategia hibrida (combinatoria com poda ate 20 e heuristica acima).
2026-04-21: Atualizacao para priorizacao de balanceamento por posicao com fallback controlado por viabilidade.
2026-04-22: Detalhamento da formula de violacao por posicao e da estrategia heuristica por distribuicoes com tentativas reforcadas.
