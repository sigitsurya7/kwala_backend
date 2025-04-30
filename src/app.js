import Fastify from 'fastify'
import dotenv from 'dotenv'
import dbPlugin from './plugins/dbPlugin.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = Fastify({ logger: false })
app.register(dbPlugin)
app.register(userRoutes, { prefix: '/api' })

export default app