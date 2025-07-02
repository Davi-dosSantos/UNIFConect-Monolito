import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const offerInput = {
  title: z.string(),
  description: z.string(),
  tagIds: z.array(z.string().uuid()),
};

const createOfferSchema = z.object({
  ...offerInput,
});

const offerResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
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
});

const offersResponseSchema = z.array(offerResponseSchema);

export const { schemas: offerSchemas, $ref } = buildJsonSchemas({
  createOfferSchema,
  offerResponseSchema,
  offersResponseSchema,
}, { $id: 'OfferSchema' });

export type CreateOfferInput = z.infer<typeof createOfferSchema>;