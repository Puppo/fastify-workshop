import {FastifyPluginAsync} from "fastify";
import db from "../../../db";
import type {commons, speakers} from '../../../dto/index';

const plugin: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Querystring: commons.Pagination,
    Reply: speakers.SpeakerPaginatedResult
  }>('/', (request) => {
    const {limit = 100, offset = 0} = request.query;
    const data = db.speakers.slice(offset, offset + limit);
    return {
      count: db.speakers.length,
      data
    };
  });
};

export default plugin;