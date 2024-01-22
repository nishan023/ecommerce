// Import necessary dependencies and modules
import Boom from '@hapi/boom'
import prisma from '../libs/prisma'
import { User } from '@prisma/client'
import { exclude } from '../utils'
import { z } from 'zod'
import { updateUserBodySchema } from '../validators/user.validator'
import { updateProfileBodySchema } from '../validators/profile.validator'

// Create a new user in the database
export const create = async (user: User) => {
    try {
        return await prisma.user.create({
            data: user,
        })
    } catch (e: any) {
        // Handle unique constraint violation (email already exists)
        if (
            e.code === 'P2002' &&
            e.meta?.target &&
            e.meta?.target[0] === 'email'
        ) {
            throw Boom.conflict('User with this email already exists')
        }
        throw e
    }
}

// Retrieve all users from the database (excluding passwords)
export const get = async () => {
    const users = await prisma.user.findMany()
    return users.map((user) => exclude(user, ['password']))
}

// Retrieve a user by ID from the database (excluding password)
export const getById = async (id: number) => {
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: { id },
            include: {
                addresses: true,
            },
        })
        return exclude(user, ['password'])
    } catch (err: any) {
        // Handle user not found
        if (err.code === 'P2025') {
            throw Boom.notFound(`User with id ${id} does not exist`)
        }
        throw err
    }
}



// Update a user by ID in the database
export const updateById = async (
    id: number,
    user: z.infer<typeof updateProfileBodySchema>
) => {
    try {
        const { addresses, ...rest } = user
        const updatedUser = await prisma.user.update({
            where: { id },
            data: rest,
            include: {
                addresses: true,
            },
        })

        return updatedUser
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.badImplementation(
                `Failed to update user information: ${err.message}`
            )
        }
        throw err
    }
}

export const remove = async (id: number) => {
    try {
        // Delete the user by ID
        const deletedUser = await prisma.user.delete({
            where: { id },
        })

        return deletedUser
    } catch (error: any) {
        throw Boom.badImplementation(`Failed to remove user: ${error.message}`)
    }
}
