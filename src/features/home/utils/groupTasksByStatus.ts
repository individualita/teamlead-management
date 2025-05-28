import { Task, TasksGroupedByStatus } from '../types';

export const groupTasksByStatus = (tasks: Task[]) => {

    const initial: TasksGroupedByStatus = {
        'To Do': [],
        'In Progress': [],
        'Done': [],
    };

    return tasks.reduce((acc, task) => {

        acc[task.status].push(task);

        return acc;

    }, initial);

}


