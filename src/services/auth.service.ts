import prisma from '../libs/prisma'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { signupBodySchema } from '../validators/auth.validator'
import { z } from 'zod'
import Boom from '@hapi/boom'
import {
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken,
} from '../utils/token.util'

export const signup = async (user: z.infer<typeof signupBodySchema>) => {
    const { email, password } = user
    try {
      return  await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 10),
            },
            select: {
                id: true,
                email: true,
                // password: true,
            },
        })
    } catch (e: any) {
        if (
            e.code === 'P2002' &&
            e.meta?.target &&
            e.meta?.target[0] === 'email'
        ) {
            throw Boom.conflict('User with this email already exists')
        } else {
            throw e
        }
    }
}
