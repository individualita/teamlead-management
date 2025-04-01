import { Status } from '../types/task';

import { TASK_STATUS_COLORS } from '../constants/taskStatusColors';

export const getTaskStatusColor = (status: Status): string => {
    return TASK_STATUS_COLORS[status] || 'bg-gray-500';
};