import {FastifyPluginAsync} from "fastify";
import db, {Workshop} from "../../../../../../db";
import {speakers, workshops} from "../../../../../../dto/index";

const plugin: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.delete<{
    Params: workshops.WorkshopIdParam & speakers.SpeakerIdParam,
    Reply: Workshop
  }>('/', (request) => {
    const {speakerId, workshopId} = request.params;
    const workshopIndex = db.workshops
      .findIndex((workshop) => workshop.id === workshopId && workshop.speakerId === speakerId);
    if (workshopIndex === -1)
      throw fastify.httpErrors.notFound();

    const workshop = db.workshops[workshopIndex];
    db.workshops.splice(workshopIndex, 1);
    return workshop;
  });
};

export default plugin;