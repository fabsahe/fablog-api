/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import consola from 'consola'
import authService from '../services/auth.service.js'
import { JWT_SECRET } from '../config/config.js'

const { sign: jwtSign } = jsonwebtoken

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await authService.login(email)
    console.log('++++++++++++++++++++++++++++++')
    console.log('USER = ')
    console.log(user)
    console.log('++++++++++++++++++++++++++++++')

    const passwordMatch = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!(user && passwordMatch)) {
      res.status(401).send({
        error: 'Usuario o contraseña incorrectos'
      })
      return
    }
    const userForToken = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    const token = jwtSign(
      userForToken,
      JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 7 }
    )

    res.send({
      status: 'OK',
      data: {
        email: user.email,
        token
      }
    })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export default { login }
