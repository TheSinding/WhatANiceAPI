import { Static, Type } from '@sinclair/typebox';

export const MetaSchema = Type.Object({
    total: Type.Number({
        description: 'The total number of returned data',
        examples: [0, 1, 2, 400],
    }),
    skip: Type.Optional(
        Type.Number({
            description: 'The amount skipped ahead',
            examples: [0, 1, 2, 400],
        })
    ),
    page_size: Type.Number({
        description: 'The page size of the data',
        examples: [10, 20, 200],
    }),
});

export type Meta = Static<typeof MetaSchema>;
