import { create } from 'zustand';

import { Task } from '../types/task';
import { TaskStatus } from '../types/task';

import { MOCK_TASKS } from '../mocks/mockTasks';


interface TasksState {
    tasks: Task[],
    setTasks: (tasks: Task[]) => void,
    addTask: (task: Task) => void,
    deleteTask: (id: string) => void,
    updateTaskStatus: (id: string, newStatus: TaskStatus, completed: boolean) => void,
}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: MOCK_TASKS,
    setTasks: (tasks) => set({ tasks }),
    addTask: (task) => 
        set((state) => ({
            tasks: [task, ...state.tasks]
        })),
    deleteTask: (id) => 
        set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id)
        })),
    updateTaskStatus: (id, newStatus, completed = false) =>
        set((state) => ({
            tasks: state.tasks.map(task => 
                task.id === id? {...task, status: newStatus, completed } : task
            )
        })),

}));



