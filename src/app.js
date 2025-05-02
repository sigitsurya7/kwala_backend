import Fastify from 'fastify'
import dotenv from 'dotenv'
import dbPlugin from './plugins/dbPlugin.js'
import apiRoutes from './routes/index.js'
import fastifyJwt from '@fastify/jwt'

dotenv.config()

const app = Fastify({ logger: false })
app.register(dbPlugin)
app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    sign: {
        expiresIn: '1h'
    }
})

app.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ status: false, message: 'Unauthorized' })
    }
  })

app.register(apiRoutes, { prefix: '/api' })

export default app