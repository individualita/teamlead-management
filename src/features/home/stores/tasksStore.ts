import { create } from 'zustand';

import { Task } from '../types/task';

import { MOCK_TASKS } from '../mocks/mockTasks';


interface TasksState {
    tasks: Task[],
    addTask: (task: Task) => void,
    deleteTask: (id: string) => void,
}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: MOCK_TASKS,
    addTask: (task) => 
        set((state) => ({
            tasks: [task, ...state.tasks]
        })),
    deleteTask: (id) => 
        set((state) => ({
            tasks: state.tasks.filter(task => task._id !== id)
        })) 

}));



