import { FastifyInstance } from "fastify";
import { authenticate } from "../lib/auth.hook";
import {
  getUserProfileHandler,
  updateMyProfileHandler,
  getMySubscriptionsHandler,
} from "../controllers/user.controller";
import { getOffersByUserHandler } from "../controllers/offer.controller";
import { $ref as userRef } from "../schemas/user.schema";
import { $ref as offerRef } from "../schemas/offer.schema";

export async function userRoutes(app: FastifyInstance) {
  // Rota para buscar o perfil de um usuário
  app.get(
    "/:userId/profile",
    {
      schema: {
        summary: "Busca o perfil de um usuário específico",
        tags: ["Usuários"],
        params: {
          type: "object",
          properties: {
            userId: { type: "string", description: "ID do usuário" },
          },
        },
        response: { 200: userRef("profileResponseSchema") },
      },
    },
    getUserProfileHandler
  );

  // Rota para o usuário logado atualizar seu próprio perfil
  app.put<{
    Body: {
      bio?: string;
      course?: string;
      institution?: string;
      avatarUrl?: string;
    };
  }>(
    "/profile",
    {
      onRequest: [authenticate],
      schema: {
        summary: "Cria ou atualiza o perfil do usuário logado",
        tags: ["Usuários"],
        security: [{ bearerAuth: [] }],
        body: userRef("updateProfileSchema"),
        response: { 200: userRef("profileResponseSchema") },
      },
    },
    updateMyProfileHandler
  );

  // Rota para buscar as ofertas criadas por um usuário específico
  app.get(
    "/:userId/offers",
    {
      schema: {
        summary: "Busca as ofertas de um usuário específico",
        tags: ["Usuários", "Ofertas"],
        params: {
          type: "object",
          properties: {
            userId: { type: "string" },
          },
        },
        response: { 200: offerRef("offersResponseSchema") },
      },
    },
    getOffersByUserHandler
  );

  // Rota para o usuário logado buscar suas próprias inscrições
  app.get(
    "/me/subscriptions",
    {
      onRequest: [authenticate],
      schema: {
        summary: "Lista as ofertas em que o usuário logado está inscrito",
        tags: ["Usuários", "Inscrições"],
        security: [{ bearerAuth: [] }],
        response: { 200: offerRef("offersResponseSchema") },
      },
    },
    getMySubscriptionsHandler
  );
}
