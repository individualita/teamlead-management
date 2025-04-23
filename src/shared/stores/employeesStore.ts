import { create } from 'zustand';

import { Employee } from '../types/employee';

import { EMPLOYEES } from '../mocks/employees';


interface EmployeesState  {
    employees: Employee[],
    setEmployees: (employees: Employee[]) => void,
    addEmployee: ( employee: Employee) => void,
    deleteEmployee: (id: string) => void,
    updateEmployee: (id: string, updatedData: Partial<Employee >) => void,
}


export const useEmployeeStore = create<EmployeesState>((set) => ({
    employees: EMPLOYEES,
    setEmployees: (employees) => set({employees}),
    addEmployee: (employee) => 
        set((state) => ({
            employees: [employee, ...state.employees]
        })),

    deleteEmployee: (id) => 
        set((state) => ({
            employees: state.employees.filter(item => item.id !== id) 
        })),

    updateEmployee: (id, updatedData) => 
        set((state) => ({
            employees: state.employees.map(emp => 
                emp.id === id? {...emp, ...updatedData} : emp
            )
        })),
}));
