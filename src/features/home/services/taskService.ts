import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';

import { Task } from '../types/task';

// Создаём задачу без _id, так как Firestore сгенерирует ID//useAddTask Hook
export const addTaskToFirestore  = async (taskData: Omit<Task, 'id'>) => {
    const docRef = await addDoc(collection(db, 'tasks'), taskData);
    return {id: docRef.id, ...taskData} as Task;
};


//deleteTaskFromFirestore

//updateTaskInFirestore