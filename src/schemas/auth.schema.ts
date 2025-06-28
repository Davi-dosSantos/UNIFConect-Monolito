import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
  name: z.string(),
  email: z.string().email('O email fornecido é inválido'),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

const userResponseSchema = z.object({
  id: z.string().uuid(),
  ...userCore,
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  token: z.string(),
});

// Gera os schemas JSON para o Fastify e a função $ref
export const { schemas: authSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  userResponseSchema,
  loginSchema,
  loginResponseSchema,
}, { $id: 'AuthSchema' });

// Gera os tipos para usarmos no nosso controller
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;