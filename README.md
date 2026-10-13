# Agenda Online API

API NestJS 12 para **agendamento de serviços** e **compra de produtos** em estabelecimentos (ex.: barbearia).

## Stack

- NestJS 12 / TypeORM / PostgreSQL
- JWT (`passport-jwt`) + bcrypt
- Swagger (`/api`)
- Rate limit (`@nestjs/throttler`)

## Requisitos

1. PostgreSQL instalado e acessível
2. Node.js `^20.19.0` ou `>=22.12.0`

## Variáveis de ambiente

Crie um arquivo `.env` na raiz:

| Variável | Descrição |
| --- | --- |
| `DB_HOST` | Host do banco |
| `DB_USERNAME` | Usuário do banco |
| `DB_PASSWORD` | Senha do banco |
| `DB_PORT` | Porta do banco |
| `DB_DATABASE` | Nome do banco |
| `JWT_SECRET` | Chave secreta JWT |
| `JWT_EXPIRES_IN` | Expiração do token (ex.: `1d`, `8h`) |

## Instalação

```bash
npm install
```

As migrations rodam automaticamente no boot (`migrationsRun: true`). Também é possível executar manualmente:

```bash
npm run migration:run
npm run migration:revert
```

## Executando

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run build
npm run start:prod
```

API em `http://localhost:3000`.

## Autenticação

- Rotas **públicas:** `GET /`, `POST /auth`, `POST /user`
- Demais rotas exigem header `Authorization: Bearer <token>`
- Login: `POST /auth` com `{ "email", "password" }` → retorna `accessToken` e dados do usuário

### Usuário admin inicial

Inserido via migration. Use no `POST /auth`:

| Campo | Valor |
| --- | --- |
| E-mail | `admin@agendaonline.com` |
| Senha | `Admin@123` |

### Tipos de usuário (`type_user`)

| Id | Tipo |
| --- | --- |
| 1 | Administrador |
| 2 | Administrador Estabelecimento |
| 3 | Profissional |
| 4 | Usuário |

Cadastro (`POST /user`) cria com tipo **Usuário (4)**.

## Rate limit

| Escopo | Limite |
| --- | --- |
| Geral | 20 req / minuto por IP |
| `POST /auth` | 5 req / minuto por IP |
| `GET /` (health) | sem limite |

Excesso → **429 Too Many Requests**.

## Swagger

Documentação interativa: [http://localhost:3000/api](http://localhost:3000/api)

1. Faça login em `POST /auth`
2. Clique em **Authorize** e informe `Bearer <accessToken>`
3. Teste os endpoints protegidos

## Módulos e rotas principais

| Recurso | Prefixo | Operações |
| --- | --- | --- |
| Health | `/` | `GET` |
| Auth | `/auth` | `POST` (login) |
| User | `/user` | CRUD + `PATCH /user/password/me` |
| TypeUser | `/type-user` | `GET`, `GET /:id` |
| State | `/state` | `GET`, `GET /:id` |
| City | `/city` | `GET`, `GET /:id`, `GET /state/:stateId` |
| Status | `/status` | `GET`, `GET /:id` |
| Category | `/category` | CRUD |
| ProductService | `/product-service` | CRUD |
| Establishment | `/establishment` | CRUD |
| Address | `/address` | CRUD + `GET /establishment/:establishmentId` |
| Professional | `/professional` | CRUD |
| Schedule | `/schedule` | CRUD (itens aninhados em `scheduleService`) |
| ScheduleService | `/schedule-service` | CRUD |

### Fluxo de agendamento

1. Cadastre/login do usuário
2. Crie estabelecimento, endereço, categoria e produto/serviço
3. Vincule profissional (`userId` + `establishmentId`)
4. Crie `schedule` com `userId`, `establishmentId`, `professionalId`, `statusId`, `scheduleDate` e itens (`serviceId`, `quantity`)
5. A API valida FKs, confere se o profissional pertence ao estabelecimento e calcula `totalPrice`

## Estrutura do projeto

```text
src/
  common/           # guards, decorators, utils
  auth/
  user/
  type-user/
  state/ city/ status/
  category/ product-service/
  establishment/ address/ professional/
  schedule/ schedule-service/
  migration/
  main.ts
  app.module.ts
```

## Design de banco

<img src="https://i.ibb.co/HpGj5Y5z/Agenda-Online-1.png" alt="Agenda-Online" border="0" />
