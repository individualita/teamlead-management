export const TASK_PRIORITY_VALUES = ['High', 'Medium', 'Low', 'Completed'] as const;

export type TaskPriority = typeof TASK_PRIORITY_VALUES[number];
