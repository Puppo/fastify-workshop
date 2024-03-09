import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import db from "../../../../db";
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
  }, (request) => {
    const {speakerId} = request.params;
    const speakerIndex = db.speakers.findIndex((speaker) => speaker.id === speakerId);
    if (speakerIndex === -1)
      throw fastify.httpErrors.notFound();

    const speaker = db.speakers[speakerIndex];
    Object.assign(speaker, request.body, { id: speakerId });
    return speaker;
  });
};

export default plugin;