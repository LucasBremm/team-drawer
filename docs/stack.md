# Stack Tecnológica

## Linguagens e Runtime

- TypeScript como linguagem principal no frontend (com interoperabilidade com JavaScript quando necessário).
- Runtime de desenvolvimento e build baseado em Node.js.

## Frameworks Principais

- Vue.js para construção da interface e componentização.
- Vite para ambiente de desenvolvimento e build da aplicação.

## Bibliotecas Chave

- Bootstrap para layout e componentes visuais.
- Popper para posicionamento de overlays e avisos na interface.

## Banco de Dados

- Sem banco de dados externo.
- Persistência local em localStorage do navegador.
- Exportação/importação em JSON para portabilidade dos dados.

## Infraestrutura

- Aplicação frontend estática.
- Deploy planejado via GitHub Pages.
- Sem dependência de servidor de aplicação para execução da regra principal.

## Ferramentas de Desenvolvimento

- Build tool: Vite.
- Testes unitários: Vitest + Vue Test Utils.
- Cobertura mínima de testes unitários: 80%.
- Lint/format: ESLint + Prettier (padrão recomendado para Vue + Vite).
- CI/CD: GitHub Actions em push para main com build e publicação no GitHub Pages.

## Arquitetura Geral

Arquitetura SPA frontend com responsabilidades separadas por camadas:

- Camada de apresentação: componentes Vue e telas.
- Camada de aplicação: orquestração de fluxos de cadastro, seleção, sorteio e compartilhamento.
- Camada de domínio: regras de validação de jogador e algoritmo de balanceamento de times.
- Camada de persistência local: serviços para leitura/escrita no localStorage e importação/exportação JSON.

Fluxo de dados esperado:

1. Usuário altera cadastro de jogadores.
2. Estado é validado e persistido em localStorage.
3. Usuário seleciona participantes e executa sorteio.
4. Algoritmo retorna dois times + métricas.
5. Resultado é exibido e pode ser copiado no formato textual padronizado.

## Decisões Arquiteturais Importantes

- Frontend-only para simplificar operação e reduzir custo de infraestrutura.
- Persistência local para uso casual sem necessidade de autenticação.
- Exportação/importação JSON para compartilhamento manual do cadastro.
- Regras de sorteio encapsuladas em módulo isolado para facilitar testes unitários.
- UI em português do Brasil e código preferencialmente em inglês para consistência técnica.
