import { FastifyInstance } from "fastify";
import {
  createResourceHandler,
  getResourcesHandler,
  updateResourceHandler,
  deleteResourceHandler,
} from "../controllers/resource.controller";
import { authenticate } from "../lib/auth.hook";
import { $ref } from "../schemas/resource.schema";

export async function resourceRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      onRequest: [authenticate],
      schema: {
        summary: "Cria um novo recurso com upload de arquivo",
        tags: ["Recursos"],
        consumes: ["multipart/form-data"],
        security: [{ bearerAuth: [] }],
      },
    },
    createResourceHandler
  );

  app.get(
    "/",
    {
      schema: {
        summary: "Lista todos os recursos disponíveis",
        tags: ["Recursos"],
        response: { 200: $ref("resourcesResponseSchema") },
      },
    },
    getResourcesHandler
  );

  app.put<{
    Params: { resourceId: string };
    Body: any;
  }>(
    "/:resourceId",
    {
      onRequest: [authenticate],
      schema: {
        summary: "Atualiza um recurso existente (sem alterar o arquivo)",
        tags: ["Recursos"],
        security: [{ bearerAuth: [] }],
        params: {
          type: "object",
          properties: { resourceId: { type: "string" } },
        },
        body: $ref("updateResourceSchema"),
        response: { 200: $ref("resourceResponseSchema") },
      },
    },
    updateResourceHandler
  );

  app.delete<{
    Params: { resourceId: string };
  }>(
    "/:resourceId",
    {
      onRequest: [authenticate],
      schema: {
        summary: "Deleta um recurso e seu arquivo associado",
        tags: ["Recursos"],
        security: [{ bearerAuth: [] }],
        params: {
          type: "object",
          properties: { resourceId: { type: "string" } },
        },
      },
    },
    deleteResourceHandler
  );
}
