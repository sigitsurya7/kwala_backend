import { paginateQb } from "../utils/qb.js"

export const findAllUsers = async (db, { req }) => {
    const request = { 
            table: 'm_pasien',
            fields: 'm_pasien.id, m_pasien.nama, m_pasien.no_rm, m_title.singkatan',
            orderBy: 'id DESC',
            where: `m_pasien.nama like '%${req.search}%' or m_pasien.no_rm like '%${req.search}%'`,
            join: [
                { type: 'LEFT', table: 'm_title', on: 'm_title.id = m_pasien.title_id' }
            ],
            req
        }
    const data = await paginateQb(db, request)

    return data
}
  