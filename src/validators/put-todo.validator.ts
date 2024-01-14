import { z } from 'zod';

export const putTodoDto = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required nigga ',
        }),
        status: z.string({
            required_error: 'Status is required ',
        }),
    }),
    params: z.object({
        id: z.string().min(1, { message: 'Invalid id' }),
    }),
});
