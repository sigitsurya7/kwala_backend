import { getPaginationParams } from "./pagination.js"

function buildJoinClause(build){
    return build.map(join => {
        const joinType = join.type === 'LEFT' ? 'LEFT JOIN' : 'JOIN';
        return `${joinType} ${join.table} ON ${join.on}`;
    }).join('\n')
}

export const buildSelectQuery = ({
    table,
    fields = '*',
    where = '',
    orderBy = '',
    limit,
    join = '',
    offset
  }) => {
    let sql = `SELECT ${fields} FROM ${table}`
  
    if (join) sql += ` ${join}`
    if (where) sql += ` WHERE ${where}`
    if (orderBy) sql += ` ORDER BY ${orderBy}`
    if (limit !== undefined) sql += ` LIMIT ${limit}`
    if (offset !== undefined) sql += ` OFFSET ${offset}`
  
    return sql
}

export const paginateQb = async (db, { table, fields = '*', where = '', join = [], orderBy = '', req }) => {
    const joinsConfigs = buildJoinClause(join)
    // 1. Build data query
    const { offset, perPage, page } = getPaginationParams(req)
    const dataSql = buildSelectQuery({ table, fields, where, orderBy, limit: perPage, offset, join: joinsConfigs })
    const [rows] = await db.query(dataSql)

  
    // 2. Build count query
    const countSql = `SELECT COUNT(*) as total FROM ${table}` + (where ? ` WHERE ${where}` : '')
    const [countRows] = await db.query(countSql)

  
    return {
      data: rows,
      total: countRows[0].total,
      offset,
      perPage,
      page
    }
}

export const insertQb = async (db, { table, data }) => {
    const fields = Object.keys(data).join(', ')
    const placeholders = Object.keys(data).map(() => '?').join(', ')
    const values = Object.values(data)
    const sql = `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`

    const response = await db.query(sql, values)

    return response
}
  
export const updateQb = async (db, { table, data, where }) => {
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ')
    const values = Object.values(data)
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`
    const response = await db.query(sql, values)

    return response
}
  
export const deleteQb = async (db, { table, where }) => {
    const sql = `DELETE FROM ${table} WHERE ${where}`
    const response = await db.query(sql)
    return response
}
  