import { z } from 'zod'
import Boom from '@hapi/boom'
import bcrypt from 'bcryptjs'
import prisma from '../libs/prisma'
import { updateProfileBodySchema } from '../validators/profile.validator'
import { exclude } from '../utils'


export const get = async (id: number) => {
    return await prisma.user.findFirstOrThrow({
        select: { id: true, addresses: true, email: true, phone_number: true },
        where: { id },
    })
}

export const update = async (
    id: number,
    user: z.infer<typeof updateProfileBodySchema>
  ) => {
    try {
        const { addresses, ...rest } = user;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: rest,
      include: {
        addresses: true,
      },
    });
  
    return updatedUser;
  } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.badImplementation(`Failed to update user information: ${err.message}`);
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

