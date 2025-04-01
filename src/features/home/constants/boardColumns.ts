import { Status } from "../types/task";

interface BoardColumn {
    key: string,
    label: Status
}

export const BOARD_COLUMNS: BoardColumn[] = [
    { key: 'todo', label: 'To Do' },
    { key: 'inProgress', label: 'In Progress' },
    { key: 'done', label: 'Done' }
];

