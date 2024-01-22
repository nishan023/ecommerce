import authRoutes from './auth.router'
import userRoutes from './user.router'
import profileRoutes from './profile.router'
import categoryRoutes from './category.router'
//import productRoutes from './product.router'
import { Router } from 'express'



const router = Router()
router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/profile/me', profileRoutes)
router.use('/categories', categoryRoutes)
//router.use('/products', productRoutes)

export default router