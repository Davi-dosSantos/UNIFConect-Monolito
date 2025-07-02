import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';

export async function subscribeToOfferHandler(
  request: FastifyRequest<{ Params: { offerId: string } }>,
  reply: FastifyReply
) {
  try {
    const { id: userId } = request.user as { id: string };
    const { offerId } = request.params;

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: { _count: { select: { subscriptions: true } } },
    });

    if (!offer) {
      return reply.status(404).send({ message: 'Oferta não encontrada.' });
    }

    if (offer.offererId === userId) {
      return reply.status(400).send({ message: 'Você não pode se inscrever na sua própria oferta.' });
    }

    if (offer._count.subscriptions >= offer.slots) {
      return reply.status(400).send({ message: 'Não há mais vagas disponíveis para esta oferta.' });
    }

    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId_offerId: { userId, offerId } },
    });

    if (existingSubscription) {
      return reply.status(409).send({ message: 'Você já está inscrito nesta oferta.' });
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        offerId,
      },
    });

    return reply.status(201).send(subscription);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro ao realizar inscrição.' });
  }
}

export async function unsubscribeFromOfferHandler(
  request: FastifyRequest<{ Params: { offerId: string } }>,
  reply: FastifyReply
) {
    try {
        const { id: userId } = request.user as { id: string };
        const { offerId } = request.params;

        await prisma.subscription.delete({
            where: {
                userId_offerId: { userId, offerId }
            }
        });

        return reply.status(204).send();
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Erro ao cancelar inscrição.' });
    }
}