import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { env } from 'process';

const fastify: FastifyInstance = Fastify({ logger: true });

fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ hello: 'world' });
});

const startServer = async () => {
  try {
    await fastify.listen(3333);
    console.log('Server is running 🔥');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
