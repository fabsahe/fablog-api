import { pool } from '../db.js'

const getAllUsers = async () => {
  const query = 'SELECT u.id, u.name, u.email, u.role_id, r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id'
  const [allUsers] = await pool.query(query)
  return allUsers
}

const getOneUser = async (userId) => {
  const query = 'SELECT u.id, u.name, u.email, u.role_id, r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = ?'
  const [user] = await pool.query(query, [userId])
  return user
}

const getEditorRole = async () => {
  const query = 'SELECT id FROM roles WHERE name = \'editor\''
  const [role] = await pool.query(query)
  return role && role.length > 0 ? role[0] : null
}

const createNewUser = async (user) => {
  const { name, email, password, roleId } = user
  const query = `
    INSERT INTO users (name, email, password, role_id)
    VALUES (?, ?, ?, ?)
  `
  const [result] = await pool.query(query, [name, email, password, roleId])
  return result
}

export default {
  getAllUsers,
  getOneUser,
  getEditorRole,
  createNewUser
}
