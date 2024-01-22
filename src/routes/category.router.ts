import { Router } from 'express'
import {
    authenticateToken,
    isAdmin,
} from '../middleware/auth.middleware'
import { validate } from '../utils/validate'
import { createCategorySchema } from '../validators/category.validator'
import * as CategoryController from '../controller/category.controller'

const router = Router()
router.get('/', authenticateToken, isAdmin, CategoryController.getCategories)

router.get(
    '/:id',
    authenticateToken,
    isAdmin,
    CategoryController.getCategoryById
)

router.post(
    '/',
    authenticateToken,
    isAdmin,
    validate(createCategorySchema),
    CategoryController.createCategory
)

router.put(
    '/:id',
    authenticateToken,
    isAdmin,
    validate(createCategorySchema),
    CategoryController.updateCategoryById
)

router.delete(
    '/:id',
    authenticateToken,
    isAdmin,
    CategoryController.deleteCategory
)
export default router