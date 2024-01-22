import { z } from 'zod'
import Boom from '@hapi/boom'
import bcrypt from 'bcryptjs'
import prisma from '../libs/prisma'
import { updateProfileBodySchema } from '../validators/profile.validator'
import { exclude } from '../utils'
import { signupBodySchema } from '../validators/auth.validator'

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
//     const { addresses, ...rest } = user
//     const updatedUser = await prisma.user.update({
//         where: { id },
//         data: rest,
//         include: {
//             addresses: true,
//         },
//     })

//     if (!addresses) return exclude(updatedUser, ['password'])

//     const updatedAddresses = await Promise.all(
//         addresses.map(async (address) => {
//                 return prisma.address.update({
//                     where: { id: address.id },
//                     data: address,
//                 })

//             return newAddress;
//         })
//     )

//     updatedUser.addresses = updatedAddresses

//     return exclude(updatedUser, ['password'])
// }

export const update = async (
    id: number,
    data: z.infer<typeof signupBodySchema>
) => {
    try {
        const { email, password } = data
        return await prisma.user.update({
            where: {
                email: email,
            },
            // how to link to address table
            // include is not working
            data: {
                password: await bcrypt.hash(password, 10),
            },
            select: {
                id: true,
                email: true,
                phone_number: true,
                is_admin: true,
            },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound('post not found')
        } else {
            throw err
        }
    }
}
function next(err: any) {
    throw new Error('Function not implemented.')
}


