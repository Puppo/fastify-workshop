import {FastifyPluginAsyncTypebox} from "@fastify/type-provider-typebox";
import db, {Speaker} from "../../../db";
import {speakers} from '../../../dto/index';

const plugin: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.post('/', {
    schema: {
      body: speakers.SpeakerInsertBody,
      response: {
        201: speakers.SpeakerDTO
      }
    }
  }, (request, response) => {
    const speaker: Speaker = {
      id: Math.max(...db.speakers.map(s => s.id)) + 1,
      ...request.body
    };
    db.speakers.push(speaker);
    response.code(201);
    return speaker;
  });
};

export default plugin;