import { z } from 'zod';

import { TASK_PRIORITIES } from '../constants/tasks';
import { TaskPriority } from '../types';

const priorityValues = Object.values(TASK_PRIORITIES) as [TaskPriority, ...TaskPriority[]];

export const taskSchema = z.object({
    title: z.string().trim().min(2, 'At least 2 characters long'),
    description: z.string().trim().min(2, 'At least 2 characters long'),
    priority: z.enum(priorityValues, { required_error: 'Priority is required' }),

});

export type TaskFormDataSchema = z.infer<typeof taskSchema>;