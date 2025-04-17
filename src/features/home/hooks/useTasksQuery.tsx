import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../../shared/config/firebaseConfig';

import { useQuery } from '@tanstack/react-query';

import { useTasksStore } from '../stores/tasksStore';

import { Task } from '../types/task';



const useTasksQuery = () => {
    const { setTasks } = useTasksStore(); 
  
    const fetchTasksFromFirestore = async (): Promise<Task[]> => {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const tasks: Task[] = querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            ...(doc.data() as Omit<Task, '_id'>),
        }));
  
        setTasks(tasks); // local state
        return tasks;
    };
  
    return useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasksFromFirestore,
    });
};
  
  export default useTasksQuery;