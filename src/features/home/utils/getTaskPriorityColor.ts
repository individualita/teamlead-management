import { TASK_PRIORITY_COLORS } from '../constants/tasks';
import { TaskPriority } from '../types';

export const getTaskPriorityColor = (priority: TaskPriority): string => {
    return TASK_PRIORITY_COLORS[priority] || 'bg-gray-500';
};