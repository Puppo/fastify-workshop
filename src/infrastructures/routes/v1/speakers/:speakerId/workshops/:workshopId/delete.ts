import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import {workshops} from "../../../../../../dto/index";

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.delete('/', {
    schema: {
      params: workshops.WorkshopIdParam,
      response: {
        200: workshops.WorkshopDTO
      }
    }
  }, ({
    params: {
      speakerId,
      workshopId
    }
  }) => fastify.workshopService.deleteWorkshop(speakerId, workshopId));
};

export default plugin;