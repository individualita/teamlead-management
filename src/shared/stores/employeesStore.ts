import { create } from 'zustand';

import { Employee } from '../types/employee';

import { EMPLOYEES } from '../mocks/employees';


interface EmployeesState  {
    employees: Employee[],
    addEmployee: ( employee: Employee) => void,
    deleteEmployee: (id: string) => void,
}
export const useEmployeeStore = create<EmployeesState>((set) => ({
    employees: EMPLOYEES,
    addEmployee: (employee) => 
        set((state) => ({
            employees: [...state.employees, employee]
        })),
    deleteEmployee: (id) => 
        set((state) => ({
            employees: state.employees.filter(item => item._id !== id) 
        })),

}));
