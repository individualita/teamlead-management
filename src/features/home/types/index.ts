import { TASK_STATUSES, TASK_PRIORITIES } from '../constants/tasks';

export type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES];
export type TaskPriority = typeof TASK_PRIORITIES[keyof typeof TASK_PRIORITIES];


export interface Task {
    id: string,
    title: string,
    description: string,
    status: TaskStatus, 
    priority: TaskPriority;
    completed: boolean,
};


// Define the type for tasks grouped by status.
export type TasksGroupedByStatus = Record<TaskStatus, Task[]>;