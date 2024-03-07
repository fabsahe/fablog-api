import { config } from 'dotenv'
config()

const ENV_MODE = process.env.MODE || 'DEV'
console.log('--------------------------')
console.log(process.env.MODE)
console.log('ENV_MODE = ', ENV_MODE)
console.log('--------------------------')

let port = null
let dbHost = null
let dbUser = null
let dbPass = null
let dbName = null
let dbPort = null

if (ENV_MODE === 'DEV') {
  port = process.env.PORT || 3000
  dbHost = process.env.DB_HOST_D || 'localhost'
  dbUser = process.env.DB_USER_D || 'root'
  dbPass = process.env.DB_PASS_D || ''
  dbName = process.env.DB_NAME_D || 'fablog'
  dbPort = process.env.DB_PORT_D || 3306
}

if (ENV_MODE === 'PROD') {
  port = process.env.PORT
  dbHost = process.env.DB_HOST_P
  dbUser = process.env.DB_USER_P
  dbPass = process.env.DB_PASS_P
  dbName = process.env.DB_NAME_P
  dbPort = process.env.DB_PORT_P
}

export const PORT = port
export const DB_HOST = dbHost
export const DB_USER = dbUser
export const DB_PASSWORD = dbPass
export const DB_DATABASE = dbName
export const DB_PORT = dbPort
export const PLAIN_TEXT_PASSWORD = process.env.PLAIN_TEXT_PASSWORD || 'x'
export const JWT_SECRET = process.env.JWT_SECRET || null
