import Fastify, { FastifyInstance, } from 'fastify'

const server: FastifyInstance = Fastify({
  logger: true
})

server.options('/*', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', request.headers.origin);
  reply.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  return {};
});

server.get('/ping', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', request.headers.origin);
  reply.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

  return {
    message: 'pong'
  }
});

const start = async () => {
  try {
    await server.listen(process.env.PORT || 5500)

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

    console.log('server listening on port ' + port)

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

process.on('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await server.close();
  process.exit(0);
});

start();