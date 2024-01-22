/*import { NextFunction, Request, Response } from 'express'
import * as ProductService from '../services/product.service'
import HttpStatusCode from 'http-status-codes'
import { Product } from '@prisma/client'

export const getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await ProductService.get()
        res.json(users)
    } catch (e) {
        next(e)
    }
}

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProductService.create(req.body as Product)
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}

export const deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProductService.remove(Number(req.params.id))
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}

export const getOrderById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProductService.getById(Number(req.params.id))
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}

export function updateOrderById(arg0: string, authenticateToken: (req: import("../types").RequestWithUserObject, res: Response<any, Record<string, any>>, next: NextFunction) => void, isAdmin: (req: import("../types").RequestWithUserObject, res: Response<any, Record<string, any>>, next: NextFunction) => void, arg3: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>, updateOrderById: any) {
    throw new Error('Function not implemented.')
}
/*
export const updateOrderById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProductService.update(
            Number(req.params.id),
            req.body as Product
        )
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}
*/