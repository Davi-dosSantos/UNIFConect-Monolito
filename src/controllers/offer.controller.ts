import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import { CreateOfferInput } from "../schemas/offer.schema";

const offerWithSubscriptionCount = {
  include: {
    offerer: {
      select: { id: true, name: true },
    },
    tags: true,
    _count: {
      select: { subscriptions: true },
    },
  },
};

const offerInclude = {
  offerer: {
    select: { id: true, name: true },
  },
  tags: true,
  _count: {
    select: { subscriptions: true },
  },
};

export async function createOfferHandler(
  request: FastifyRequest<{ Body: CreateOfferInput }>,
  reply: FastifyReply
) {
  try {
    const { id: userId } = request.user as { id: string };
    const { title, description, slots, tagIds } = request.body;
    const offer = await prisma.offer.create({
      data: {
        title,
        description,
        slots,
        offererId: userId,
        tags: { connect: tagIds.map((id) => ({ id })) },
      },
      include: offerInclude,
    });
    return reply.status(201).send(offer);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao criar oferta." });
  }
}

export async function getOffersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const offers = await prisma.offer.findMany({
      include: offerInclude,
      orderBy: { createdAt: "desc" },
    });
    return offers;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao buscar ofertas." });
  }
}

export async function getOfferByIdHandler(
  request: FastifyRequest<{ Params: { offerId: string } }>,
  reply: FastifyReply
) {
  try {
    const { offerId } = request.params;
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        offerer: { select: { id: true, name: true } },
        tags: true,
      },
    });

    if (!offer) {
      return reply.status(404).send({ message: "Oferta não encontrada." });
    }

    return offer;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao buscar a oferta." });
  }
}

export async function getOffersByUserHandler(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  try {
    const { userId } = request.params;
    const offers = await prisma.offer.findMany({
      where: {
        offererId: userId,
      },
      include: {
        offerer: {
          select: { id: true, name: true },
        },
        tags: true,

        _count: {
          select: { subscriptions: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return offers;
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ message: "Erro ao buscar ofertas do usuário." });
  }
}

export async function updateOfferHandler(
  request: FastifyRequest<{
    Params: { offerId: string };
    Body: CreateOfferInput;
  }>,
  reply: FastifyReply
) {
  try {
    const { id: userId } = request.user as { id: string };
    const { offerId } = request.params;
    const { title, description, tagIds } = request.body;

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      return reply.status(404).send({ message: "Oferta não encontrada." });
    }

    if (offer.offererId !== userId) {
      return reply
        .status(403)
        .send({ message: "Você não tem permissão para editar esta oferta." });
    }

    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        title,
        description,
        tags: {
          set: tagIds.map((id) => ({ id })),
        },
      },
      include: {
        offerer: { select: { id: true, name: true } },
        tags: true,
      },
    });

    return updatedOffer;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao atualizar oferta." });
  }
}

export async function deleteOfferHandler(
  request: FastifyRequest<{ Params: { offerId: string } }>,
  reply: FastifyReply
) {
  try {
    const { id: userId } = request.user as { id: string };
    const { offerId } = request.params;

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      return reply.status(404).send({ message: "Oferta não encontrada." });
    }

    if (offer.offererId !== userId) {
      return reply
        .status(403)
        .send({ message: "Você não tem permissão para deletar esta oferta." });
    }

    await prisma.offer.delete({
      where: { id: offerId },
    });

    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao deletar oferta." });
  }
}
