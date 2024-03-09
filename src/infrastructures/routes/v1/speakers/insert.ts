import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import {speakers} from '../../../dto/index';

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.post('/', {
    schema: {
      body: speakers.SpeakerInsertBody,
      response: {
        201: speakers.SpeakerDTO
      }
    }
  }, async (request, response) => {
    const speaker = await fastify.speakerService.createSpeaker(request.body);
    response.status(201);
    return speaker;
  });
};

export default plugin;