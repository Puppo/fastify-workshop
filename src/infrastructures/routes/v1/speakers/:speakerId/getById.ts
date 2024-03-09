import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import {speakers} from '../../../../dto/index';

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.get('/', {
    schema: {
      params: speakers.SpeakerIdParam,
      response: {
        200: speakers.SpeakerDTO
      }
    }
  }, (request) => fastify.speakerService.getSpeakerById(request.params.speakerId));
};

export default plugin;