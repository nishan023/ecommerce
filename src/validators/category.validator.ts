import { z } from 'zod'

const createVariationOptionSchema = z.object({
    value: z.string({
        required_error: 'Variation option value is required',
    }),
    id: z.number().optional(),
})

const createVariationSchema = z.object({
    name: z.string({
        required_error: 'Variation name is required',
    }),
    options: z.array(createVariationOptionSchema).optional(),
    id: z.number().optional(),
})

export const createCategoryBodySchema = z
    .object({
        parent_category_id: z
            .number({
                required_error: 'Parent category is required',
            })
            .optional(),
        category_name: z.string({
            required_error: 'Category name is required',
        }),
        variations: z.array(createVariationSchema).optional(),
    })
    .strict()

export const createCategorySchema = z.object({
    body: createCategoryBodySchema,
})