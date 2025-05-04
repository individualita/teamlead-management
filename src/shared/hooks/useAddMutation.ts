import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../clients/queryClient';

interface UseAddMutationOptions<T> {
    mutationFn: (data: Omit<T, 'id'>) => Promise<unknown>,
    queryKey: string[], 
}

export const useAddMutation = <T,>({mutationFn, queryKey}: UseAddMutationOptions<T>) => {

    const mutation = useMutation({

        mutationFn: (data: Omit<T, 'id'>) => mutationFn(data),

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: queryKey})            
        },
        onError: (error) => {
            console.error('Something went wrong. Mutation error in useAdd:', error)
        }
    })

    return mutation;
}