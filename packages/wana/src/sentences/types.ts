import { Static, Type } from "@sinclair/typebox";

export const SentenceSchema = Type.Object(
  {
    id: Type.String(),
    content: Type.String(),
    timestamp: Type.Integer(),
  },
  { additionalProperties: false }
);

export const SentenceBodySchema = Type.Object({
  content: Type.String(),
});

export type Sentence = Static<typeof SentenceSchema>;
export type SenteceBody = Static<typeof SentenceBodySchema>;
