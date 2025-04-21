import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../shared/clients/queryClient';


import { taskService } from '../services/taskService';
import { UpdateTaskStatus } from '../services/taskService';


export const useUpdateStatus = () => {

    const mutation = useMutation({
        mutationFn: ({taskId, newStatus, completed}: UpdateTaskStatus) => 
            taskService.updateTaskStatusInFirestore({taskId, newStatus, completed}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']});
        },
        onError: (error) => {
            console.error('Mutation error in useUpdateStatus:', error);
        },
    });
    return mutation;
}


