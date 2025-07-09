import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o processo de seeding...");

  // 1. Limpa as tabelas existentes
  //console.log("Limpando dados antigos...");
  //await prisma.subscription.deleteMany();
  //await prisma.offer.deleteMany();
  //await prisma.tag.deleteMany();
  //await prisma.profile.deleteMany();
  // await prisma.user.deleteMany();

  // 2. Cria os usuários de exemplo
  console.log("Criando usuários...");
  const passwordHash = await argon2.hash("123456");

  //const ana = await prisma.user.create({
  //  data: {
  // email: "ana.aluna@unif.com",
  //  name: "Ana Aluna",
  //    password: passwordHash,
  //},
  //});

  // 3. Cria as Tags (Matérias)
  const tagOutros = await prisma.tag.create({
    data: {
      name: "OUTROS",
      description: "OUTRAS MATERIAS NÃO LISTADAS",
    },
  });

  const tagAlgebraLinear = await prisma.tag.create({
    data: {
      name: "ALGEBRA LINEAR",
      description: "INSTITUTO DE CIÊNCIAS PURAS E APLICADAS",
    },
  });

  const tagAlgoritmosEstruturaDados = await prisma.tag.create({
    data: {
      name: "ALGORITMOS E ESTRUTURA DE DADOS I",
      description: "INSTITUTO DE CIÊNCIAS TECNOLÓGICAS",
    },
  });

  const tagAdministracao = await prisma.tag.create({
    data: {
      name: "ADMINISTRAÇÃO",
      description: "INSTITUTO DE ENGENHARIAS INTEGRADAS",
    },
  });

  const tagBusinessEnglish = await prisma.tag.create({
    data: {
      name: "BUSINESS ENGLISH I",
      description: "INSTITUTO DE ENGENHARIA DE PRODUÇÃO E GESTÃO",
    },
  });

  const tagAnaliseAlgoritmos = await prisma.tag.create({
    data: {
      name: "ANÁLISE DE ALGORITMOS",
      description:
        "INSTITUTO DE ENGENHARIA DE SISTEMAS E TECNOLOGIA DA INFORMAÇÃO",
    },
  });

  const tagAerodinamica = await prisma.tag.create({
    data: {
      name: "AERODINÂMICA E DESEMPENHO DE AERONAVES",
      description: "INSTITUTO DE ENGENHARIA MECÂNICA",
    },
  });

  const tagAstrofisicaExtragalactica = await prisma.tag.create({
    data: {
      name: "ASTROFÍSICA EXTRAGALÁCTICA",
      description: "INSTITUTO DE FÍSICA E QUÍMICA",
    },
  });

  const tagAlgebraLinearAplicacoes = await prisma.tag.create({
    data: {
      name: "ÁLGEBRA LINEAR E APLICAÇÕES",
      description: "INSTITUTO DE MATEMÁTICA E COMPUTACÃO",
    },
  });

  const tagAgrometeorologia = await prisma.tag.create({
    data: {
      name: "AGROMETEOROLOGIA",
      description: "INSTITUTO DE RECURSOS NATURAIS",
    },
  });

  const tagAcionamentosEletricos = await prisma.tag.create({
    data: {
      name: "ACIONAMENTOS ELÉTRICOS",
      description: "INSTITUTO DE SISTEMAS ELÉTRICOS E ENERGIA",
    },
  });

  const tagCalculoNumerico = await prisma.tag.create({
    data: {
      name: "CÁLCULO NUMÉRICO",
      description: "INSTITUTO DE CIÊNCIAS PURAS E APLICADAS",
    },
  });

  const tagRedesIndustriais = await prisma.tag.create({
    data: {
      name: "REDES INDUSTRIAIS",
      description: "INSTITUTO DE CIÊNCIAS TECNOLÓGICAS",
    },
  });

  const tagBiomateriais = await prisma.tag.create({
    data: {
      name: "BIOMATERIAIS",
      description: "INSTITUTO DE ENGENHARIAS INTEGRADAS",
    },
  });

  const tagGestaoDaQualidade = await prisma.tag.create({
    data: {
      name: "GESTÃO DA QUALIDADE",
      description: "INSTITUTO DE ENGENHARIA DE PRODUÇÃO E GESTÃO",
    },
  });

  const tagEletromagnetismoAplicado = await prisma.tag.create({
    data: {
      name: "ELETROMAGNETISMO APLICADO",
      description:
        "INSTITUTO DE ENGENHARIA DE SISTEMAS E TECNOLOGIA DA INFORMAÇÃO",
    },
  });

  const tagBiocombustiveis = await prisma.tag.create({
    data: {
      name: "BIOCOMBUSTÍVEIS",
      description: "INSTITUTO DE ENGENHARIA MECÂNICA",
    },
  });

  const tagBioquimica = await prisma.tag.create({
    data: { name: "BIOQUÍMICA", description: "INSTITUTO DE FÍSICA E QUÍMICA" },
  });

  const tagBancoDeDados = await prisma.tag.create({
    data: {
      name: "BANCO DE DADOS I",
      description: "INSTITUTO DE MATEMÁTICA E COMPUTACÃO",
    },
  });

  const tagBioestatistica = await prisma.tag.create({
    data: {
      name: "BIOESTATÍSTICA",
      description: "INSTITUTO DE RECURSOS NATURAIS",
    },
  });

  const tagEletronicaDePotencia = await prisma.tag.create({
    data: {
      name: "ELETRÔNICA DE POTÊNCIA I",
      description: "INSTITUTO DE SISTEMAS ELÉTRICOS E ENERGIA",
    },
  });

  const tagFundamentosDeMecanica = await prisma.tag.create({
    data: {
      name: "FUNDAMENTOS DE MECÂNICA",
      description: "INSTITUTO DE CIÊNCIAS PURAS E APLICADAS",
    },
  });

  const tagSistemasEmbarcados = await prisma.tag.create({
    data: {
      name: "SISTEMAS EMBARCADOS E DE TEMPO REAL",
      description: "INSTITUTO DE CIÊNCIAS TECNOLÓGICAS",
    },
  });

  const tagEconomiaDosTransportes = await prisma.tag.create({
    data: {
      name: "ECONOMIA DOS TRANSPORTES",
      description: "INSTITUTO DE ENGENHARIAS INTEGRADAS",
    },
  });

  const tagLogisticaCadeiaSuprimentos = await prisma.tag.create({
    data: {
      name: "LOGÍSTICA E GESTÃO DA CADEIA DE SUPRIMENTOS",
      description: "INSTITUTO DE ENGENHARIA DE PRODUÇÃO E GESTÃO",
    },
  });

  const tagInteligenciaArtificial = await prisma.tag.create({
    data: {
      name: "INTELIGÊNCIA ARTIFICIAL",
      description:
        "INSTITUTO DE ENGENHARIA DE SISTEMAS E TECNOLOGIA DA INFORMAÇÃO",
    },
  });

  const tagManutencaoMecanica = await prisma.tag.create({
    data: {
      name: "MANUTENÇÃO MECÂNICA",
      description: "INSTITUTO DE ENGENHARIA MECÂNICA",
    },
  });

  const tagQuimicaAmbiental = await prisma.tag.create({
    data: {
      name: "QUÍMICA AMBIENTAL",
      description: "INSTITUTO DE FÍSICA E QUÍMICA",
    },
  });

  const tagDesenvolvimentoDeJogos = await prisma.tag.create({
    data: {
      name: "DESENVOLVIMENTO DE JOGOS",
      description: "INSTITUTO DE MATEMÁTICA E COMPUTACÃO",
    },
  });

  const tagGeologiaPaleontologia = await prisma.tag.create({
    data: {
      name: "GEOLOGIA PALEONTOLOGIA",
      description: "INSTITUTO DE RECURSOS NATURAIS",
    },
  });

  const tagInstalacoesEletricas = await prisma.tag.create({
    data: {
      name: "INSTALAÇÕES ELÉTRICAS",
      description: "INSTITUTO DE SISTEMAS ELÉTRICOS E ENERGIA",
    },
  });

  // // 4. Cria as Ofertas
  // console.log("Criando ofertas...");
  // const offerCalculo = await prisma.offer.create({
  //   data: {
  //     title: "Monitoria de Cálculo Numérico para P1",
  //     description:
  //       "Vamos resolver juntos as listas de exercícios e tirar todas as dúvidas para a prova.",
  //     slots: 5,
  //     offererId: beto.id,
  //     tags: {
  //       connect: [{ id: tagCalculoNumerico.id }],
  //     },
  //   },
  // });

  // const offerPOO = await prisma.offer.create({
  //   data: {
  //     title: "Grupo de Estudos de Java",
  //     description:
  //       "Foco em polimorfismo e herança para o projeto final da matéria de POO.",
  //     slots: 10,
  //     offererId: ana.id,
  //     tags: {
  //       connect: [{ id: tagBancoDeDados.id }],
  //     },
  //   },
  // });

  // // --- NOVA OFERTA LOTADA ---
  // const offerQuantica = await prisma.offer.create({
  //   data: {
  //     title: "Introdução à Física Quântica",
  //     description:
  //       "Grupo para discutir os postulados e os paradoxos da mecânica quântica.",
  //     slots: 2, // Apenas 2 vagas!
  //     offererId: carla.id,
  //     tags: {
  //       connect: [{ id: tagAstrofisicaExtragalactica.id }],
  //     },
  //   },
  // });
  // // -------------------------

  // // 5. Cria as Inscrições
  // console.log("Criando inscrições...");

  // // Inscrições normais
  // await prisma.subscription.create({
  //   data: { userId: ana.id, offerId: offerCalculo.id },
  // });
  // await prisma.subscription.create({
  //   data: { userId: carla.id, offerId: offerCalculo.id },
  // });
  // await prisma.subscription.create({
  //   data: { userId: beto.id, offerId: offerPOO.id },
  // });

  // // --- INSCRIÇÕES PARA LOTAR A NOVA OFERTA ---
  // // Ana se inscreve na oferta de Física Quântica da Carla
  // await prisma.subscription.create({
  //   data: { userId: ana.id, offerId: offerQuantica.id },
  // });
  // // Beto também se inscreve, lotando a turma
  // await prisma.subscription.create({
  //   data: { userId: beto.id, offerId: offerQuantica.id },
  // });
  // // -----------------------------------------

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
