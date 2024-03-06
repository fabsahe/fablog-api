import { pool } from '../db.js'

const getAllPosts = async () => {
  const query = 'SELECT p.*, u.name as author_name FROM posts p JOIN users u ON p.author_id = u.id'
  const [allForms] = await pool.query(query)
  return allForms
}

const createNewPost = async (post) => {
  const { title, author, date, content, img } = post
  const query = `
    INSERT INTO posts (title, author_id, publication_date, content, img_url)
    VALUES (?, ?, ?, ?, ?)
  `
  const [result] = await pool.query(query, [title, author, date, content, img])
  return result
}

export default { getAllPosts, createNewPost }
