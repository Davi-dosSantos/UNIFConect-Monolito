import { FastifyInstance } from 'fastify';
import {
  createOfferHandler,
  deleteOfferHandler,
  getOfferByIdHandler,
  getOffersHandler,
  updateOfferHandler,
} from '../controllers/offer.controller';
import { $ref } from '../schemas/offer.schema';
import { authenticate } from '../lib/auth.hook';

export async function offerRoutes(app: FastifyInstance) {
  app.post<{
    Body: { title: string; description: string; tagIds: string[] };
  }>(
    '/',
    {
      onRequest: [authenticate],
      schema: {
        summary: 'Cria uma nova oferta de ajuda',
        tags: ['Ofertas'],
        security: [{ bearerAuth: [] }],
        body: $ref('createOfferSchema'),
        response: { 201: $ref('offerResponseSchema') },
      },
    },
    createOfferHandler
  );

  app.get(
    '/',
    {
      schema: {
        summary: 'Lista todas as ofertas disponíveis',
        tags: ['Ofertas'],
        response: { 200: $ref('offersResponseSchema') },
      },
    },
    getOffersHandler
  );

  app.get(
    '/:offerId',
    {
      schema: {
        summary: 'Busca uma oferta específica pelo ID',
        tags: ['Ofertas'],
        params: { type: 'object', properties: { offerId: { type: 'string' } } },
        response: { 200: $ref('offerResponseSchema') },
      },
    },
    getOfferByIdHandler
  );

  app.put<{
    Params: { offerId: string };
    Body: { title: string; description: string; tagIds: string[] };
  }>(
    '/:offerId',
    {
      onRequest: [authenticate],
      schema: {
        summary: 'Atualiza uma oferta existente',
        tags: ['Ofertas'],
        security: [{ bearerAuth: [] }],
        params: { type: 'object', properties: { offerId: { type: 'string' } } },
        body: $ref('createOfferSchema'),
        response: { 200: $ref('offerResponseSchema') },
      },
    },
    updateOfferHandler
  );

  app.delete<{
    Params: { offerId: string };
  }>(
    '/:offerId',
    {
      onRequest: [authenticate],
      schema: {
        summary: 'Deleta uma oferta existente',
        tags: ['Ofertas'],
        security: [{ bearerAuth: [] }],
        params: { type: 'object', properties: { offerId: { type: 'string' } } },
      },
    },
    deleteOfferHandler
  );
}