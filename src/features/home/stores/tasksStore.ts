import { create } from 'zustand';

import { Task } from '../types/task';

import { MOCK_TASKS } from '../mocks/mockTasks';


interface TasksState {
    tasks: Task[],
}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: MOCK_TASKS,

}));



