import { TASK_STATUSES } from './taskStatuses';

export const TASK_STATUS_BORDER_COLORS = {
    [TASK_STATUSES.TODO]: 'border-indigo-600',
    [TASK_STATUSES.IN_PROGRESS]: 'border-orange-300',
    [TASK_STATUSES.DONE]: 'border-green-600',
};