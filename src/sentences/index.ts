import { FastifyInstance, FastifyRequest } from "fastify";
import { NotFoundError } from "../errors/NotFoundError";
import { Static, Type } from '@sinclair/typebox'
import { ajv } from "../utils/schemaValidator";
import { ObjectId } from "bson";

const PATH = "/sentences"
const COLLECTION_NAME = "sentences"

const SentenceSchema = Type.Object({
	id: Type.String(),
	content: Type.String(),
	timestamp: Type.Integer()
}, { additionalProperties: false })

const SentenceBodySchema = Type.Object({
	content: Type.String()
})

type Sentence = Static<typeof SentenceSchema>
type SenteceBody = Static<typeof SentenceBodySchema>
type PostRequest = FastifyRequest<{ Body: SenteceBody }>
type PutRequest = FastifyRequest<{ Body: SenteceBody, Params: Pick<Sentence, "id"> }>
type GetSingleRequest = FastifyRequest<{ Params: Pick<Sentence, "id"> }>

interface RouteOptions {

}



export async function sentencesRoute(fastify: FastifyInstance, options: RouteOptions) {
	const collection = fastify.mongo?.db?.collection(COLLECTION_NAME)
	if (!collection) throw new Error(`No collection named '${COLLECTION_NAME}'`)

	fastify.get(`${PATH}`, async (request, reply) => {
		const data = await collection.find({}).toArray()
		if (!data.length) throw new Error("No sentences found")
		return data
	})

	fastify.get(`${PATH}/:id`, async (request: GetSingleRequest, reply) => {
		const data = await collection.findOne({ _id: new ObjectId(request.params.id) })
		if (!data) return new NotFoundError()
		return data
	})

	fastify.post(`${PATH}`, async (request: PostRequest, reply) => {
		const { body } = request

		if (!ajv.validate(SentenceBodySchema, body)) throw new Error("Wrong data")
		const { insertedId } = await collection.insertOne(body);

		return (await collection.findOne({ _id: insertedId }))
	})

	fastify.put(`${PATH}/:id`, async (request: PutRequest, reply) => {
		const { body } = request

		if (!ajv.validate(SentenceBodySchema, body)) throw new Error("Wrong data")
		await collection.updateOne({ _id: new ObjectId(request.params.id) }, { $set: request.body })
		return (await collection.findOne({ _id: new ObjectId(request.params.id) }))

	})


}