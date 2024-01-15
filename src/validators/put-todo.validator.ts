// import { z } from 'zod';

// export const putTodoDto = z.object({
//     body: z.object({
//         title: z.string({
//             required_error: 'Title is required nigga ',
//         }),
//         status: z.string({
//             required_error: 'Status is required ',
//         }),
//     }),
//     params: z.object({
//         id: z.string().min(1, { message: 'Invalid id' }),
//     }),
// });

import { z } from 'zod'

export const putTodoDto = z.object({
    params: z.object({
        id: z.string().refine((value) => !isNaN(Number(value)), {
            message: 'ID must be a number',
        }),
    }),
})

export const putTodoDtobody = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title must be a string' }),
        status: z.enum(['completed', 'ongoing']),
    }),
})