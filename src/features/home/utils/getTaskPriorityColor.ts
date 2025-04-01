import { TASK_PRIORITY_COLORS } from '../constants/taskPriorityColors';

import { TaskPriority } from '../constants/taskPriorityValues';

export const getTaskPriorityColor = (priority: TaskPriority): string => {
    return TASK_PRIORITY_COLORS[priority] || 'bg-gray-500';
};