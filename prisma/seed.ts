import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o processo de seeding...");

  // 1. Limpa as tabelas existentes
  console.log("Limpando dados antigos...");
  await prisma.subscription.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // 2. Cria os usuários de exemplo
  console.log("Criando usuários...");
  const passwordHash = await argon2.hash("123456");

  const ana = await prisma.user.create({
    data: {
      email: "ana.aluna@unif.com",
      name: "Ana Aluna",
      password: passwordHash,
    },
  });

  const beto = await prisma.user.create({
    data: {
      email: "beto.tutor@unif.com",
      name: "Beto Tutor",
      password: passwordHash,
    },
  });

  const carla = await prisma.user.create({
    data: {
      email: "carla.caloura@unif.com",
      name: "Carla Caloura",
      password: passwordHash,
    },
  });

  // 3. Cria as Tags (Matérias)
  console.log("Criando tags...");
  const tagCalculo = await prisma.tag.create({
    data: { name: "Cálculo I", description: "Limites, derivadas e integrais" },
  });

  const tagPOO = await prisma.tag.create({
    data: {
      name: "POO",
      description: "Programação Orientada a Objetos com Java",
    },
  });

  const tagFisica = await prisma.tag.create({
    data: { name: "Física II", description: "Eletromagnetismo e Ondas" },
  });

  const tagFisicaQuantica = await prisma.tag.create({
    data: {
      name: "Física Quântica",
      description: "Conceitos da física moderna",
    },
  });

  // 4. Cria as Ofertas
  console.log("Criando ofertas...");
  const offerCalculo = await prisma.offer.create({
    data: {
      title: "Monitoria de Cálculo para P1",
      description:
        "Vamos resolver juntos as listas de exercícios e tirar todas as dúvidas para a prova.",
      slots: 5,
      offererId: beto.id,
      tags: {
        connect: [{ id: tagCalculo.id }],
      },
    },
  });

  const offerPOO = await prisma.offer.create({
    data: {
      title: "Grupo de Estudos de Java",
      description:
        "Foco em polimorfismo e herança para o projeto final da matéria de POO.",
      slots: 10,
      offererId: ana.id,
      tags: {
        connect: [{ id: tagPOO.id }],
      },
    },
  });

  // --- NOVA OFERTA LOTADA ---
  const offerQuantica = await prisma.offer.create({
    data: {
      title: "Introdução à Física Quântica",
      description:
        "Grupo para discutir os postulados e os paradoxos da mecânica quântica.",
      slots: 2, // Apenas 2 vagas!
      offererId: carla.id,
      tags: {
        connect: [{ id: tagFisicaQuantica.id }],
      },
    },
  });
  // -------------------------

  // 5. Cria as Inscrições
  console.log("Criando inscrições...");

  // Inscrições normais
  await prisma.subscription.create({
    data: { userId: ana.id, offerId: offerCalculo.id },
  });
  await prisma.subscription.create({
    data: { userId: carla.id, offerId: offerCalculo.id },
  });
  await prisma.subscription.create({
    data: { userId: beto.id, offerId: offerPOO.id },
  });

  // --- INSCRIÇÕES PARA LOTAR A NOVA OFERTA ---
  // Ana se inscreve na oferta de Física Quântica da Carla
  await prisma.subscription.create({
    data: { userId: ana.id, offerId: offerQuantica.id },
  });
  // Beto também se inscreve, lotando a turma
  await prisma.subscription.create({
    data: { userId: beto.id, offerId: offerQuantica.id },
  });
  // -----------------------------------------

  console.log("Seeding finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro durante o processo de seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
