import { NextFunction, Request, Response } from 'express'
import * as UserService from '../services/user.service'
import HttpStatusCode from 'http-status-codes'
import { User } from '@prisma/client'
// import { logger } from '../utils/logger';

// Retrieve all users
export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await UserService.get()
        res.json(users)
    } catch (e) {
        next(e)
    }
}

// Create a new user
export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await UserService.create(req.body as User)
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}

// Delete a user by ID

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = Number(req.params.id)
        await UserService.remove(userId)

        const responseJson = {
            message: `User with ID ${userId} has been successfully deleted.`,
        }

        res.status(HttpStatusCode.NO_CONTENT).json(responseJson)
    } catch (error) {
        next(error)
    }
}

// Retrieve a user by ID
export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await UserService.getById(Number(req.params.id))
        res.status(HttpStatusCode.OK).json(user)
    } catch (e) {
        next(e)
    }
}

//Update a user by id
export const updateUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id)
        const user = await UserService.updateById(id, req.body)
        res.status(HttpStatusCode.OK).json(user)
    } catch (e) {
        next(e)
    }
}
