import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../clients/queryClient';

interface UseDeleteMutationOptions {
    mutationFn: (id: string) => Promise<unknown>,
    queryKey: string[],
}


export const useDeleteMutation = ({mutationFn, queryKey}: UseDeleteMutationOptions) => {
    
    const mutation = useMutation({
        mutationFn: (id: string) => mutationFn(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: queryKey})
        },
        onError: (error) => {
            console.error('Mutation error in useDelete:', error)
        } 
    });


    return mutation;
};