import { Static } from '@sinclair/typebox';
import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    RouteHandler,
} from 'fastify';
import { COLLECTION_NAME } from '.';
import { paginateData } from '../utils/Paginate';
import { SentencesSearchQuerySchema } from './types';

type Request = FastifyRequest<{
    Params: Static<typeof SentencesSearchQuerySchema>;
}>;

export async function listHandler(
    this: FastifyInstance,
    request: Request,
    reply: FastifyReply
): Promise<FastifyReply> {
    const { page_size, skip: desireSkip } = request.params;
    const collection = this.mongo.db!.collection(COLLECTION_NAME);
    const data = await collection.find({}).toArray();
    if (!data.length) throw new Error('No sentences found');
    const {
        data: paginatedData,
        pageSize,
        skip,
    } = paginateData(data, page_size, desireSkip);

    console.log({ paginatedData, pageSize, skip });

    return reply.send({
        data: paginatedData,
        meta: { total: data.length, skip, page_size: pageSize },
    });
}
