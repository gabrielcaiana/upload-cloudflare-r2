import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors'

import { uploadsRoute } from '@/routes/v1/uploads.ts';

const server: FastifyInstance = Fastify({ logger: true });

server.register(uploadsRoute, { prefix: '/v1'});
server.register(cors, { origin: '*' })

const startServer = async () => {
  try {
    await server.listen(3333)

    console.log(`Server is running 🚀`)
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
