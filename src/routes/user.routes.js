import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/', auth, userController.getAllUsers)
router.get('/editor', auth, userController.getEditorRole)
router.post('/', auth, userController.createNewUser)

export default router
