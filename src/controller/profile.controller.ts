import { NextFunction, Request, Response } from 'express'
import * as ProfileService from '../services/profile.service'
import HttpStatusCode from 'http-status-codes'
import { RequestWithUserObject } from '../types'
export const getProfile = async (
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await ProfileService.get(req.user.userId)
        res.json(users)
    } catch (e) {
        next(e)
    }
}

export const updateProfile = async (
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProfileService.update(req.user.userId, req.body)
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}


export const removeprofile= async (
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProfileService.remove(req.user.userId)
        const response = {
            message: 'User deleted successfully',
            user: user,
        }
        return res.status(HttpStatusCode.CREATED).json(response);
    } catch (e) {
        next(e)
    }
}