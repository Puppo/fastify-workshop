import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import db from "../../../db";
import {commons, speakers} from '../../../dto/index';

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.get('/', {
    schema: {
      querystring: commons.Pagination,
      response: {
        200: speakers.SpeakerPaginatedResult
      }
    }
  }, (request) => {
    const {limit, offset} = request.query;
    const data = db.speakers.slice(offset, offset! + limit!);
    return {
      count: db.speakers.length,
      data
    };
  });
};

export default plugin;