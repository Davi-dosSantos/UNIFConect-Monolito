import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createOfferSchema = z.object({
  title: z.string(),
  description: z.string(),
  slots: z.number().int().min(1, "O número de vagas deve ser no mínimo 1"),
  tagIds: z.array(z.string().uuid()),
});

const offerResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  slots: z.number().int(),
  createdAt: z.date(),
  offerer: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
  tags: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
  ),

  _count: z
    .object({
      subscriptions: z.number().int(),
    })
    .optional(),
});

const offersResponseSchema = z.array(offerResponseSchema);

export const { schemas: offerSchemas, $ref } = buildJsonSchemas(
  {
    createOfferSchema,
    offerResponseSchema,
    offersResponseSchema,
  },
  { $id: "OfferSchema" }
);

export type CreateOfferInput = z.infer<typeof createOfferSchema>;
