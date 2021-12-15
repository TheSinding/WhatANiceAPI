import { Static } from '@sinclair/typebox';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { COLLECTION_NAME } from '.';
import { SentencesSearchQuerySchema } from './types';

type Request = FastifyRequest<{
    Params: Static<typeof SentencesSearchQuerySchema>;
}>;

export async function listHandler(this: FastifyInstance, request: Request) {
    const collection = this.mongo.db!.collection(COLLECTION_NAME);
    const data = await collection.find({}).toArray();
    if (!data.length) throw new Error('No sentences found');
    return data;
}
