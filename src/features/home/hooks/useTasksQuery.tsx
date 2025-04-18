import { useQuery } from '@tanstack/react-query';

import { taskService } from '../services/taskService';

export const useTasksQuery = () => {
  
    return useQuery({
        queryKey: ['tasks'],
        queryFn: taskService.fetchTasksFromFirestore,
    });
};
  
