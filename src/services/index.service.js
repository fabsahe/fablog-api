import { pool } from '../db.js'

const index = () => {
  const message = 'API by Fabián Salinas Hernández'
  return message
}

const ping = async () => {
  const [result] = await pool.query('SELECT "pong" as result')
  return result[0]
}

export default { index, ping }
