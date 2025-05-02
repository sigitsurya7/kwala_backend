import { getAuthModel } from "../models/authModel.js"

export const authLogin = async (req, reply) => {
    try {
        const db = req.server.db
        const data = await getAuthModel(db, { req: req.body })

         data.token = req.server.jwt.sign({
            id: data.uid,
            username: data.username
        })

        return reply.send({
            status: true,
            data
        })
    }catch(err){
        return reply.status(500).send({ status: false, message: err.message })
    }
}