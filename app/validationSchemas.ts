import { z } from 'zod';

export const createCommentSchema = z.object({
    description: z.string().min(1, 'Description is required').max(255),
    comment: z.string().min(1, 'Comment is required'),
});
