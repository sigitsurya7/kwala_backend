import { buildSelectQuery, insertQb, paginateQb, updateQb } from "../utils/qb.js"

export const findAllUsers = async (db, { req }) => {
    const request = { 
            table: 'm_users',
            fields: 'm_users.id, m_users.uid, m_users.name, m_users.email, m_users.username, m_users.active, m_users.role, m_roles.name as role_name',
            orderBy: 'id DESC',
            where: req.search ? `m_users.deleted = 0 AND ( m_users.name like '%${req.search}%' or m_users.username like '%${req.search}%' or m_users.email like '%${req.search}%')` : 'm_users.deleted = 0',
            join: [
                { type: 'LEFT', table: 'm_roles', on: 'm_roles.id = m_users.role' }
            ],
            req
        }
    const data = await paginateQb(db, request)

    return data
}

export const umFindById = async (db, {req}) => {
    try {
        const dataSql =  buildSelectQuery({
            table: 'm_users',
            where: ` id = ${db.escape(req)}`
        })
        
        const [data] = await db.query(dataSql)
    
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const umUpdateUsers = async (db, {data, id}) => {
    try {
        const request = {
            table: 'm_users',
            data: data,
            where: `id = ${db.escape(id)}`
        }

        const response = await updateQb(db, request)

        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

export const umInsertUsers = async (db, {data}) => {
    try {
        const request = {
            table: 'm_users',
            data: data
        }

        const [response] = await insertQb(db, request)

        return response
    } catch (error) {
        throw new Error(error.sqlMessage)
    }
}

export const umDeleteUsers = async (db, {id}) => {
    try {
        const request = {
            table: 'm_users',
            data: { "deleted": "1" },
            where: `id = ${db.escape(id)}`
        }

        const response = await updateQb(db, request)

        return response
    } catch (error) {
        throw new Error(error.message)
    }
}
  