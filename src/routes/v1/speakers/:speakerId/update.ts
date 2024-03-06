import {FastifyPluginAsync} from "fastify";
import db from "../../../../db";
import type {speakers} from '../../../../dto/index';

const plugin: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.patch<{
    Params: speakers.SpeakerIdParam,
    Body: speakers.SpeakerUpdateBody,
    Reply: speakers.SpeakerDTO
  }>('/', (request) => {
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