import { Status } from '../types/task';

export const TASK_STATUS_COLORS: Record<Status, string> = {
    'To Do' : 'bg-indigo-600',
    'In Progress': 'bg-orange-300',
    'Done': 'bg-green-600'
};


