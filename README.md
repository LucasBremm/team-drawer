# Team Drawer

Aplicacao web frontend para organizar partidas casuais de futebol com sorteio equilibrado de dois times.

## Resumo

O Team Drawer permite manter um cadastro local de jogadores, selecionar quem vai participar da rodada e gerar dois times buscando equilibrio de quantidade, posicao e habilidade.

O foco do projeto e ser simples de usar no dia a dia (sem backend), com dados persistidos no navegador e possibilidade de exportar/importar JSON para backup e compartilhamento.

## Funcionalidades

- Cadastro de jogadores com nome, posicao e nivel de habilidade.
- Edicao e remocao de jogadores.
- Selecao dos participantes da partida atual.
- Sorteio de dois times com balanceamento de posicao e habilidade.
- Exibicao de metricas do sorteio para apoiar decisao de manter ou refazer.
- Ressorteio sem perder cadastro e selecao atual.
- Exportacao e importacao de jogadores em JSON, com politica de mesclagem por nome.
- Copia do resultado para clipboard em formato textual padronizado.

## Regras Principais

- Jogador deve ter nome, posicao valida e habilidade inteira entre 1 e 10.
- Sorteio exige ao menos 4 jogadores selecionados.
- Diferenca de tamanho entre os times deve ser no maximo 1 jogador.
- O algoritmo prioriza equilibrio por posicao e, em seguida, minimiza diferenca de habilidade.
- Em empates de qualidade entre solucoes, o desempate e aleatorio.

## Stack

- Vue 3 + TypeScript + Vite.
- Pinia para gerenciamento de estado.
- Bootstrap + Popper para interface.
- Vitest + Vue Test Utils para testes.
- Persistencia local em localStorage.

## Comandos

Antes de rodar os scripts, instale as dependencias:

```bash
npm install
```

Scripts disponiveis:

- `npm run dev`: inicia servidor de desenvolvimento com hot reload.
- `npm run build`: executa checagem de tipos e gera build de producao em `dist/`.
- `npm run preview`: sobe um servidor local para visualizar o build gerado.
- `npm run test`: roda os testes uma vez.
- `npm run test:watch`: roda os testes em modo observacao durante desenvolvimento.
- `npm run test:coverage`: roda os testes e gera relatorio de cobertura.

## Estrutura de Documentacao

- `docs/index.md`: visao geral da documentacao do produto.
- `docs/features.md`: funcionalidades principais e secundarias.
- `docs/business-rules.md`: regras de negocio e criterios de validacao.
- `docs/integrations.md`: integracoes com APIs de navegador e deploy.
- `docs/patterns.md`: padroes de arquitetura e organizacao de codigo.
- `docs/stack.md`: tecnologias e ferramentas adotadas.

## Observacoes

- Projeto frontend-only: nao depende de backend proprio para funcionar.
- Dados ficam no navegador; use exportacao JSON para backup/portabilidade.
