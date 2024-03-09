import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import {commons, speakers} from '../../../dto/index';

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.get('/', {
    schema: {
      querystring: commons.Pagination,
      response: {
        200: speakers.SpeakerPaginatedResult
      }
    }
  }, ({query: {limit = 100, offset = 0}}) => fastify.speakerService.getSpeakers({
      limit,
      offset
    })
  );
};

export default plugin;