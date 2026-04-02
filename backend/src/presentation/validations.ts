import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }).min(1, 'Title cannot be empty'),
    description: z.string().optional().default(''),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Task ID is required',
    }),
  }),
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }).min(1, 'Title cannot be empty'),
    description: z.string().optional().default(''),
  }),
});

export const taskIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Task ID is required',
    }),
  }),
});
