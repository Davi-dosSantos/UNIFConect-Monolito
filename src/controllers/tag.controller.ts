import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';
import { CreateTagInput } from '../schemas/tag.schema';

export async function createTagHandler(
  request: FastifyRequest<{ Body: CreateTagInput }>,
  reply: FastifyReply
) {
  try {
    const tag = await prisma.tag.create({
      data: request.body,
    });
    return reply.status(201).send(tag);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
  }
}

export async function getTagsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });
    return tags;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
  }
}

export async function updateTagHandler(
  request: FastifyRequest<{ Params: { tagId: string }; Body: CreateTagInput }>,
  reply: FastifyReply
) {
  try {
    const { tagId } = request.params;
    const tag = await prisma.tag.update({
      where: { id: tagId },
      data: request.body,
    });
    return tag;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro ao atualizar a tag.' });
  }
}

export async function deleteTagHandler(
  request: FastifyRequest<{ Params: { tagId: string } }>,
  reply: FastifyReply
) {
  try {
    const { tagId } = request.params;
    await prisma.tag.delete({
      where: { id: tagId },
    });
    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro ao deletar a tag.' });
  }
}