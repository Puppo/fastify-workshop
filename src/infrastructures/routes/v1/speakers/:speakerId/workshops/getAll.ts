import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import {commons, speakers, workshops} from "../../../../../dto/index";

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.get('/', {
    schema: {
      params: speakers.SpeakerIdParam,
      querystring: commons.Pagination,
      response: {
        200: workshops.WorkshopPaginatedResult
      }
    }
  }, ({
    params: {speakerId},
    query: {limit = 100, offset = 0}
  }) => fastify.workshopService.getWorkshops(speakerId, {limit, offset}));
};

export default plugin;