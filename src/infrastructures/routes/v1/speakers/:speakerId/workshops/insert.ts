import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox';
import {speakers, workshops} from "../../../../../dto/index";

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.post('/', {
    schema: {
      params: speakers.SpeakerIdParam,
      body: workshops.WorkshopInsertBody,
      response: {
        201: workshops.WorkshopDTO
      }
    }
  }, async (request, response) => {
    const newWorkshop = await fastify.workshopService.createWorkshop(request.params.speakerId, request.body);
    response.status(201);
    return newWorkshop;
  });
};

export default plugin;