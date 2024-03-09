import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import db from "../../../../../../db";
import {workshops} from "../../../../../../dto/index";

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.delete('/', {
    schema: {
      params: workshops.WorkshopIdParam,
      response: {
        200: workshops.WorkshopDTO
      }
    }
  }, (request) => {
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