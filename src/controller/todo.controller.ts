/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import * as todoService from '../services/todo.service'

//POST todos
export const postTodos = (req: Request, res: Response, next: NextFunction) => {
    const response = todoService.postTodo(req.body)
    res.send(response)
}

//GET by id
export const getTodosByID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await todoService.getTodo(req.params.id)
        res.json(response)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

//DELETE by id
export const deleteTodosByID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const response = await todoService.deleteTodo(req.params.id)
    res.json(response)
}

//UPDATE by id
export const updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const response = await todoService.updateTodo(req.params.id, req.body)
    res.json(response)
}
