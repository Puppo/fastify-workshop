import {FastifyPluginAsync} from "fastify";
import db from "../../../../db";
import type {speakers} from '../../../../dto/index';

const plugin: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Params: speakers.SpeakerIdParam,
    Reply: speakers.SpeakerDTO
  }>('/', (request) => {
    const {speakerId} = request.params;
    const speaker = db.speakers
      .find((speaker) => speaker.id === speakerId);
    if (!speaker)
      throw fastify.httpErrors.notFound();

    return speaker;
  });
};

export default plugin;