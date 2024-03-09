import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import db from "../../../../db";
import {speakers} from '../../../../dto/index';

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.get('/', {
    schema: {
      params: speakers.SpeakerIdParam,
      response: {
        200: speakers.SpeakerDTO
      }
    }
  },(request) => {
    const {speakerId} = request.params;
    const speaker = db.speakers
      .find((speaker) => speaker.id === speakerId);
    if (!speaker)
      throw fastify.httpErrors.notFound();

    return speaker;
  });
};

export default plugin;