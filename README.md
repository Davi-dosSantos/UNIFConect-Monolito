# UnifConect - Backend 🚀

![Language](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge)
![Framework](https://img.shields.io/badge/Framework-Fastify-lightgrey?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Este é o repositório do backend da **UnifConect**, uma plataforma colaborativa projetada para facilitar a interação e o compartilhamento de conhecimento na comunidade acadêmica. O sistema foi concebido para ser modular, escalável e centrado no usuário, promovendo um espaço de colaboração e acolhimento entre estudantes.

Originalmente projetado em uma arquitetura de microserviços, o protótipo funcional validado foi implementado em uma arquitetura monolítica para garantir agilidade no desenvolvimento e na entrega de valor.

## ✨ Funcionalidades

O backend é responsável por toda a lógica de negócio, gerenciamento de dados e segurança da aplicação. Suas principais responsabilidades incluem:

-   **Serviço de Autenticação:** Gerenciamento de cadastro e login de usuários com tokens JWT.
-   **Serviço de Usuários e Perfis:** Gerenciamento completo dos perfis dos estudantes.
-   **Serviço de Ofertas:** Orquestração da criação, listagem e busca por ofertas de atividades.
-   **Serviço de Recursos:** Gerenciamento do acervo de materiais de estudo, incluindo upload e recuperação de arquivos.
-   **Documentação de API:** Geração automática de documentação interativa com Swagger/OpenAPI.

## 🛠️ Tecnologias Utilizadas

-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Ambiente de Execução:** [Node.js](https://nodejs.org/en/)
-   **Framework:** [Fastify](https://www.fastify.io/)
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [Prisma ORM](https://www.prisma.io/)
-   **Autenticação:** [JSON Web Token (JWT)](https://jwt.io/)
-   **Containerização:** [Docker](https://www.docker.com/)

## ⚙️ Guia de Instalação e Execução

Você pode executar o projeto de duas formas: localmente ou utilizando Docker.

### 1. Executando Localmente

#### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
-   Uma instância do **PostgreSQL** rodando localmente.

#### Passos

1.  **Clone o repositório e acesse o diretório:**
    ```bash
    git clone [https://github.com/Davi-dosSantos/UNIFConect-backend.git](https://github.com/Davi-dosSantos/UNIFConect-backend.git)
    cd unifconect-backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo `.env` na raiz do projeto. Você **PRECISA** preencher a `DATABASE_URL` com a string de conexão do seu banco PostgreSQL.
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="sua-chave-secreta-super-segura"
    PORT=3333
    ```

4.  **Execute as migrações do banco de dados:**
    ```bash
    npx prisma migrate dev
    ```

5.  **(Opcional) Popule o banco com dados iniciais:**
    - Se o seu projeto tiver um arquivo de seed configurado no `package.json`, execute o comando abaixo.
    ```bash
    npx prisma db seed
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

✅ O backend estará rodando em `http://localhost:3333`.

### 2. Executando com Docker

Como alternativa, se você possui Docker e Docker Compose instalados, pode iniciar todo o ambiente (API + Banco de Dados) com poucos comandos.

1.  **Clone o repositório e acesse o diretório.**

2.  **Configure as variáveis de ambiente:**
    - Crie o arquivo `.env` como no passo anterior. Para o Docker, o `HOST` da `DATABASE_URL` geralmente é o nome do serviço do banco de dados no arquivo `docker-compose.yml` (ex: `postgres`).

3.  **Suba os contêineres:**
    - O comando abaixo irá construir as imagens e iniciar os serviços em background.
    ```bash
    docker-compose up -d --build
    ```

4.  **(Opcional) Popule o banco com dados iniciais:**
    - Com os contêineres em execução, execute o comando de seed dentro do contêiner da API.
    ```bash
    docker-compose exec api npx prisma db seed
    ```

✅ O backend estará rodando em `http://localhost:3333` e conectado ao banco de dados do Docker.

## 📖 API

A documentação da API (Swagger) estará disponível em `http://localhost:3333/docs` após iniciar o servidor.

## 📄 Licença

Este projeto está sob a licença MIT.

---
**Desenvolvido por Davi dos Santos Costa**
