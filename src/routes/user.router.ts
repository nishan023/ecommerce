import { Router } from 'express';
import * as UserController from '../controller/user.controller';
import {
    authenticateToken,
    isAdmin,
} from '../middleware/auth.middleware';
import { validate } from '../utils/validate';
import {
    createUserSchema,
    updateUserSchema,
} from '../validators/user.validator';

const router = Router();

// Get all users (requires authentication and admin privileges)
router.get('/', authenticateToken, isAdmin, UserController.getUsers);

// Get a user by ID (requires authentication and admin privileges)
router.get('/:id', authenticateToken, isAdmin, UserController.getUserById);

// Create a new user (requires authentication and admin privileges)
router.post(
    '/',
    validate(createUserSchema),
    authenticateToken,
    isAdmin,
    UserController.createUser
);


//  route to update a user by ID (requires authentication and admin privileges)
router.put(
    '/:id',
    validate(updateUserSchema),
    authenticateToken,
    isAdmin,
    UserController.updateUserById
);


// Delete a user by ID (requires authentication and admin privileges)
router.delete('/:id', authenticateToken, isAdmin, UserController.deleteUser);
export default router;
