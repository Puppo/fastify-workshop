import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import db from "../../../../../db";
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
  }, (request) => {
    const {limit, offset} = request.query;
    const {speakerId} = request.params;
    const data = db.workshops
      .filter(w => w.speakerId === speakerId)
      .slice(offset, offset! + limit!);
    return {
      count: db.workshops.length,
      data: data.map(w => ({
        ...w,
        startTime: w.startTime.toISOString(),
        endTime: w.endTime.toISOString()
      }))
    };
  });
};

export default plugin;