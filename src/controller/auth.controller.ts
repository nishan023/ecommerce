import { Request, Response, NextFunction } from 'express'
import * as Authservice from '../services/auth.service'
import { loginBodySchema, signupBodySchema } from '../validators/auth.validator'

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const createdUser = await Authservice.signup(
            signupBodySchema.parse(req.body)
        )
        const response = {
            message: 'User registered successfully',
            user: createdUser,
        }

        res.json(response)
    } catch (err) {
        next(err)
    }
}

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = loginBodySchema.parse(req.body)

        const { accessToken, refreshToken } = await Authservice.login(
            email,
            password
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/auth/refresh',
        }).json({ accessToken })
    } catch (error) {
        next(error)
    }
}

export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { refreshToken } = req.cookies
    try {
        const token = await Authservice.refresh(refreshToken)
        res.json({ accessToken: token })
    } catch (error) {
        next(error)
    }
}
