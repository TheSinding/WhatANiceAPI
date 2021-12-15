import { FastifyInstance, FastifyRequest } from 'fastify';
import { ObjectId } from 'mongodb';
import { COLLECTION_NAME } from '.';
import { SenteceBody, Sentence } from './types';

type PutRequest = FastifyRequest<{
    Body: SenteceBody;
    Params: Pick<Sentence, 'id'>;
}>;

export async function updateHandler(
    this: FastifyInstance,
    request: PutRequest
) {
    const collection = this.mongo.db!.collection(COLLECTION_NAME);
    const { body } = request;

    await collection.updateOne(
        { _id: new ObjectId(request.params.id) },
        { $set: request.body }
    );
    return await collection.findOne({ _id: new ObjectId(request.params.id) });
}
