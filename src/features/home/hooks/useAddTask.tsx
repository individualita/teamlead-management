import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../shared/clients/queryClient';

import { Task } from '../types/task';

import { taskService } from '../services/taskService';

export const useAddTask = () => {

    const mutation = useMutation({
        mutationFn:  (taskData: Omit<Task, 'id'>) => taskService.addTaskToFirestore(taskData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        },
        onError: (error) => {
            console.error('Mutation error in useAddTask:', error)
        }

    });

    return mutation;
};

