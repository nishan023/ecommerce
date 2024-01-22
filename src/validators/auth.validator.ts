import { z } from 'zod'

// Zod schema for validating the request body in the signup operation
export const signupBodySchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email('Email address is invalid'),
    password: z.string({
        required_error: 'Password is required ',
    }),
    is_admin: z.boolean({
        required_error: 'Required Admin (is_admin: true/false) or not',
    }),
})

// Zod schema for wrapping the signupBodySchema and validating the entire request body in the signup operation
export const signupSchema = z.object({
    body: signupBodySchema,
})

// Zod schema for validating the request body in the login operation
export const loginBodySchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email('Email address is invalid'),
    password: z.string({
        required_error: 'Password is required',
    }),
})

// Zod schema for wrapping the loginBodySchema and validating the entire request body in the login operation
export const loginSchema = z.object({
    body: loginBodySchema,
})
