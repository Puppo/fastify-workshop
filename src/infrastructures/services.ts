import {FastifyPluginAsync} from "fastify";
import fp from "fastify-plugin";
import {SpeakerService} from "../applications/services/SpeakerServices";
import {WorkshopService} from "../applications/services/WorkshopService";
import {SpeakerDao} from "./daos/SpeakerDao";
import {WorkshopDao} from "./daos/WorkshopDao";

declare module 'fastify' {
  interface FastifyInstance {
    speakerService: SpeakerService;
    workshopService: WorkshopService;
  }
}

const register: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(import('@fastify/postgres'), {
    connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
  })

  const speakerDao = new SpeakerDao(fastify.pg);
  const workshopDao = new WorkshopDao(fastify.pg);

  const speakerService = new SpeakerService(speakerDao);
  const workshopService = new WorkshopService(workshopDao, speakerService);

  fastify.decorate('speakerService', speakerService);
  fastify.decorate('workshopService', workshopService);
})

export default register;