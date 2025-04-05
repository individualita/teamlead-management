import { TASK_STATUSES } from '../constants/taskStatuses';
import { TASK_PRIORITIES } from '../constants/taskPriorities';

export type Status = typeof TASK_STATUSES[keyof typeof TASK_STATUSES];
export type Priority = typeof TASK_PRIORITIES[keyof typeof TASK_PRIORITIES];


export interface Task {
    _id: string,
    title: string,
    description: string,
    status: Status, 
    priority: Priority;
};


// Define the type for tasks grouped by status.
export type TasksGroupedByStatus = Record<Status, Task[]>;


