import { useQuery } from '@tanstack/react-query';

import { employeesService } from '../services/employeesService';

export const useEmployeesQuery = () => {
  
    return useQuery({
        queryKey: ['employees'],
        queryFn: employeesService.fetchEmployeesFromFirestore,
    });
};