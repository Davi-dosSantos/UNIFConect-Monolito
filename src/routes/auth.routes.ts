import { FastifyInstance } from 'fastify';
import { registerUserHandler, loginHandler } from '../controllers/auth.controller';
import { $ref } from '../schemas/auth.schema';

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/register',
    {
      schema: {
        summary: 'Registra um novo usuário',
        tags: ['Autenticação'],
        body: $ref('createUserSchema'),
        response: {
          201: $ref('userResponseSchema'),
        },
      },
    },
    registerUserHandler
  );

  app.post(
    '/login',
    {
      schema: {
        summary: 'Realiza o login de um usuário',
        tags: ['Autenticação'],
        body: $ref('loginSchema'),
        response: {
          200: $ref('loginResponseSchema'),
        },
      },
    },
    loginHandler
  );
}