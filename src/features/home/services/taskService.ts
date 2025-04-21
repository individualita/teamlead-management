import {getDocs, addDoc, deleteDoc, updateDoc,  collection, doc } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';

import { Task, TaskStatus } from '../types/task';

export interface UpdateTaskStatus {
    taskId: string,
    newStatus: TaskStatus,
    completed: boolean,
}

export const taskService = {

    fetchTasksFromFirestore: async ():  Promise<Task[]> => {
        const querySnapshot = await getDocs(collection(db, 'tasks'));

        const tasks: Task[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Task, 'id'>),
        }));
    
        return tasks;
    },

    addTaskToFirestore: async (taskData: Omit<Task, 'id'>) => {
        const docRef = await addDoc(collection(db, 'tasks'), taskData);
        return {id: docRef.id, ...taskData} as Task;
    },

    deleteTaskFromFirestore: async (taskId: string) => {
        await deleteDoc(doc(db, 'tasks', taskId));
    },

    updateTaskStatusInFirestore: async ({taskId, newStatus, completed = false}: UpdateTaskStatus) => {

        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, { status: newStatus, completed });

        return {id: taskId, status: newStatus, completed };  //возвращаем навсякий (и без этого работает)
    },

};

