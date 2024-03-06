import bcrypt from 'bcrypt'
import consola from 'consola'
import { pool } from '../db.js'
import { PLAIN_TEXT_PASSWORD } from '../config/config.js'

export const createAdmin = async () => {
  const adminPasswordHash = await bcrypt.hash(PLAIN_TEXT_PASSWORD, 10)
  try {
    const query = `INSERT INTO users (name, email, password, role_id)
    VALUES ('Admin Master', 'admin@fablog.test', ?, 
            (SELECT id FROM roles WHERE name = 'admin'))`
    const [result] = await pool.query(query, [adminPasswordHash])
    consola.success(`Administrador registrado con id: ${result.insertId}`)
  } catch (error) {
    consola.error(error.sqlMessage)
  }
}

createAdmin()
