import { createPool } from 'mysql2/promise'
import { Kysely, MysqlDialect } from 'kysely'
import dotenv from 'dotenv'
dotenv.config()

let db

export function initDB() {
  const dialect = new MysqlDialect({
    pool: createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    }),
  })

  db = new Kysely({ dialect })
  return db
}

export function getDB() {
  if (!db) throw new Error('Database not initialized')
  return db
}
