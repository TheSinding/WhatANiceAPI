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
    SentenceUpdateSchema,
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
        `${PATH}/:_id`,
        {
            schema: {
                params: Type.Pick(SentenceSchema, ['_id']),
                response: {
                    201: SentenceSchema,
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
        `${PATH}/:_id`,
        {
            schema: {
                body: SentenceUpdateSchema,
                params: Type.Pick(SentenceSchema, ['_id']),
                response: {
                    200: SentenceSchema,
                },
            },
        },
        updateHandler
    );
}
