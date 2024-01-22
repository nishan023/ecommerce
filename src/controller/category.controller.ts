import { NextFunction, Request, Response } from 'express'
import * as CategoryService from '../services/category.service'
import HttpStatusCode from 'http-status-codes'

export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await CategoryService.get()
        res.json(categories)
    } catch (e) {
        next(e)
    }
}

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await CategoryService.create(req.body)
        res.status(HttpStatusCode.CREATED).json(category)
    } catch (e) {
        next(e)
    }
}

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await CategoryService.remove(Number(req.params.id))
        res.status(HttpStatusCode.NO_CONTENT).json(category)
    } catch (e) {
        next(e)
    }
}

export const getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await CategoryService.getById(Number(req.params.id))
        res.status(HttpStatusCode.CREATED).json(category)
    } catch (e) {
        next(e)
    }
}

export const updateCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await CategoryService.updateById(
            Number(req.params.id),
            req.body
        )
        res.status(HttpStatusCode.CREATED).json(category)
    } catch (e) {
        next(e)
    }
}