import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { chatCompletionHandler } from './handlers/completions';
import ENV from './env';
import logConfig from './logging';

const options: FastifyServerOptions = {
  logger: logConfig,
  requestIdHeader: 'x-request-id',
};

const fastify: FastifyInstance = Fastify(options);

fastify.post(ENV.COMPLETIONS_PATH, chatCompletionHandler);

fastify.setNotFoundHandler((_, reply) => {
  reply.status(418).type('text/html').send("<h1>418 I'm a teapot.</h1>");
});

const start = async () => {
  try {
    await fastify.listen({ host: ENV.HOST, port: ENV.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
