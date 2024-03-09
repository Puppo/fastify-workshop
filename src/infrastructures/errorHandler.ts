import {FastifyInstance, FastifyRequest} from "fastify";
import {hostname} from "node:os";
import {NotFoundError} from "../applications/errors/NotFoundError";


export const errorHandler: FastifyInstance['errorHandler'] = (error, request, reply) => {
  switch (error.name) {
    case NotFoundError.name:
      reply.code(request.method === 'DELETE' ? 204 : 404);
      break;
    default:
      reply.code(error.statusCode ?? 500);
      break
  }

  if (reply.statusCode === 500) {
    const ref = getErrorRef(request);
    request.log.error({
      method: request.method,
      ref,
      error
    });
    error.message = `Unknown error, for more information please contact the administrator with the following reference: ${ref}`;
  } else {
    request.log.debug({
      message: error.message,
    });
  }

  reply.send({
    message: error.message
  });
}

const getErrorRef = (req: FastifyRequest) =>
  `${hostname()}/${req.id.replace('req-', '')}`.toUpperCase();