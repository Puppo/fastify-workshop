import autoLoad from "@fastify/autoload";
import {FastifyPluginAsync} from "fastify";
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {errorHandler} from './errorHandler';
import servicesModule from './services';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const buildServer: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(servicesModule)

  fastify.setErrorHandler(errorHandler)

  fastify.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
    forceESM: true,
  });
}

export default buildServer;