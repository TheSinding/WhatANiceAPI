import { FastifyInstance } from 'fastify';
import { createHandler } from './create';
import { updateHandler } from './update';
import { listHandler } from './list';
import { getHandler } from './get';
import {
    SentenceBodySchema,
    SentenceSchema,
    SentencesListResponseSchema,
    SentencesSearchQuerySchema,
} from './types';
import { Type } from '@sinclair/typebox';

const PATH = '/sentences';
export const COLLECTION_NAME = 'sentences';

interface RouteOptions {}

export async function sentencesRoute(
    fastify: FastifyInstance,
    options: RouteOptions
) {
    fastify.get(
        `${PATH}`,
        {
            schema: {
                params: SentencesSearchQuerySchema,
                response: {
                    200: SentencesListResponseSchema,
                },
            },
        },
        listHandler
    );

    fastify.get(
        `${PATH}/:id`,
        {
            schema: {
                params: Type.Pick(SentenceSchema, ['id']),
                response: {
                    201: SentenceSchema,
                    404: 'Not found',
                },
            },
        },
        getHandler
    );

    fastify.post(
        `${PATH}`,
        {
            schema: {
                body: SentenceBodySchema,
                response: {
                    201: SentenceSchema,
                },
            },
        },
        createHandler
    );

    fastify.put(
        `${PATH}/:id`,
        {
            schema: {
                body: SentenceBodySchema,
                params: Type.Pick(SentenceSchema, ['id']),
                response: {
                    200: SentenceSchema,
                    404: 'Not found',
                },
            },
        },
        updateHandler
    );
}
