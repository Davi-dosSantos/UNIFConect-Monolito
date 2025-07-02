import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';
import { UpdateProfileInput } from '../schemas/user.schema';

export async function getUserProfileHandler(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  try {
    const { userId } = request.params;
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return reply.status(404).send({ message: 'Perfil não encontrado.' });
    }

    return reply.send(profile);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
  }
}

export async function updateMyProfileHandler(
  request: FastifyRequest<{ Body: UpdateProfileInput }>,
  reply: FastifyReply
) {
  try {
    const { id: userId } = request.user as { id: string };

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: request.body,
      create: {
        userId,
        ...request.body,
      },
    });

    return reply.send(profile);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro ao atualizar o perfil.' });
  }
}