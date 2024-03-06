import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import indexRoutes from './routes/index.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// routes
app.use('/', indexRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' })
})

export default app
