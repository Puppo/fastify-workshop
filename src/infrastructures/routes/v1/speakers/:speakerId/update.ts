import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import {speakers} from '../../../../dto/index';

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.patch('/', {
    schema: {
      params: speakers.SpeakerIdParam,
      body: speakers.SpeakerUpdateBody,
      response: {
        200: speakers.SpeakerDTO
      }
    }
  }, (request) => fastify.speakerService.updateSpeaker(request.params.speakerId, request.body));
};

export default plugin;