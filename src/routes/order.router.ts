/*import { Router } from 'express'
import { validate } from '../utils/validate'
import { createUserSchema } from '../validators/auth.validator'
import {
    authenticateToken,
    isAdmin,
} from '../middleware/auth.middleware'
import * as OrderController from '../controller/order.controller'

const router = Router()

router.post('/', OrderController.createOrder)

router.get(`/`, validate(createUserSchema), OrderController.getOrders)

router.delete('/', authenticateToken, () => {
    console.log(
        'this endpoint should verify the refresh token and generate a short lasting acess token'
    )
})

router.get(`/:id`, validate(createUserSchema), OrderController.getOrderById)

router.put(
    '/:id',
    authenticateToken,
    isAdmin,
    validate(createUserSchema),
    OrderController.updateOrderById
)

export default router
*/