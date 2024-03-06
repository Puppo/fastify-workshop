import {FastifyPluginAsync} from "fastify";
import db from "../../../../../db";
import type {commons, speakers, workshops} from "../../../../../dto/index";

const plugin: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Params: speakers.SpeakerIdParam,
    Querystring: commons.Pagination,
    Reply: workshops.WorkshopPaginatedResult
  }>('/', (request) => {
    const {limit = 100, offset = 0} = request.query;
    const {speakerId} = request.params;
    const data = db.workshops
      .filter(w => w.speakerId === speakerId)
      .slice(offset, offset + limit);
    return {
      count: db.workshops.length,
      data
    };
  });
};

export default plugin;