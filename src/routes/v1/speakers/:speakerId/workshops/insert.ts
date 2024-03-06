import {randomUUID} from 'crypto';
import {FastifyPluginAsync} from "fastify";
import db, {Workshop} from "../../../../../db";
import type {speakers, workshops} from "../../../../../dto/index";

const plugin: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{
    Params: speakers.SpeakerIdParam,
    Body: workshops.WorkshopInsertBody,
    Reply: workshops.WorkshopDTO
  }>('/', (request, response) => {
    const workshop: Workshop = {
      ...request.body,
      id: randomUUID(),
      speakerId: request.params.speakerId,
      startTime: new Date(request.body.startTime),
      endTime: new Date(request.body.endTime)
    };
    db.workshops.push(workshop);
    response.code(201);
    return workshop;
  });
};

export default plugin;