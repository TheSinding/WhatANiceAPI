import { FastifyRequest } from "fastify";
import { Collection, Document } from "mongodb";
import { ajv } from "../utils/schemaValidator";
import { SenteceBody, SentenceBodySchema } from "./types";

type PostRequest = FastifyRequest<{ Body: SenteceBody }>;

export const createHandler =
  (collection: Collection<Document>) => async (request: PostRequest) => {
    const { body } = request;

    if (!ajv.validate(SentenceBodySchema, body)) throw new Error("Wrong data");
    const { insertedId } = await collection.insertOne(body);

    return await collection.findOne({ _id: insertedId });
  };
