import { findAllUsers } from '../models/userModel.js'

export const getUsers = async (req, reply) => {
  try {
    const db = req.server.db
    const { data, total, perPage, page } = await findAllUsers(db, { req: req.query })

    return reply.send({
      status: true,
      data,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage)
      }
    })
  } catch (err) {
    return reply.status(500).send({ status: false, message: 'Internal Server Error' })
  }
}