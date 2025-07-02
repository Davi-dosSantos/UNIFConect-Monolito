import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import { createWriteStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import { randomUUID } from "crypto";
import type { MultipartFile } from "@fastify/multipart";

interface CreateResourceBody {
  title: MultipartFile;
  description: MultipartFile;
  tagIds: MultipartFile;
}

// Handler para criar um novo recurso
export async function createResourceHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id: userId } = request.user as { id: string };
    const data = await request.file();
    if (!data)
      return reply.status(400).send({ message: "Nenhum arquivo enviado." });

    const fields = data.fields as unknown as CreateResourceBody;
    const title = (await fields.title.toBuffer()).toString();
    const description = (await fields.description.toBuffer()).toString();
    const tagIds = (await fields.tagIds.toBuffer()).toString().split(",");

    const fileExtension = path.extname(data.filename);
    const newFileName = randomUUID().concat(fileExtension);
    const uploadDir = path.join(__dirname, "..", "..", "uploads");
    const uploadPath = path.join(uploadDir, newFileName);

    await pipeline(data.file, createWriteStream(uploadPath));

    const file = await prisma.file.create({
      data: {
        originalName: data.filename,
        storageKey: newFileName,
        path: `/uploads/${newFileName}`,
        mimeType: data.mimetype,
        sizeInBytes: data.file.bytesRead,
        uploaderId: userId,
      },
    });

    const resource = await prisma.resource.create({
      data: {
        title: title,
        description: description,
        uploaderId: userId,
        fileId: file.id,
        tags: { connect: tagIds.map((id) => ({ id })) },
      },
      include: {
        file: true,
        uploader: { select: { id: true, name: true } },
        tags: true,
      },
    });

    return reply.status(201).send(resource);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao criar recurso." });
  }
}

// Handler para listar todos os recursos
export async function getResourcesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const resources = await prisma.resource.findMany({
      include: {
        file: true,
        uploader: { select: { id: true, name: true } },
        tags: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return resources;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao buscar recursos." });
  }
}

// --- NOVO HANDLER: ATUALIZAR UM RECURSO ---
export async function updateResourceHandler(
  request: FastifyRequest<{ Params: { resourceId: string }; Body: any }>,
  reply: FastifyReply
) {
  try {
    const { id: userId } = request.user as { id: string };
    const { resourceId } = request.params;
    const { title, description, tagIds } = request.body as {
      title: string;
      description: string;
      tagIds: string[];
    };

    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
    });
    if (!resource)
      return reply.status(404).send({ message: "Recurso não encontrado." });
    if (resource.uploaderId !== userId)
      return reply
        .status(403)
        .send({ message: "Você não tem permissão para editar este recurso." });

    const updatedResource = await prisma.resource.update({
      where: { id: resourceId },
      data: {
        title,
        description,
        tags: { set: tagIds.map((id: string) => ({ id })) },
      },
      include: {
        file: true,
        uploader: { select: { id: true, name: true } },
        tags: true,
      },
    });

    return updatedResource;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao atualizar o recurso." });
  }
}

// --- NOVO HANDLER: DELETAR UM RECURSO ---
export async function deleteResourceHandler(
  request: FastifyRequest<{ Params: { resourceId: string } }>,
  reply: FastifyReply
) {
  try {
    const { id: userId } = request.user as { id: string };
    const { resourceId } = request.params;

    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      include: { file: true },
    });
    if (!resource)
      return reply.status(404).send({ message: "Recurso não encontrado." });
    if (resource.uploaderId !== userId)
      return reply
        .status(403)
        .send({ message: "Você não tem permissão para deletar este recurso." });

    // Deleta o registro do banco de dados (em cascata, o registro do arquivo também será deletado)
    await prisma.resource.delete({ where: { id: resourceId } });
    await prisma.file.delete({ where: { id: resource.fileId } });

    // Deleta o arquivo físico do servidor
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      resource.file.storageKey
    );
    await fs.unlink(filePath);

    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao deletar o recurso." });
  }
}
