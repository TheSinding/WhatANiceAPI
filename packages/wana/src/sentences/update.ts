import { FastifyInstance, FastifyRequest } from 'fastify';
import { ObjectId } from 'mongodb';
import { COLLECTION_NAME } from '.';
import { Sentence, SentenceUpdateBody } from './types';

type PutRequest = FastifyRequest<{
    Body: Partial<SentenceUpdateBody>;
    Params: Pick<Sentence, '_id'>;
}>;

export async function updateHandler(
    this: FastifyInstance,
    request: PutRequest
) {
    const collection = this.mongo.db!.collection(COLLECTION_NAME);
    await collection.updateOne(
        { _id: new ObjectId(request.params._id) },
        { $set: { ...request.body, updated_at: Date.now() } }
    );
    return await collection.findOne({ _id: new ObjectId(request.params._id) });
}
