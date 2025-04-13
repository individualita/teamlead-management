import { TaskStatus } from '../types/task';

import { TASK_STATUS_COLORS } from '../constants/tasks';

export const getTaskStatusColor = (status: TaskStatus): string => {
    return TASK_STATUS_COLORS[status] || 'bg-gray-500';
};