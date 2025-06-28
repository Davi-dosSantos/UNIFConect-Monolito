import fastify from 'fastify';
import fjwt from '@fastify/jwt';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

// Importando os schemas e rotas que já criamos
import { authSchemas } from './schemas/auth.schema';
import { authRoutes } from './routes/auth.routes';

// A instância do Fastify é criada de forma mais simples
const app = fastify({
  logger: true,
});

async function start() {
  // 1. Registramos os schemas gerados pelo buildJsonSchemas
  for (const schema of authSchemas) {
    app.addSchema(schema);
  }

  // 2. Registramos os plugins
  app.register(cors, {
    origin: '*', 
  });

  app.register(fjwt, {
    secret: process.env.JWT_SECRET as string,
  });

  app.register(swagger, {
    openapi: {
      info: {
        title: 'UNIFConect TCC API',
        description: 'API unificada para o projeto de TCC UNIFConect.',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
    },
  });

  app.register(swaggerUi, {
    routePrefix: '/docs',
  });

  // 3. Registramos nossas rotas
  app.register(authRoutes, { prefix: '/auth' });

  try {
    await app.ready();
    app.swagger();

    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`🚀 Servidor rodando em http://localhost:3000`);
    console.log(`📚 Documentação disponível em http://localhost:3000/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();