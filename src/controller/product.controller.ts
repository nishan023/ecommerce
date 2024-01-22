import { NextFunction, Request, Response } from 'express'
import * as ProductService from '../services/product.service'
import HttpStatusCode from 'http-status-codes'
import { Product } from '@prisma/client'

export const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await ProductService.get(req.query)
        res.json(products)
    } catch (e) {
        next(e)
    }
}

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await ProductService.create(req.body)
        res.status(HttpStatusCode.CREATED).json(product)
    } catch (e) {
        next(e)
    }
}

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await ProductService.remove(Number(req.params.id))
        res.status(HttpStatusCode.CREATED).json(product)
    } catch (e) {
        next(e)
    }
}

export const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await ProductService.getById(Number(req.params.id))
        res.status(HttpStatusCode.CREATED).json(product)
    } catch (e) {
        next(e)
    }
}

export const updateProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await ProductService.update(
            Number(req.params.id),
            req.body
        )
        res.status(HttpStatusCode.CREATED).json(product)
    } catch (e) {
        next(e)
    }
}