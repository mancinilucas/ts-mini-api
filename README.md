**TS Mini API**

Projeto didático que demonstra como implementar a infraestrutura HTTP em Node.js "puro" usando TypeScript. O objetivo é praticar os fundamentos e entender como uma API funciona por baixo dos panos, sem depender de frameworks que abstraem toda a lógica (ex.: Express, Fastify).

**Motivação**:

- **Aprender**: ver como roteamento, parsing de URL/body, contexto de requisição e tratamento de erros são implementados.
- **Praticar**: consolidar conceitos de HTTP, TypeScript e organização de código em pequenas camadas.

**Recursos principais**

- **Roteamento**: implementação simples que faz _match_ de rotas e extrai params.
- **Contexto de requisição**: criação de um `RequestContext` para agrupar request/response e dados auxiliares.
- **Parsing**: funções para parsear corpo (`parseBody`) e URL (`parseUrl`).
- **Handlers**: abstração de `Handler` e `withErrorHandling` para centralizar respostas e erros.
- **Validação**: validações centralizadas antes de executar controllers.

**Arquitetura (visão geral)**

- **Entrada**: [src/index.ts](src/index.ts) — ponto de partida.
- **Servidor / boot**: [src/app/server.ts](src/app/server.ts) — faz a ponte com o core HTTP do Node.
- **Roteador**: [src/app/router.ts](src/app/router.ts) — registra rotas e delega execução.
- **Controllers**: [src/app/controllers](src/app/controllers) — lógica por endpoint (ex.: `createUser`, `getUserById`, `healthCheck`, `homePage`).
- **Core HTTP helpers**: [src/app/http](src/app/http) — `Handler.ts`, `matchRoute.ts`, `parseBody.ts`, `parseUrl.ts`, `sendResponse.ts`, `withErrorHandling.ts`, `createRequestContext.ts`.
- **Serviços**: [src/app/services/user.service.ts](src/app/services/user.service.ts) — camada de negócio simulada.
- **Erros e validação**: [src/app/errors](src/app/errors) e [src/app/validation](src/app/validation).

**Principais arquivos**

- **[src/index.ts](src/index.ts)**: inicializa o servidor.
- **[src/app/server.ts](src/app/server.ts)**: cria o servidor HTTP nativo.
- **[src/app/router.ts](src/app/router.ts)**: regras de roteamento e registro de handlers.
- **[src/app/http/Handler.ts](src/app/http/Handler.ts)**: contrato de handlers e utilitários.
- **[src/app/controllers](src/app/controllers)**: controllers por rota.
- **[src/app/services/user.service.ts](src/app/services/user.service.ts)**: exemplo de serviço simples.

**Endpoints (exemplos)**

- `GET /` → página inicial
- `GET /health` → healthcheck
- `POST /users` → cria usuário
- `GET /users/:id` → obter usuário por id

Exemplo rápido com `curl`:

`curl -i localhost:3000/health`

`curl -i -X POST localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Alice"}'`

`curl -i localhost:3000/users/123`

**Como rodar (sugestões)**

- Instale dependências:

`pnpm install`

- Execução direta com TypeScript (dev):

`pnpm exec ts-node src/index.ts`

- Build + execução (produção):

`pnpm exec tsc`
`node dist/index.js`

Observação: o projeto usa TypeScript; ajuste o comando conforme seu gerenciador de pacotes (`npm`, `yarn`, `pnpm`) e ferramentas instaladas.
