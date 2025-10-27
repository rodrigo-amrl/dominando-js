# 🚀 Dominando JS - API REST com Node.js, Express e Sequelize

Este projeto tem como objetivo consolidar conhecimentos avançados de **JavaScript moderno**, desenvolvimento backend com **Node.js** e arquitetura profissional de APIs. A aplicação implementa autenticação JWT, organização em camadas, tratamento de erros, integração com banco de dados via Sequelize ORM e monitoramento de erros com Sentry.

---

## 📌 **Funcionalidades Principais**

- 🔐 **Autenticação JWT**
- 👤 Gerenciamento de usuários
- 🧾 Cadastro e controle de **clientes e contatos**
- 🗄️ Integração com banco de dados MySQL usando **Sequelize**
- ✅ Validação de dados com **Yup**
- ⚠️ Tratamento de exceções elegante com **Youch**
- 🛡️ Middleware de segurança
- 📡 API modular organizada com Express

---

## 🛠️ **Tecnologias Utilizadas**

| Tecnologia        | Finalidade |
|------------------|-----------|
| **Node.js**      | Ambiente de execução JavaScript no backend |
| **Express**      | Framework para criação de APIs REST |
| **Express Async Errors** | Captura de erros assíncronos automaticamente |
| **Sequelize + MySQL2** | ORM para manipulação do banco de dados MySQL |
| **bcryptjs**     | Criptografia de senhas |
| **jsonwebtoken** | Autenticação via tokens JWT |
| **Yup**          | Validação de entradas (schema validation) |
| **Sentry**       | Monitoramento e rastreamento de erros em produção |
| **Youch**        | Exibição amigável de erros no ambiente de desenvolvimento |
| **Nodemon**      | Hot reload em ambiente de desenvolvimento |
| **ESLint + Prettier** | Padronização e qualidade de código |
| **Sucrase**      | Suporte a sintaxe moderna (ES Modules) com melhor performance |

---

## 📁 **Estrutura do Projeto (simplificada)**

```
src/
 ├─ app/
 │   ├─ controllers/
 │   ├─ middlewares/
 │   └─ models/
 ├─ database/
 ├─ routes.js
 ├─ app.js
 └─ server.js
.env
```

---

## ⚙️ **Variáveis de Ambiente (.env)**

Crie um arquivo `.env` na raiz do projeto com os seguintes dados:

```
SERVER_PORT=3000
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASS=senha
DATABASE_NAME=dominandojs
SENTRY_DSN=seu_dsn_aqui
JWT_SECRET=seu_token_secreto
JWT_EXPIRES_IN=7d
```

---

## ▶️ **Como Executar o Projeto**

### 🔽 1. **Clonar o projeto**
```bash
git clone https://github.com/seu-usuario/dominando-js.git
cd dominando-js
```

### 📦 2. **Instalar dependências**
```bash
yarn install
```

### 🗄️ 3. **Configurar o banco de dados**
```bash
yarn sequelize db:create
yarn sequelize db:migrate
```

### 🚀 4. **Iniciar o servidor**
#### Ambiente de produção:
```bash
yarn start
```

#### Ambiente de desenvolvimento com hot reload:
```bash
yarn dev
```

---

## 🌐 **Rotas Principais**

| Método | Rota | Descrição |
|-------|------|----------|
| POST | `/sessions` | Autenticação e geração de JWT |
| GET | `/customers` | Lista todos os clientes |
| POST | `/customers` | Cria um novo cliente |
| GET | `/customers/:id/contacts` | Lista contatos do cliente |
| GET | `/users` | Lista usuários do sistema |

> **Obs:** Todas as rotas (exceto `/sessions`) utilizam o middleware de autenticação.

---

## 🔄 Scripts Disponíveis

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```

---

## 📌 Próximos Passos / Melhorias

- Implementação de testes automatizados
- Documentação com Swagger
- Deploy com CI/CD

---

## ✅ Conclusão

Este projeto foi desenvolvido com foco em **boas práticas**, **escalabilidade** e **código limpo**, sendo ideal para quem deseja dominar backend em Node.js com uma arquitetura sólida.

---

**Feito com 💛 utilizando Node.js e JavaScript Moderno.**
