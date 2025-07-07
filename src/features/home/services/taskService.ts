import {
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    collection,
    doc,
} from 'firebase/firestore';
import { db } from '@/shared/config/firebaseConfig';

import { Task, TaskStatus } from '../types';

export interface UpdateTaskStatus {
    taskId: string;
    newStatus: TaskStatus;
    completed: boolean;
}

export const taskService = {
    fetchTasksFromFirestore: async (): Promise<Task[]> => {
        try {
            const querySnapshot = await getDocs(collection(db, 'tasks'));

            const tasks: Task[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<Task, 'id'>),
            }));

            return tasks;
        } catch (error: any) {
            console.error('Failed to fetch tasks', error);
            throw new Error('Could not fetch tasks. Please try again later.');
        }
    },

    addTaskToFirestore: async (taskData: Omit<Task, 'id'>) => {
        try {
            const docRef = await addDoc(collection(db, 'tasks'), taskData);
            return { id: docRef.id, ...taskData } as Task;
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    },

    deleteTaskFromFirestore: async (taskId: string) => {
        try {
            await deleteDoc(doc(db, 'tasks', taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    },

    updateTaskStatusInFirestore: async ({
        taskId,
        newStatus,
        completed = false,
    }: UpdateTaskStatus) => {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, { status: newStatus, completed });

            return { id: taskId, status: newStatus, completed };
        } catch (error) {
            console.error('Error updating task status:', error);
            throw error;
        }
    },
};
