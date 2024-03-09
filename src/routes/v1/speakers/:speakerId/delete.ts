import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import db from "../../../../db";
import {speakers} from '../../../../dto/index';

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.delete('/', {
    schema: {
      params: speakers.SpeakerIdParam,
      response: {
        200: speakers.SpeakerDTO
      }
    }
  }, (request) => {
    const {speakerId} = request.params;
    const speakerIndex = db.speakers
      .findIndex((speaker) => speaker.id === speakerId);
    if (speakerIndex === -1)
      throw fastify.httpErrors.notFound();

    const speaker = db.speakers[speakerIndex];
    db.speakers.splice(speakerIndex, 1);
    return speaker;
  });
};

export default plugin;