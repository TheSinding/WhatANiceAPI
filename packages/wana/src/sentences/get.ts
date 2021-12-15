import { FastifyRequest } from "fastify";
import { Collection, Document, ObjectId } from "mongodb";
import { NotFoundError } from "../errors/NotFoundError";
import { Sentence } from "./types";

type GetSingleRequest = FastifyRequest<{ Params: Pick<Sentence, "id"> }>;

export const getHandler =
  (collection: Collection<Document>) => async (request: GetSingleRequest) => {
    const data = await collection.findOne({
      _id: new ObjectId(request.params.id),
    });
    if (!data) return new NotFoundError();
    return data;
  };
