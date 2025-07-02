
import { FastifyInstance } from 'fastify';
import { authenticate } from '../lib/auth.hook';
import { getUserProfileHandler, updateMyProfileHandler } from '../controllers/user.controller';
import { $ref } from '../schemas/user.schema';

export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/:userId/profile',
    {
      schema: {
        summary: 'Busca o perfil de um usuário específico',
        tags: ['Usuários'],
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'ID do usuário' },
          },
        },
        response: { 200: $ref('profileResponseSchema') },
      },
    },
    getUserProfileHandler
  );

  app.put<{
    Body: {
      bio?: string;
      course?: string;
      institution?: string;
      avatarUrl?: string;
    };
  }>(
    '/profile',
    {
      onRequest: [authenticate],
      schema: {
        summary: 'Cria ou atualiza o perfil do usuário logado',
        tags: ['Usuários'],
        security: [{ bearerAuth: [] }],
        body: $ref('updateProfileSchema'),
        response: { 200: $ref('profileResponseSchema') },
      },
    },
    updateMyProfileHandler
  );
}