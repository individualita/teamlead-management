import { create } from 'zustand';

import { Employee } from '../types/employee';

import { EMPLOYEES } from '../mocks/employees';


interface EmployeesState  {
    employees: Employee[],
    addEmployee: ( employee: Employee) => void,
    deleteEmployee: (id: string) => void,
    updateEmployee: (id: string, updatedData: Partial<Employee >) => void,
}


export const useEmployeeStore = create<EmployeesState>((set) => ({
    employees: EMPLOYEES,
    addEmployee: (employee) => 
        set((state) => ({
            employees: [employee, ...state.employees]
        })),

    deleteEmployee: (id) => 
        set((state) => ({
            employees: state.employees.filter(item => item._id !== id) 
        })),

    updateEmployee: (id, updatedData) => 
        set((state) => ({
            employees: state.employees.map(emp => 
                emp._id === id? {...emp, ...updatedData} : emp
            )
        })),
}));
