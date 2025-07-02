import { FastifyInstance } from 'fastify';
import { subscribeToOfferHandler, unsubscribeFromOfferHandler } from '../controllers/subscription.controller';
import { authenticate } from '../lib/auth.hook';

export async function subscriptionRoutes(app: FastifyInstance) {
  app.post<{
    Params: { offerId: string };
  }>(
    '/offers/:offerId/subscribe',
    {
      onRequest: [authenticate],
      schema: {
        summary: 'Inscreve o usuário logado em uma oferta',
        tags: ['Inscrições'],
        security: [{ bearerAuth: [] }],
        params: { type: 'object', properties: { offerId: { type: 'string' } } },
      },
    },
    subscribeToOfferHandler
  );

  app.delete<{
    Params: { offerId: string };
  }>(
    '/offers/:offerId/subscribe',
    {
      onRequest: [authenticate],
      schema: {
        summary: 'Cancela a inscrição do usuário logado em uma oferta',
        tags: ['Inscrições'],
        security: [{ bearerAuth: [] }],
        params: { type: 'object', properties: { offerId: { type: 'string' } } },
      },
    },
    unsubscribeFromOfferHandler
  );
}