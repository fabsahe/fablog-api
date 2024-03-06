/* eslint-disable no-unused-vars */
import consola from 'consola'
import postService from '../services/post.service.js'

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postService.getAllPosts()
    res.send({ status: 'OK', data: allPosts })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewPost = async (req, res, next) => {
  const { body } = req

  const randomIndex = Math.floor(Math.random() * 1035)
  const newPost = { ...body, img: `https://picsum.photos/id/${randomIndex}/200` }

  try {
    const createdPost = await postService.createNewPost(newPost)
    res.status(201).send({ status: 'OK', data: createdPost })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export default { getAllPosts, createNewPost }
