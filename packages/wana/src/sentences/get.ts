import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Collection, Document, ObjectId } from 'mongodb';
import { COLLECTION_NAME } from '.';
import { NotFoundError } from '../errors/NotFoundError';
import { Sentence } from './types';

export type GetSingleRequest = FastifyRequest<{
    Params: Pick<Sentence, '_id'>;
}>;

export async function getHandler(
    this: FastifyInstance,
    request: GetSingleRequest,
    reply: FastifyReply
): Promise<FastifyReply> {
    const collection = this.mongo.db!.collection(COLLECTION_NAME);
    const data = await collection.findOne({
        _id: new ObjectId(request.params._id),
    });
    if (!data) throw new NotFoundError();
    return reply.send(data);
}
