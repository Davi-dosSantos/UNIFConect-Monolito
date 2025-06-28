import { FastifyRequest, FastifyReply } from 'fastify';
import argon2 from 'argon2';
import { prisma } from '../lib/prisma';
import { CreateUserInput, LoginInput } from '../schemas/auth.schema';

export async function registerUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  try {
    const { email, name, password } = request.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return reply.status(409).send({ message: 'Este email já está em uso.' });
    }

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });

    return reply.status(201).send({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return reply.status(401).send({ message: 'Email ou senha inválidos.' });
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      return reply.status(401).send({ message: 'Email ou senha inválidos.' });
    }

    const payload = { id: user.id, name: user.name };
    const token = await reply.jwtSign(payload);

    return reply.send({ token });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
  }
}