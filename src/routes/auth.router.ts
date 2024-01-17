import { Router } from 'express'
import { validate } from '../utils/validate'
import { signupSchema } from '../validators/auth.validator'
import * as AuthController from '../controller/auth.controller'

const router = Router()

router.post(`/signup`, validate(signupSchema), AuthController.registerUser)

export default router
