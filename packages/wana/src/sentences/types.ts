import { Static, Type } from "@sinclair/typebox";

export const SentenceSchema = Type.Pick(
  Type.Object(
    {
      id: Type.String(),
      content: Type.String({
        description: "The actual sentence",
        examples: "You look awesome today!",
      }),
      createdAt: Type.Integer({
        description: "The timestamp of creation",
      }),
      updatedAt: Type.Integer({
        description: "The timestamp of an update",
      }),
      tags: Type.Array(Type.String(), {
        description: "Array of tags, describing the sentence",
        examples: ["love", "nice", "business", "greeting"],
      }),
    },
    { additionalProperties: false }
  ),
  ["id", "content", "createdAt", "tags"]
);

export const SentenceBodySchema = Type.Pick(
  Type.Object({
    content: SentenceSchema.properties.content,
    tags: SentenceSchema.properties.tags,
  }),
  ["content"]
);

export type Sentence = Static<typeof SentenceSchema>;
export type SenteceBody = Static<typeof SentenceBodySchema>;
