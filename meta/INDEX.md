# Meta Documentacao

Indice com resumo dos documentos em meta/.

## Pasta adr

- [README.md](adr/README.md): Visao geral de ADRs, indice por status e categorias, e processo para propor novas decisoes.
- [template.md](adr/template.md): Modelo padrao para criacao de novos ADRs.
- [0001-use-vue-vite-typescript-stack.md](adr/0001-use-vue-vite-typescript-stack.md): Define Vue + Vite + TypeScript como stack principal.
- [0002-adopt-frontend-only-spa-architecture.md](adr/0002-adopt-frontend-only-spa-architecture.md): Define arquitetura SPA frontend-only sem backend proprio.
- [0003-use-localstorage-and-json-portability.md](adr/0003-use-localstorage-and-json-portability.md): Define persistencia local em localStorage e portabilidade via JSON.
- [0004-separate-domain-logic-from-ui.md](adr/0004-separate-domain-logic-from-ui.md): Define separacao entre UI, aplicacao, dominio e servicos.
- [0005-adopt-heuristic-team-draw-balancing.md](adr/0005-adopt-heuristic-team-draw-balancing.md): Define estrategia hibrida para sorteio balanceado (combinatoria com poda ate 20 e heuristica acima).
- [0006-define-json-import-conflict-policy.md](adr/0006-define-json-import-conflict-policy.md): Define politica de conflito na importacao por nome.
- [0007-standardize-unit-testing-strategy.md](adr/0007-standardize-unit-testing-strategy.md): Define stack e meta de cobertura de testes unitarios.
- [0008-deploy-static-app-with-github-pages-actions.md](adr/0008-deploy-static-app-with-github-pages-actions.md): Define deploy estatico com GitHub Actions e GitHub Pages.
- [0009-adopt-pt-br-ui-and-english-code-convention.md](adr/0009-adopt-pt-br-ui-and-english-code-convention.md): Define convencao de idioma da UI e do codigo.

## Pasta architecture

- [system-overview.md](architecture/system-overview.md): Visao de alto nivel de componentes, camadas e fluxo de dados.
- [communication-patterns.md](architecture/communication-patterns.md): Padroes de comunicacao interna e com APIs de plataforma do navegador.
