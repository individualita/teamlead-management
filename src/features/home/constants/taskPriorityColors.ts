import { Priority } from '../types/task';
import { TASK_PRIORITIES } from './taskPriorities';


export const TASK_PRIORITY_COLORS: Record <Priority, string>= {
    [TASK_PRIORITIES.HIGH]: 'bg-red-100 text-red-800',
    [TASK_PRIORITIES.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [TASK_PRIORITIES.LOW]: 'bg-orange-100 text-orange-800',
    [TASK_PRIORITIES.COMPLETED]: 'bg-green-100 text-green-800',
};


