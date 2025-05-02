import authRoutes from "./pool/authRoutes.js"
import userRoutes from "./pool/userRoutes.js"


export default async function (fastify, opts) {
  fastify.register(userRoutes)
  fastify.register(authRoutes)
}