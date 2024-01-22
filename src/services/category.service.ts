import { z } from 'zod'
import prisma from '../libs/prisma'
import { createCategoryBodySchema } from '../validators/category.validator'
import Boom from '@hapi/boom'

export const create = async (
    category: z.infer<typeof createCategoryBodySchema>
) => {
    const { parent_category_id, category_name, variations } = category

    const createdCategory = await prisma.productCategory.create({
        data: {
            parent_category: parent_category_id
                ? { connect: { id: parent_category_id } }
                : undefined,
            category_name,
            variations: {
                create: variations?.map((variation) => ({
                    name: variation.name,
                    options: {
                        create: variation.options?.map((option) => ({
                            value: option.value,
                        })),
                    },
                })),
            },
        },
        include: {
            variations: {
                include: {
                    options: true,
                },
            },
        },
    })

    return createdCategory
}

export const get = async () => {
    return await prisma.productCategory.findMany({
        include: {
            variations: {
                include: {
                    options: true,
                },
            },
        },
    })
}

export const getById = async (id: number) => {
    try {
        return await prisma.productCategory.findFirstOrThrow({
            where: { id },
            include: {
                variations: {
                    include: {
                        options: true,
                    },
                },
            },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`Category with id ${id} does not exist`)
        }
        throw err
    }
}

export const remove = async (id: number) => {
    // Doing this might be slower based on data. Other options can be soft deletes, do the deletes in background jobs etc.
    // It's not just about performance, you might want to store things for analytics later. Deleting like this is usually a bad idea.
    try {
        await prisma.$transaction(async (prisma) => {
            const products = await prisma.product.findMany({
                where: { category_id: Number(id) },
            })

            const productIds = products.map((product) => product.id)

            const productItems = await prisma.productItem.findMany({
                where: { product_id: { in: productIds } },
            })

            const productItemIds = productItems.map(
                (productItem) => productItem.id
            )

            await prisma.orderLine.deleteMany({
                where: { product_item_id: { in: productItemIds } },
            })

            await prisma.productItem.deleteMany({
                where: { id: { in: productItemIds } },
            })

            await prisma.product.deleteMany({
                where: { id: { in: productIds } },
            })

            await prisma.productCategory.delete({
                where: { id: Number(id) },
            })
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`Category with id ${id} does not exist`)
        }
        throw err
    }
}

export const updateById = async (
    id: number,
    category: z.infer<typeof createCategoryBodySchema>
) => {
    const { parent_category_id, category_name, variations } = category

    let updatedCategory
    try {
        const updatedVariations = variations?.flatMap((variation) => {
            if (variation.id) return [variation.id]
            return []
        })

        // If any variation is removed, we delete all variation option related to it, then delete the variation itself
        await prisma.$transaction(async (prisma) => {
            await prisma.variationOption.deleteMany({
                where: {
                    variation: {
                        category_id: id,
                    },
                    variation_id: {
                        notIn: updatedVariations,
                    },
                },
            })
            await prisma.variation.deleteMany({
                where: {
                    category_id: id,
                    id: {
                        notIn: updatedVariations,
                    },
                },
            })
            // For every variation, we want to remove the options that's not in the options array
            if (variations?.length) {
                for (const variation of variations) {
                    const updatedOptionIds = variation.options?.flatMap(
                        (option) => {
                            if (option.id) return [option.id]
                            return []
                        }
                    )

                    await prisma.variationOption.deleteMany({
                        where: {
                            variation: {
                                category_id: id,
                            },
                            variation_id: variation.id,
                            id: {
                                notIn: updatedOptionIds,
                            },
                        },
                    })
                }
            }
            // for variation and values, we want to upsert
            updatedCategory = await prisma.productCategory.update({
                where: { id: Number(id) },
                data: {
                    parent_category: parent_category_id
                        ? { connect: { id: parent_category_id } }
                        : undefined,
                    category_name,
                    variations: {
                        // https://github.com/prisma/prisma/issues/5233 - upsert is messy if we're using prisma and auto incrementing field?
                        upsert: variations?.map((variation) => ({
                            where: { id: variation.id || 0 },
                            create: {
                                name: variation.name,
                                options: {
                                    create: variation.options?.map(
                                        (option) => ({
                                            value: option.value,
                                        })
                                    ),
                                },
                            },
                            update: {
                                name: variation.name,
                                options: {
                                    upsert: variation.options?.map(
                                        (option) => ({
                                            where: { id: option.id || 0 },
                                            create: { value: option.value },
                                            update: { value: option.value },
                                        })
                                    ),
                                },
                            },
                        })),
                    },
                },
                include: {
                    variations: {
                        include: {
                            options: true,
                        },
                    },
                },
            })
        })
        return updatedCategory
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`Category with id ${id} does not exist`)
        }
        throw err
    }
}