import { Sequelize, Dialect } from "sequelize";

// const isDev = process.env.NODE_ENV === 'development'
const db = process.env.DB_TEST as string
const dbUser = process.env.DB_USER_TEST as string
const dbHost = process.env.DB_HOST_TEST
const dbDriver = process.env.DB_DIALECT_TEST as Dialect
const dbPassword = process.env.DB_PASSWORD_TEST

const sequelizeConnection = new Sequelize(db, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
})

export default sequelizeConnection
