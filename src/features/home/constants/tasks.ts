// Task-related constants: statuses, priorities, and their visual styles

import { TaskStatus, TaskPriority } from '../types';


export const TASK_STATUSES = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
} as const;
  
export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
    [TASK_STATUSES.TODO]: 'bg-[var(--color-primary)]',
    [TASK_STATUSES.IN_PROGRESS]: 'bg-orange-300',
    [TASK_STATUSES.DONE]: 'bg-green-600',
};
  
export const TASK_STATUS_BORDER_COLORS: Record<TaskStatus, string> = {
    [TASK_STATUSES.TODO]: 'border-[var(--color-primary)]',
    [TASK_STATUSES.IN_PROGRESS]: 'border-orange-300',
    [TASK_STATUSES.DONE]: 'border-green-600',
};
  
export const TASK_PRIORITIES = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
} as const;
  
export const TASK_PRIORITY_COLORS: Record<TaskPriority, string> = {
    [TASK_PRIORITIES.HIGH]: 'bg-red-100 text-red-800',
    [TASK_PRIORITIES.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [TASK_PRIORITIES.LOW]: 'bg-orange-100 text-orange-800',
};