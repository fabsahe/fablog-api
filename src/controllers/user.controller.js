/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt'
import consola from 'consola'
import userService from '../services/user.service.js'

const getAllUsers = async (req, res, next) => {
  const { userId, isAdmin } = req
  try {
    if (isAdmin) {
      const allUsers = await userService.getAllUsers()
      res.send({ status: 'OK', data: allUsers })
    } else {
      const user = await userService.getOneUser(userId)
      res.send({ status: 'OK', data: user })
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getEditorRole = async (req, res, next) => {
  try {
    const editorRole = await userService.getEditorRole()
    res.send({ status: 'OK', data: editorRole })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewUser = async (req, res, next) => {
  const { body } = req

  const passwordHash = await bcrypt.hash(body.password, 10)
  const newUser = {
    name: body.name,
    email: body.email,
    password: passwordHash,
    roleId: body.roleId
  }

  try {
    const createdUser = await userService.createNewUser(newUser)
    res.status(201).send({ status: 'OK', data: createdUser })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export default {
  getAllUsers,
  getEditorRole,
  createNewUser
}
