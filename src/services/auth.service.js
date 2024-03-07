import consola from 'consola'
import { pool } from '../db.js'

const login = async (email) => {
  try {
    const query = 'SELECT u.*, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = ?'
    const [user] = await pool.query(query, [email])
    return user && user.length > 0 ? user[0] : null
  } catch (error) {
    consola.error(error)
  }
}

export default { login }
