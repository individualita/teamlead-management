import { create, StateCreator } from 'zustand';
import { Task, TaskStatus } from '../types';
import { MOCK_TASKS } from '../mocks/mockTasks';

interface TasksInitialState {
    tasks: Task[];
}

interface TasksActions {
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    updateTaskStatus: (id: string, newStatus: TaskStatus, completed: boolean) => void;
}

interface TasksState extends TasksInitialState, TasksActions {}

const tasksStore: StateCreator<TasksState> = (set) => ({
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
                task.id === id ? {...task, status: newStatus, completed } : task
            )
        })),
});

export const useTasksStore = create(tasksStore);

//Selectors
export const useTasks = () => useTasksStore(state => state.tasks);
export const useTaskById = (id: string) => 
    useTasksStore(state => state.tasks.find(task => task.id === id));
export const useCompletedTasks = () => 
    useTasksStore(state => state.tasks.filter(task => task.completed));
export const usePendingTasks = () => 
    useTasksStore(state => state.tasks.filter(task => !task.completed));


// Action creators
export const setAllTasks = (tasks: Task[]) => useTasksStore.getState().setTasks(tasks);
export const createTask = (task: Task) => useTasksStore.getState().addTask(task);
export const removeTask = (id: string) => useTasksStore.getState().deleteTask(id);
export const changeTaskStatus = (id: string, status: TaskStatus, completed: boolean) => useTasksStore.getState().updateTaskStatus(id, status, completed);