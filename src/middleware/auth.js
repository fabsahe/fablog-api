import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

const { verify: jwtVerify } = jsonwebtoken

export default async (req, res, next) => {
  const authorization = req.headers.authorization
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  try {
    const decodedToken = jwtVerify(token, JWT_SECRET)

    if (!token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Token inválido o inexistente'
      })
    }

    const { id: userId, role } = decodedToken
    req.userId = userId
    req.isAdmin = role === 'admin'

    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido o inexistente'
    })
  }
}
