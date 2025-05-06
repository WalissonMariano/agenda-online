
## Descrição

API para gerenciar pedidos, incluindo operações de criação, atualização, exclusão e visualização de pedidos e seus itens.

## Requisitos

1 - Possuir um banco de dados PostgreSQL instalado.
<br>
2 - Possuir NodeJs instalado.

## Variáveis de ambiente

Declare as seguintes variáveis de ambiente:

|Váriavel|Descrição|
| --- | --- |
| DB_HOST | Host do banco de dados |
| DB_USERNAME | Usuário do banco de dados |
| DB_PASSWORD | Senha do banco de dados |
| DB_PORT | Porta do banco de dados |
| DB_DATABASE | Nome do banco de dados |
|JWT_SECRET| Defina a chave secreta JWT |
| JWT_EXPIRES_IN | Tempo de expiração do token |


## Design de banco
<img src="https://i.ibb.co/HpGj5Y5z/Agenda-Online-1.png" alt="Agenda-Online-1" border="0" />

## Instalação de dependências

```bash
$ npm install
```

## Executando a Api

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

