import fp from 'fastify-plugin'
import fastifyMysql from '@fastify/mysql'
import { Kysely, MysqlDialect } from 'kysely'

export default fp(async function (fastify, opts) {
  await fastify.register(fastifyMysql, {
    promise: true,
    connectionString: `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  })

  fastify.decorate('db', fastify.mysql)
})
