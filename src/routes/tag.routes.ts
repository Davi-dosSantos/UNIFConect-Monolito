import { FastifyInstance } from 'fastify';
import {
  createTagHandler,
  deleteTagHandler,
  getTagsHandler,
  updateTagHandler,
} from '../controllers/tag.controller';
import { $ref } from '../schemas/tag.schema';
import { authenticate } from '../lib/auth.hook';

export async function tagRoutes(app: FastifyInstance) {
  app.post<{ Body: { name: string; description?: string } }>(
    '/',
    {
      onRequest: [authenticate],
      schema: {
        summary: 'Cria uma nova tag (matéria/tópico)',
        tags: ['Tags'],
        security: [{ bearerAuth: [] }],
        body: $ref('createTagSchema'),
        response: { 201: $ref('tagResponseSchema') },
      },
    },
    createTagHandler
  );

  app.get(
    '/',
    {
      schema: {
        summary: 'Lista todas as tags disponíveis',
        tags: ['Tags'],
        response: { 200: $ref('tagsResponseSchema') },
      },
    },
    getTagsHandler
  );

  app.put<{
    Params: { tagId: string };
    Body: { name: string; description?: string };
  }>(
    '/:tagId',
    {
      onRequest: [authenticate],
      schema: {
        summary: 'Atualiza uma tag existente',
        tags: ['Tags'],
        security: [{ bearerAuth: [] }],
        params: { type: 'object', properties: { tagId: { type: 'string' } } },
        body: $ref('createTagSchema'),
        response: { 200: $ref('tagResponseSchema') },
      },
    },
    updateTagHandler
  );

  app.delete<{
    Params: { tagId: string };
  }>(
    '/:tagId',
    {
      onRequest: [authenticate],
      schema: {
        summary: 'Deleta uma tag existente',
        tags: ['Tags'],
        security: [{ bearerAuth: [] }],
        params: { type: 'object', properties: { tagId: { type: 'string' } } },
      },
    },
    deleteTagHandler
  );
}