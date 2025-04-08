import { TaskStatus } from '../types/task';
import { TASK_STATUSES } from './taskStatuses';

export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
    [TASK_STATUSES.TODO] : 'bg-indigo-600',
    [TASK_STATUSES.IN_PROGRESS]: 'bg-orange-300',
    [TASK_STATUSES.DONE]: 'bg-green-600'
};


