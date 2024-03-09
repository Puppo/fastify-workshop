import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox';
import db, {Workshop} from "../../../../../db";
import {speakers, workshops} from "../../../../../dto/index";

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.post('/', {
    schema: {
      params: speakers.SpeakerIdParam,
      body: workshops.WorkshopInsertBody,
      response: {
        201: workshops.WorkshopDTO
      }
    }
  },(request, response) => {
    const workshop: Workshop = {
      ...request.body,
      id: Math.max(...db.workshops.map(w => w.id)) + 1,
      speakerId: request.params.speakerId,
      startTime: new Date(request.body.startTime),
      endTime: new Date(request.body.endTime)
    };
    db.workshops.push(workshop);
    response.code(201);
    return {
      ...workshop,
      startTime: workshop.startTime.toISOString(),
      endTime: workshop.endTime.toISOString()
    };
  });
};

export default plugin;