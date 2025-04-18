import {getDocs, addDoc, collection } from 'firebase/firestore';
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
    }

};

//deleteTaskFromFirestore

//updateTaskInFirestore