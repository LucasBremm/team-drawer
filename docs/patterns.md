# Padrões de Design

## Padrões Arquiteturais

- SPA (Single Page Application) com Vue.
- Arquitetura orientada a componentes para UI.
- Separação entre regras de domínio (sorteio/validações) e camada visual.
- Persistência local abstraída por serviço de armazenamento.

## Padrões de Código

- Services para encapsular acesso a localStorage, import/export e clipboard.
- Funções puras para algoritmo de sorteio e cálculo de métricas.
- Modelo de dados explícito para Player, MatchSelection e DrawResult.
- Estratégia de reexecução de sorteio reaproveitando a mesma seleção de participantes.

## Organização de Código

Estrutura sugerida:

- src/components: componentes de UI reutilizáveis.
- src/views: páginas da aplicação.
- src/domain: entidades e regras de negócio.
- src/services: integrações com APIs do navegador.
- src/stores: estado de aplicação.
- src/utils: utilitários puros.
- tests/unit: testes unitários.

## Convenções de Nomenclatura

- Código preferencialmente em inglês.
- Textos visíveis ao usuário em português do Brasil.
- Componentes Vue em PascalCase.
- Funções, variáveis e propriedades em camelCase.
- Constantes globais em UPPER_SNAKE_CASE quando aplicável.

## Padrões de Teste

- Stack oficial de testes: Vitest + Vue Test Utils.
- Testes unitários para:
  - validação de jogador;
  - serialização/deserialização de JSON;
  - algoritmo de sorteio e cálculo de métricas;
  - formatação textual para clipboard.
- Meta de cobertura mínima: 80%.

## Padrões de Tratamento de Erros

- Validação preventiva de entrada de dados no formulário.
- Tratamento de erro de parse em importação JSON.
- Fallback para falha de clipboard (exibir textarea com texto pronto para cópia manual).
- Feedback ao usuário via UI com Bootstrap/Popper.

## Boas Práticas Específicas

- Evitar excesso de comentários; comentar apenas fluxos não óbvios.
- Garantir que a lista de jogadores não seja perdida após sorteio.
- Manter regras de domínio desacopladas da interface para facilitar manutenção.
- Priorizar testes nas regras de balanceamento dos times.
