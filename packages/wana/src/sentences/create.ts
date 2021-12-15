import { FastifyInstance, FastifyRequest } from 'fastify';
import { COLLECTION_NAME } from '.';
import { SenteceBody } from './types';

type PostRequest = FastifyRequest<{ Body: SenteceBody }>;

export async function createHandler(
    this: FastifyInstance,
    request: PostRequest
) {
    const collection = this.mongo.db!.collection(COLLECTION_NAME);
    const { body } = request;

    const { insertedId } = await collection.insertOne(body);

    return await collection.findOne({ _id: insertedId });
}
