# Integrações

## Repositórios e Serviços Relacionados

### Navegador Web (APIs de Plataforma)

**Tipo**: APIs nativas do browser.

**Propósito**: Persistência local, cópia para área de transferência e importação/exportação de arquivos.

**Protocolo**: APIs JavaScript no cliente.

**Dados Trocados**:

- localStorage: lista de jogadores e estado local;
- Clipboard API: texto formatado dos times;
- File API: leitura/escrita de JSON para backup e compartilhamento.

**Dependência**: Crítica para experiência completa da aplicação.

**Tratamento de Falhas**:

- fallback via textarea com conteúdo pronto para cópia manual quando clipboard não disponível;
- mensagens de erro quando importação JSON falhar;
- proteção contra indisponibilidade de localStorage (modo restrito do navegador).

### GitHub Pages

**Tipo**: Hosting estático.

**Propósito**: Publicação e acesso público da aplicação.

**Protocolo**: Deploy de arquivos estáticos gerados pelo build.

**Dados Trocados**: Artefatos de build frontend.

**Dependência**: Importante para distribuição pública, mas não necessária para desenvolvimento local.

**Tratamento de Falhas**:

- reexecução do workflow de deploy para corrigir falhas transitórias de publicação;
- execução local independente de ambiente publicado.

## Dependências Externas

- Vue.js (framework de UI).
- Vite (build e dev server).
- Bootstrap (componentes e estilos).
- Popper (posicionamento de overlays/tooltips/avisos).

## Eventos

- Não há barramento de eventos externo no escopo atual.
- Eventos de domínio internos (seleção, sorteio, ressorteio) são tratados no estado da aplicação.

## Contratos de Integração

Contrato de JSON para importação/exportação de jogadores (estrutura sugerida):

- id: identificador único.
- name: nome do jogador.
- position: Goleiro | Defesa | Meio | Atacante.
- skillLevel: inteiro de 1 a 10.

Validações do contrato:

- todos os campos obrigatórios;
- tipos corretos;
- valores dentro da faixa permitida.

Política de importação:

- mesclar com a base atual sem duplicar por nome;
- quando houver conflito por nome, manter registro já existente e sinalizar ocorrência ao usuário.

Versionamento de contrato:

- sem campo schemaVersion na versão inicial.

## Resiliência

- Não aplicável circuit breaker/retries de rede para regra principal, por ser frontend-only sem backend.
- Estratégia de tolerância a falhas focada em UX local:
  - validação defensiva de dados importados;
  - mensagens de erro claras;
  - fallback de interação quando APIs de plataforma não estiverem disponíveis.
