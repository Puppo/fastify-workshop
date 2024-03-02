import fastify from 'fastify';

async function run() {
  const app = fastify({ logger: true });

  app.get('/', () => ({ hello: 'world' }));

  try {
    await app.listen({
      port: 3000,
      host: '0.0.0.0'
    });
  } catch (error) {
    app.log.error(error, 'Error starting server');
    process.exit(1);
  }
}

run();