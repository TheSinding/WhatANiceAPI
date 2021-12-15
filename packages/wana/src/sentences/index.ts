import { FastifyInstance } from "fastify";
import { createHandler } from "./create";
import { updateHandler } from "./update";
import { listHandler } from "./list";
import { getHandler } from "./get";

const PATH = "/sentences";
const COLLECTION_NAME = "sentences";

interface RouteOptions {}

export async function sentencesRoute(
  fastify: FastifyInstance,
  options: RouteOptions
) {
  const collection = fastify.mongo?.db?.collection(COLLECTION_NAME);
  if (!collection) throw new Error(`No collection named '${COLLECTION_NAME}'`);

  fastify.get(`${PATH}`, listHandler(collection));

  fastify.get(`${PATH}/:id`, getHandler(collection));

  fastify.post(`${PATH}`, createHandler(collection));

  fastify.put(`${PATH}/:id`, updateHandler(collection));
}
