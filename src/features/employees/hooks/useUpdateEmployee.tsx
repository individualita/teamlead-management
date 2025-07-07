import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/clients/queryClient';


import { employeesService, updateEmployee } from '../../../shared/services/employeesService';

export const useUpdateEmployee = () => {

    const mutation = useMutation({
        mutationFn: ({data, employeeId}: updateEmployee) => 
            employeesService.updateEmployeeInFirestore({employeeId, data}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']});
        },
        onError: (error) => {
            console.error('Mutation error in useUpdateEmployee:', error);
        },
    });
    return mutation;
}