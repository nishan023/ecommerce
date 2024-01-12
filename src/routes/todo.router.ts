/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as todoController from '../controller/todo.controller'
import { validate } from '../utils/validate'
import { createTodoDto } from '../validators/create-todo.validator'
const router = Router()

//POST to databse
router.post('/', validate(createTodoDto), todoController.postTodos)

//GET todos by id
router.get('/:id', todoController.getTodosByID)

//DELETE by id
router.delete('/:id', todoController.deleteTodosByID)

//UPDATE by id
router.put('/:id', todoController.updateTodo)

export default router
