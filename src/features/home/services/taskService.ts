import {getDocs, addDoc, deleteDoc,  collection, doc } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';

import { Task } from '../types/task';


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

    updateTaskInFirestore: () => {
        //setDoc чи updateDoc? 
    }

};

