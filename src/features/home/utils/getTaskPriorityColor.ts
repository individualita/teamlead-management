import { TASK_PRIORITY_COLORS } from '../constants/taskPriorityColors';
import { Priority } from '../types/task';

export const getTaskPriorityColor = (priority: Priority): string => {
    return TASK_PRIORITY_COLORS[priority] || 'bg-gray-500';
};