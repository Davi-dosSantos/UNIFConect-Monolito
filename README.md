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
-   **Documentação:** [Swagger / OpenAPI](https://swagger.io/)

## ⚙️ Guia de Instalação e Execução

Para executar o backend localmente, siga os passos abaixo.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
-   Uma instância do **PostgreSQL** rodando localmente ou em um container Docker.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Davi-dosSantos/UNIFConect-backend.git](https://github.com/Davi-dosSantos/UNIFConect-backend.git)
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd unifconect-backend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo `.env` na raiz do projeto, baseado no arquivo `.env.example` (se houver) ou use o modelo abaixo.
    -   Você **PRECISA** preencher a `DATABASE_URL` com a string de conexão do seu banco PostgreSQL.
    ```env
    # String de conexão do seu banco de dados PostgreSQL
    # Formato: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    DATABASE_URL="postgresql://docker:docker@localhost:5432/unifconect"

    # Chave secreta para assinar os tokens JWT
    JWT_SECRET="sua-chave-secreta-super-segura"

    # Porta em que o servidor irá rodar
    PORT=3333
    ```

5.  **Execute as migrações do banco de dados:**
    -   Este comando irá criar as tabelas no seu banco de dados com base no schema do Prisma.
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

✅ O backend estará rodando em `http://localhost:3333`.

## 📖 API

A documentação da API, gerada pelo Swagger, estará disponível em `http://localhost:3333/docs` após iniciar o servidor.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
**Desenvolvido por Davi dos Santos Costa**
