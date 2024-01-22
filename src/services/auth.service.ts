import prisma from '../libs/prisma'
import bcrypt from 'bcryptjs'
import { signupBodySchema } from '../validators/auth.validator'
import { z } from 'zod'
import Boom from '@hapi/boom'
import {
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken,
} from '../utils/token.util'

//Handles user signup/regestration
export const signup = async (user: z.infer<typeof signupBodySchema>) => {
    const { email, password, is_admin } = user
    try {
        // Create a new user in the database
        return await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 10),
                is_admin,
            },
            select: {
                id: true,
                email: true,
                is_admin: true,
                addresses: true,
                phone_number: true,
            },
        })
    } catch (e: any) {
        if (
            e.code === 'P2002' &&
            e.meta?.target &&
            e.meta?.target[0] === 'email'
        ) {
            // Handle conflict when a user with the provided email already exists
            throw Boom.conflict('User with this email already exists')
        } else {
            // Propagate other unexpected errors
            throw e
        }
    }
}

//Handles user login
export async function login(email: string, password: string) {
    // Find the user by email in the database
    const user = await prisma.user.findFirst({ where: { email } })

    if (!user) {
        // Throw bad request if user does not exist
        throw Boom.badRequest('Username or password is incorrect.')
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        // Throw bad request if password is incorrect
        throw Boom.badRequest('Username or password is incorrect.')
    }

    // Generate access and refresh tokens for the authenticated user
    const accessToken = createAccessToken(user.id, user.is_admin)
    const refreshToken = createRefreshToken(user.id, user.is_admin)

    return { accessToken, refreshToken }
}

//Handles token refresh.
export async function refresh(refreshToken: string) {
    try {
        // Verify the refresh token and extract user information
        const decodedToken: any = verifyRefreshToken(refreshToken)

        // Generate a new access token using user information
        return createAccessToken(decodedToken.userId, decodedToken.isAdmin)
    } catch (error) {
        // Throw unauthorized error if token verification fails
        throw Boom.unauthorized('User is not logged in')
    }
}
