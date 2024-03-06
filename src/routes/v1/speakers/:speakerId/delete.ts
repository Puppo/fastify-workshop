import {FastifyPluginAsync} from "fastify";
import db from "../../../../db";
import type {speakers} from '../../../../dto/index';

const plugin: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.delete<{
    Params: speakers.SpeakerIdParam,
    Reply: speakers.SpeakerDTO
  }>('/', (request) => {
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