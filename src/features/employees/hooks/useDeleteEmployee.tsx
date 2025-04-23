import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../shared/clients/queryClient';


import { employeesService } from '../services/employeesService';

export const useDeleteEmployee = () => {
    const mutation = useMutation({
        mutationFn: (employeeId: string) => employeesService.deleteEmployeeFromFirestore(employeeId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']});
        },
        onError: (error) => {
            console.error('Mutation error in useDeleteEmployee:', error);
        },
    });

    return mutation;
};