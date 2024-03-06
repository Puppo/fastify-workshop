import {randomUUID} from 'crypto';
import {FastifyPluginAsync} from "fastify";
import db, {Speaker} from "../../../db";
import type {speakers} from '../../../dto/index';

const plugin: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{
    Body: speakers.SpeakerInsertBody,
    Reply: speakers.SpeakerDTO
  }>('/', (request, response) => {
    const speaker: Speaker = {
      id: randomUUID(),
      ...request.body
    };
    db.speakers.push(speaker);
    response.code(201);
    return speaker;
  });
};

export default plugin;