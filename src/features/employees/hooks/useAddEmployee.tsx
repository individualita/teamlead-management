import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../shared/clients/queryClient';

import { Employee } from '../../../shared/types/employee';
import { employeesService } from '../services/employeesService';


export const useAddEmployee = () => {

    const mutation = useMutation({
        mutationFn:  (employeeData: Omit<Employee, 'id'>) => employeesService.addEmployeeToFirestore(employeeData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']})            
        },
        onError: (error) => {
            console.error('Something went wrong. Mutation error in useAddEmployee:', error)
        }

    });

    return mutation;
};