import { Static, Type } from '@sinclair/typebox';
import { MetaSchema } from '../common/MetaSchema';

export const SentenceSchema = Type.Object(
    {
        _id: Type.String({
            $id: 'wana:sentences:sentence_id',
            description: 'The ID of the sentence',
            examples: ['a09duf09a'],
        }),
        content: Type.String({
            description: 'The actual sentence',
            examples: ['You look awesome today!'],
        }),
        tags: Type.Array(Type.String(), {
            description: 'Array of tags, describing the sentence',
            examples: ['love', 'nice', 'business', 'greeting'],
        }),
        created_at: Type.Integer({
            description: 'The timestamp of creation',
        }),
        updated_at: Type.Optional(
            Type.Integer({
                description: 'The timestamp of an update',
            })
        ),
        approved: Type.Boolean({
            description: 'Whether or not the sentences has been moderated',
            default: false,
        }),
    },
    {
        additionalProperties: false,
        description: 'Sentence defintion schema',
        $id: 'wana:sentences',
    }
);

export const SentenceBodySchema = Type.Object(
    {
        content: SentenceSchema.properties.content,
        tags: Type.Optional(SentenceSchema.properties.tags),
    },
    {
        $id: 'wana:sentence:create#body',
        additionalProperties: false,
        description: 'Create body schema for sentences',
    }
);

export const SentenceUpdateSchema = Type.Partial(SentenceBodySchema, {
    $id: 'wana:sentence:update#body',
    additionalProperties: false,
    description: 'Update body for a sentence',
});

export const SentencesSearchQuerySchema = Type.Object(
    {
        skip: Type.Optional(
            Type.Number({
                description: 'The amount of objects to skip',
                minimum: 0,
                default: 0,
                examples: [1, 2, 3, 10],
            })
        ),
        page_size: Type.Optional(
            Type.Number({
                description: 'The size of the page',
                minimum: 1,
                maximum: 200,
                default: 10,
                examples: [10, 20, 100, 200],
            })
        ),
        search_tags: Type.Optional(
            Type.Array(Type.String({ description: 'Tag name' }), {
                description: 'List of tags to use for searching for sentences',
                examples: ['weather', 'love', 'nice'],
            })
        ),
        search_term: Type.Optional(
            Type.String({
                description: 'A fuzzy search term',
                examples: [
                    'You are',
                    'i love',
                    'what is that?!',
                    'this is very fuzzy',
                ],
            })
        ),
    },
    {
        additionalProperties: false,
        description: 'The search query object for sentences',
    }
);

export const SentencesGetSchema = Type.Object({
    id: Type.String({ description: 'Id of the sentence' }),
});

export const SentencesListResponseSchema = Type.Object({
    data: Type.Array(SentenceSchema, { description: 'The list of sentences' }),
    meta: MetaSchema,
});

export type SentenceSearchQuery = Static<typeof SentencesSearchQuerySchema>;
export type Sentence = Static<typeof SentenceSchema>;
export type SenteceBody = Static<typeof SentenceBodySchema>;
export type SentenceUpdateBody = Static<typeof SentenceUpdateSchema>;
