import fastify from "fastify";
import { dbConnector } from "./db/connector";
import { sentencesRoute } from './sentences'
const app = fastify({ logger: true });



app.get("/hello-world", async (res, req) => {
    req.send({ hello: "world!" });
})
app.register(dbConnector)
app.register(sentencesRoute)

const start = async () => {
    try {
        app.listen(3030)
    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
}
start();