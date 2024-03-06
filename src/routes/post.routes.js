import { Router } from 'express'
import postController from '../controllers/post.controller.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/', postController.getAllPosts)
router.post('/', auth, postController.createNewPost)

export default router
