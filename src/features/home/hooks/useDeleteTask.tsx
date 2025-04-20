import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../shared/clients/queryClient';


import { taskService } from '../services/taskService';

export const useDeleteTask = () => {
    const mutation = useMutation({
        mutationFn: (taskId: string) => taskService.deleteTaskFromFirestore(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']});
        },
        onError: (error) => {
            console.error('Mutation error in useDeleteTask:', error);
        },
    });

    return mutation;
};