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

// export const update = async (
//     id: number,
//     user: z.infer<typeof updateProfileBodySchema>
// ) => {
//     try {
//         const { addresses, password, ...rest } = user
//         const newpassword = password
//             ? await bcrypt.hash(password, 10)
//             : undefined
//         const updatedUser = await prisma.user.update({
//             where: { id },
//             data: { ...rest, password: newpassword },
//             include: {
//                 addresses: true,
//             },
//         })

//         return updatedUser
//     } catch (err: any) {
//         if (err.code === 'P2025') {
//             throw Boom.badImplementation(
//                 `Failed to update user information: ${err.message}`
//             )
//         }
//         throw err
//     }
// }

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


//UPDATE
export const update = async (
    id: number,
    user: z.infer<typeof updateProfileBodySchema>
) => {
    const { addresses, password, ...rest } = user
    const newPassword = password ? await bcrypt.hash(password, 10) : undefined

    //update except address
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { ...rest, password: newPassword },
            include: {
                addresses: true,
            },
        })

        if (!addresses) return exclude(updatedUser, ['password'])

        const updatedAddresses = await Promise.all(
            addresses.map(async (address) => {
                if (address.id) {
                    return await prisma.address.update({
                        where: { id: address.id },
                        data: address,
                    })
                }
                const newAddress = await prisma.address.create({
                    data: {
                        ...address,
                        id: undefined,
                        user: { connect: { id } },
                    },
                })
                return newAddress
            })
        )
        updatedUser.addresses = updatedAddresses

        return exclude(updatedUser, ['password'])
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`User with id ${id} does not exist`)
        }
        throw err
    }
}