import { FastifyRequest } from "fastify";
import { Collection, Document, ObjectId } from "mongodb";
import { ajv } from "../utils/schemaValidator";
import { SenteceBody, Sentence, SentenceBodySchema } from "./types";

type PutRequest = FastifyRequest<{
  Body: SenteceBody;
  Params: Pick<Sentence, "id">;
}>;

export const updateHandler =
  (collection: Collection<Document>) => async (request: PutRequest) => {
    const { body } = request;

    if (!ajv.validate(SentenceBodySchema, body)) throw new Error("Wrong data");
    await collection.updateOne(
      { _id: new ObjectId(request.params.id) },
      { $set: request.body }
    );
    return await collection.findOne({ _id: new ObjectId(request.params.id) });
  };
