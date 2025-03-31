import { STATUS_VALUES } from '../constants/statusValues';
import { PRIORITY_VALUES } from '../constants/priorityValues';

export type Status = typeof STATUS_VALUES[number];
export type Priority = typeof PRIORITY_VALUES[number];

export interface Task {
    _id: string,
    title: string,
    description: string,
    status: Status, 
    priority: Priority;
};


// Define the type for tasks grouped by status.
export type TasksGroupedByStatus = Record<Status, Task[]>;
