import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const updateProfileSchema = z.object({
  bio: z.string().optional(),
  course: z.string().optional(),
  institution: z.string().optional(),
  avatarUrl: z.string().url('URL do avatar inválida').optional(),
});

const profileResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  bio: z.string().nullish(),
  course: z.string().nullish(),
  institution: z.string().nullish(),
  avatarUrl: z.string().nullish(),
});

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  updateProfileSchema,
  profileResponseSchema,
}, { $id: 'UserSchema' });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;