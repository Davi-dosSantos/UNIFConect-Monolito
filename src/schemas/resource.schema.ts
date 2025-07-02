import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const resourceCore = {
  title: z.string(),
  description: z.string(),
  tagIds: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",") : val),
    z.array(z.string().uuid())
  ),
};

const createResourceSchema = z.object({
  ...resourceCore,
});

const updateResourceSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  tagIds: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",") : val),
    z.array(z.string().uuid()).optional()
  ),
});

const resourceResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  file: z.object({
    id: z.string().uuid(),
    path: z.string(),
    originalName: z.string(),
  }),
  uploader: z.object({
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

const resourcesResponseSchema = z.array(resourceResponseSchema);

export const { schemas: resourceSchemas, $ref } = buildJsonSchemas(
  {
    createResourceSchema,
    updateResourceSchema,
    resourceResponseSchema,
    resourcesResponseSchema,
  },
  { $id: "ResourceSchema" }
);
