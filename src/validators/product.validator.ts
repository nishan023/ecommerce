import { z } from 'zod'

export const createProductBodySchema = z.object({
    category_id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    product_image: z.string(),
})
export const createProductParamsSchema = z.object({
    category: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
    search: z.string().optional(),
})

export const getProductsSchema = z.object({
    query: createProductParamsSchema,
})

export const createProductSchema = z.object({
    body: createProductBodySchema,
})

export const updateProductBodySchema = z.object({
    category_id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    product_image: z.string().optional(),
})

export const updateProductSchema = z.object({
    body: updateProductBodySchema,
})