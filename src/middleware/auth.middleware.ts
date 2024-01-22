import Boom from '@hapi/boom'
import { Response, NextFunction } from 'express'
import { RequestWithUserObject, UserJWTPayload } from '../types'
import { verifyAccessToken } from '../utils/token.util'

//Middleware to authenticate user based on the provided access token in the request header.
export function authenticateToken(
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) {
    // Extract the token from the request header
    const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1]

    // Check if the token is missing
    if (!token) {
        throw Boom.badRequest('Missing authentication token')
    }

    try {
        // Verify and decode the access token
        const decodedToken = verifyAccessToken(token)
        req.user = decodedToken as UserJWTPayload

        // Continue to the next middleware
        next()
    } catch (error) {
        // Handle unauthorized access
        throw Boom.unauthorized('User is not logged in')
    }
}

//Middleware to check if the authenticated user is an admin.
export function isAdmin(
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) {
    const { user } = req

    // Check if the user is an admin
    if (user && user.isAdmin) {
        // Continue to the next middleware
        next()
    } else {
        // Handle forbidden access for non-admin users
        throw Boom.forbidden('User is not an admin')
    }
}


export function isUser(
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) {
    const { user } = req

    // Check if the user is an admin
    if (user && user.isUser) {
        // Continue to the next middleware
        next()
    } else {
        // Handle forbidden access for non-admin users
        throw Boom.forbidden('This is isUser error')
    }
}
