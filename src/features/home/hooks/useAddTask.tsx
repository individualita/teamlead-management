import { Task } from '../types/task';

import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../../../shared/clients/queryClient';

import { addTaskToFirestore } from '../services/taskService';

const useAddTask = () => {

    const mutation = useMutation({
        mutationFn:  (taskData: Omit<Task, 'id'>) => addTaskToFirestore(taskData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']});;
        },
        onError: (error) => {
            console.error('Mutation error in useAddTask:', error)
        }

    });

    return mutation;
};

export default useAddTask;