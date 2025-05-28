// UI-related constants: styles for components

import { TaskStatus } from '../types';
import { TASK_STATUSES } from './tasks';

interface BoardColumn {
    key: string,
    label: TaskStatus
}

export const BOARD_COLUMNS: BoardColumn[] = [
    { key: 'todo', label: TASK_STATUSES.TODO },
    { key: 'inProgress', label: TASK_STATUSES.IN_PROGRESS },
    { key: 'done', label: TASK_STATUSES.DONE }
];

