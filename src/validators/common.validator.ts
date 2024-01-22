import { z } from 'zod'

//Zod schema for validating user addresses
export const userAddressValidator = z
    .object({
        street_number: z.string({
            required_error: 'street_number is required',
        }),
        address_line1: z.string({
            required_error: 'address_line1 1 is required',
        }),
        address_line2: z.string().optional(),
        city: z.string({ required_error: 'city is required' }),
        region: z.string({ required_error: 'region is required' }),
        postal_code: z.string({
            required_error: 'postal_code is required',
        }),
    })
    .array()
    .optional()
