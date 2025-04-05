import { Status } from '../types/task';
import { TASK_STATUSES } from './taskStatuses';

interface BoardColumn {
    key: string,
    label: Status
}

export const BOARD_COLUMNS: BoardColumn[] = [
    { key: 'todo', label: TASK_STATUSES.TODO },
    { key: 'inProgress', label: TASK_STATUSES.IN_PROGRESS },
    { key: 'done', label: TASK_STATUSES.DONE }
];

