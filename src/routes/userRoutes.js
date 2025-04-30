import { getUsers } from '../controllers/userController.js'

export default async function userRoutes(fastify, opts) {
  fastify.get('/users', getUsers)
}