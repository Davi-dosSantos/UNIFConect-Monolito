import fastify from 'fastify';
import fjwt from '@fastify/jwt';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { authSchemas } from './schemas/auth.schema';
import { userSchemas } from './schemas/user.schema';
import { tagSchemas } from './schemas/tag.schema';
import { offerSchemas } from './schemas/offer.schema';

import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { tagRoutes } from './routes/tag.routes';
import { offerRoutes } from './routes/offer.routes';

const app = fastify({
  logger: true,
});

async function start() {
  const schemas = [
    ...authSchemas,
    ...userSchemas,
    ...tagSchemas,
    ...offerSchemas,
  ];

  for (const schema of schemas) {
    app.addSchema(schema);
  }

  app.register(cors, {
    origin: '*',
  });

  app.register(fjwt, {
    secret: process.env.JWT_SECRET as string,
  });

  app.register(swagger, {
    openapi: {
      info: {
        title: 'UNIFConect API',
        description: 'API unificada para o projeto UNIFConect.',
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

  app.register(authRoutes, { prefix: '/auth' });
  app.register(userRoutes, { prefix: '/users' });
  app.register(tagRoutes, { prefix: '/tags' });
  app.register(offerRoutes, { prefix: '/offers' });

  try {
    await app.ready();
    app.swagger();

    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`🚀 Servidor UNIFConect rodando em http://localhost:3000`);
    console.log(`📚 Documentação disponível em http://localhost:3000/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();