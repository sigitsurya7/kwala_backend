import { findAllUsers, umDeleteUsers, umFindById, umInsertUsers, umUpdateUsers } from '../models/userModel.js'
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid'

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

export const findById = async (req, reply) => {
  try {
    const db = req.server.db
    const { id } = req.params
    const data = await umFindById(db, { req: id })

    return reply.send({
        status: true,
        data
    })

  } catch (error) {
    return reply.status(500).send({ status: false, message: 'Internal Server Error' })
  }
}

export const updateUsers = async (req, reply) => {
  try {
    const db = req.server.db
    const { id } = req.params
    const data = req.body
    if(data.password){
      const hash = bcrypt.hashSync(data.password, 10);
      data.password = hash
    }
    const response = await umUpdateUsers(db, { id: id, data: data })

    return reply.send({
        status: true,
        message: 'Data Berhasil dirubah'
    })
  } catch (error) {
    return reply.status(500).send({ status: false, message: 'Internal Server Error' })
  }
}

export const insertUsers = async (req, reply) => {
  try {
    const db = req.server.db
    const data = req.body
    if(data.password){
      const hash = bcrypt.hashSync(data.password, 10);
      data.password = hash
    }

    data.uid = uuidv4()

    const response = await umInsertUsers(db, { data })

    return reply.send({
        status: true,
        message: 'Data Berhasil disimpan'
    })
  } catch (error) {
    return reply.status(500).send({ status: false, message: error.message })
  }
}

export const deleteUsers = async (req, reply) => {
  try {
    const db = req.server.db
    const { id } = req.params
    const response = await umDeleteUsers(db, { id: id })

    return reply.send({
      status: true,
      message: 'Data Berhasil dihapus'
    })
  } catch (error) {
    return reply.status(500).send({ status: false, message: error.message })
  }
}