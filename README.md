# Consulta Processual

Este projeto consiste em uma aplicação de consulta processual com front-end construído usando Next.js (ou React) e back-end construído usando Node.js e Express.

## Estrutura do projeto

O projeto é dividido em duas partes principais:

- `consulta-processual-frontend`: Aplicação front-end criada com Next.js (ou React).
- `consulta-processual-backend`: Aplicação back-end criada com Node.js e Express.

## Como executar o projeto

### Front-end

1. Navegue até a pasta `consulta-processual-frontend`.
2. Instale as dependências com `npm install` ou `yarn`.
3. Inicie o servidor de desenvolvimento com `npm run dev` ou `yarn dev`.

### Back-end

1. Navegue até a pasta `consulta-processual-backend`.
2. Instale as dependências com `npm install` ou `yarn`.
3. Inicie o servidor com `node index.js`.

## Configuração do banco de dados

1. Crie um banco de dados PostgreSQL e configure as variáveis de ambiente no arquivo .env na pasta consulta-processual-backend com as informações de conexão. Exemplo de arquivo .env:

DB_HOST=localhost
DB_PORT=5432
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase

2. Instale a biblioteca dotenv no back-end para carregar as variáveis de ambiente. Você pode instalá-la executando npm install dotenv ou yarn add dotenv.
3. Importe a biblioteca dotenv no início do arquivo index.js e configure as variáveis de ambiente. Adicione a seguinte linha no topo do arquivo:

```javascript
require("dotenv").config();
```

4. Atualize o arquivo database.js para usar as variáveis de ambiente em vez de valores fixos:

```javascript
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  },
);
```

module.exports = sequelize;

5. Certifique-se de que seu banco de dados esteja em execução e que as informações de conexão estejam corretas.

## Acesso à aplicação

Após iniciar os servidores, acesse o front-end em `http://localhost:3000` e o back-end em `http://localhost:3001`.
