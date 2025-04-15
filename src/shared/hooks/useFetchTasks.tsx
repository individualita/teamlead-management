import { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../config/firebaseConfig';

import { useTasksStore } from '../../features/home/stores/tasksStore';

import { Task } from '../../features/home/types/task';


const useFetchTasks = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState<boolean>(true);

    const {setTasks} = useTasksStore();


    const fetchTasks = async () => {

        setErrorMessage('');
        setLoading(true);

        console.log('start fetch');

        try {
            const querySnapshot = await getDocs(collection(db, 'tasks'));

            //пробегаемся по докам в БД. 
            const tasks: Task[] = querySnapshot.docs.map(doc => ({
                _id: doc.id,
                ...(doc.data() as Omit<Task, '_id'>)
            }));

            //локально
            setTasks(tasks);

            console.log('Таски загружены');

        } catch (e) {
            setErrorMessage(e as string);
            console.error(e, 'error');
        } finally {
            setLoading(false);
        }
    }

    return {errorMessage, loading, fetchTasks}    
}

export default useFetchTasks;