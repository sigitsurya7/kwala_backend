import { deleteUsers, findById, getUsers, insertUsers, updateUsers } from '../../controllers/userController.js'

export default async function userRoutes(fastify, opts) {
  fastify.addHook('onRequest', fastify.authenticate)
  
  fastify.get('/users', getUsers)
  fastify.get('/users/:id', findById)
  fastify.post('/users', insertUsers)
  fastify.put('/users/:id', updateUsers)
  fastify.delete('/users/:id', deleteUsers)
}