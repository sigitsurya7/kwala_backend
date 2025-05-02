import { authLogin } from '../../controllers/authController.js'

export default async function authRoutes(fastify, opts) {
  fastify.post('/login', authLogin)
}