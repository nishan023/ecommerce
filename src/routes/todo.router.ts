/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as todoController from '../controller/todo.controller'
import { validate } from '../utils/validate'
import { postTodoDto } from '../validators/post-todo.validator'
import { putTodoDto } from '../validators/put-todo.validator'
import { deleteTodoDto } from '../validators/delete-todo.validator'
import { getTodoDto } from '../validators/get-todo.validator'
const router = Router()

//POST to database
router.post('/', validate(postTodoDto), todoController.postTodos)

//GET todos by id
router.get('/:id', validate(getTodoDto), todoController.getTodosByID)

//DELETE by id
router.delete('/:id', validate(deleteTodoDto), todoController.deleteTodosByID)

//UPDATE/PUT by id
router.put('/:id', validate(putTodoDto), todoController.updateTodo)

export default router
