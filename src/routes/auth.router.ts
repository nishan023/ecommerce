import { Router } from 'express'
import { validate } from '../utils/validate'
import { loginSchema, signupSchema } from '../validators/auth.validator'
import * as AuthController from '../controller/auth.controller'

const router = Router()

// Route to handle user login
router.post('/login', validate(loginSchema), AuthController.loginUser)

// Route to handle user registration
router.post(`/signup`, validate(signupSchema), AuthController.registerUser)

// Route to refresh an access token
router.post('/refresh', AuthController.refreshToken)

// Route to handle user logout
router.post('/logout', () => {
    console.log(
        'This method should store any session info if stored or remove the cookie from the header.'
    )
})

// Route to handle password recovery/forgot password
router.post('/forgot-password', () => {
    console.log(
        'This method should send an email using SendGrid to the user with a forgot password link.'
    )
})
export default router
