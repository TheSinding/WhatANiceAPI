import { FastifyInstance, FastifyRequest } from 'fastify';
import { COLLECTION_NAME } from '.';
import { SenteceBody, Sentence } from './types';

type PostRequest = FastifyRequest<{ Body: SenteceBody }>;

export async function createHandler(
    this: FastifyInstance,
    request: PostRequest
) {
    const collection = this.mongo.db!.collection(COLLECTION_NAME);
    const { body } = request;

    const sentence: Omit<Sentence, '_id'> = {
        created_at: Date.now(),
        tags: [],
        ...body,
        approved: false,
    };

    const { insertedId } = await collection.insertOne(sentence);

    return await collection.findOne({ _id: insertedId });
}
