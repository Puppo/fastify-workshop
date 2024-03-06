import autoLoad from "@fastify/autoload";
import {FastifyPluginAsync} from "fastify";
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const buildServer: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(import('@fastify/sensible'));

  fastify.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
    forceESM: true,
  });
}

export default buildServer;