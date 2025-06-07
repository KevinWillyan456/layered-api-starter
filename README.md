# 🚀 Layered API Starter

Um ponto de partida simples, moderno e organizado para criar APIs Node.js com TypeScript, arquitetura em camadas (MVC) e Prisma ORM. Ideal para quem quer começar rápido e com boas práticas! 😎

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **TypeScript** — Tipagem estática para maior segurança
- **Express** — Framework web rápido e minimalista
- **Prisma** — ORM moderno e intuitivo
- **SQLite** — Banco de dados leve e fácil de usar (padrão)
- **Zod** — Validação de dados
- **JWT** — Autenticação via tokens
- **bcryptjs** — Hash de senhas
- **dotenv** — Variáveis de ambiente

---

## 📁 Estrutura em Camadas

- **Controllers** — Recebem requisições e retornam respostas
- **Services** — Lógica de negócio
- **Repositories** — Abstração de acesso a dados
- **DAOs** — Comunicação direta com o banco de dados

---

## 🚦 Como Rodar o Projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/KevinWillyan456/layered-api-starter.git
   cd layered-api-starter
   ```

2. **Instale o pnpm (caso ainda não tenha)**

   ```bash
   npm install -g pnpm
   ```

3. **Instale as dependências**

   ```bash
   pnpm install
   ```

4. **Configure as variáveis de ambiente**
   - Copie `.env.example` para `.env` e preencha as variáveis necessárias.

5. **Rode as migrations do banco**

   ```bash
   pnpm prisma:migrate
   ```

6. **Inicie o servidor em modo desenvolvimento**

   ```bash
   pnpm dev
   ```

   Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📚 Exemplos de Rotas

- `POST /users` — Cria usuário (pública)
- `GET /users` — Lista usuários (protegida)
- `GET /users/:id` — Busca usuário por ID (protegida)
- `PUT /users/:id` — Atualiza usuário (protegida)
- `DELETE /users/:id` — Remove usuário (protegida)

---

## ✨ Dicas

- Use este projeto como base para novos backends Node.js!
- Fácil de adaptar para outros bancos (MySQL, PostgreSQL, etc).
- Pronto para deploy em qualquer serviço que rode Node.js.

---

Feito com 💙 para a comunidade Node.js!
