import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const tagInput = {
  name: z.string(),
  description: z.string().optional(),
};

const createTagSchema = z.object({
  ...tagInput,
});

const tagResponseSchema = z.object({
  id: z.string().uuid(),
  ...tagInput,
});

const tagsResponseSchema = z.array(tagResponseSchema);

export const { schemas: tagSchemas, $ref } = buildJsonSchemas({
  createTagSchema,
  tagResponseSchema,
  tagsResponseSchema,
}, { $id: 'TagSchema' });

export type CreateTagInput = z.infer<typeof createTagSchema>;