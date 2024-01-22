/*import { Router } from 'express'
import { validate } from '../utils/validate'
import {
    authenticateToken,
    isAdmin,
} from '../middlewares/authentication.middleware'
import * as ProductController from '../controllers/product.controller'
import {
    createProductSchema,
    getProductsSchema,
    updateProductSchema,
} from '../validators/product.validator'

const router = Router()

router.post(
    '/',
    validate(createProductSchema),
    authenticateToken,
    isAdmin,
    ProductController.createProduct
)

router.get(
    `/`,
    validate(getProductsSchema),
    authenticateToken,
    isAdmin,
    ProductController.getProducts
)

router.delete(
    '/:id',
    authenticateToken,
    isAdmin,
    ProductController.deleteProduct
)

// This is a public endpoint
router.get(`/:id`, ProductController.getProductById)

router.put(
    '/:id',
    authenticateToken,
    isAdmin,
    validate(updateProductSchema),
    ProductController.updateProductById
)

export default router
*/
