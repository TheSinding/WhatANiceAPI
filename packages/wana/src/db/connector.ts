import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from 'fastify-mongodb'
import { FastifyInstance } from 'fastify'


async function connection(fastify: FastifyInstance) {
    fastify.register(fastifyMongo, {
        url: `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@wana-db.1elg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    })
}

export const dbConnector = fastifyPlugin(connection)