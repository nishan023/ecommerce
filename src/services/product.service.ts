import prisma from '../libs/prisma'
import { Product } from '@prisma/client'
import {
    createProductBodySchema,
    createProductParamsSchema,
} from '../validators/product.validator'
import { z } from 'zod'
import Boom from '@hapi/boom'

export const create = async (
    product: z.infer<typeof createProductBodySchema>
) => {
    return await prisma.product.create({
        data: product,
    })
}

export const get = async (query: z.infer<typeof createProductParamsSchema>) => {
    const { category, page = 1, pageSize = 10, search } = query

    const skip = (Number(page) - 1) * Number(pageSize)

    const products = await prisma.product.findMany({
        skip,
        take: Number(pageSize),
        include: { product_items: true },
        where: {
            category: {
                id: category ? Number(category) : undefined,
            },
            ...(search && {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            }),
        },
    })

    return products
}

export const getById = async (id: number) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
                product_items: {
                    include: {
                        configurations: {
                            include: {
                                variation_option: {
                                    include: {
                                        variation: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        return product
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`Product with id ${id} does not exist`)
        }
        throw err
    }
}

export const remove = async (id: number) => {
    try {
        await prisma.product.delete({
            where: { id },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`Product with id ${id} does not exist`)
        }
        throw err
    }
}

export const update = async (
    id: number,
    product: z.infer<typeof createProductBodySchema>
) => {
    const { category_id, ...rest } = product

    try {
        const category = await prisma.productCategory.update({
            where: { id: Number(id) },
            data: {
                parent_category: category_id
                    ? { connect: { id: category_id } }
                    : undefined,
                ...rest,
            },
        })
        return category
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`Product with id ${id} does not exist`)
        }
        throw err
    }
}