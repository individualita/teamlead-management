import { create, StateCreator } from 'zustand';
import { Employee } from '../types';
import { EMPLOYEES } from '../mocks/employees';

interface EmployeesInitialState {
    employees: Employee[];
}

interface EmployeesActions {
    setEmployees: (employees: Employee[]) => void;
    addEmployee: (employee: Employee) => void;
    deleteEmployee: (id: string) => void;
    updateEmployee: (id: string, updatedData: Partial<Employee>) => void;
}

interface EmployeesState extends EmployeesInitialState, EmployeesActions {}

const employeesStore: StateCreator<EmployeesState> = set => ({
    employees: EMPLOYEES,

    setEmployees: employees => set({ employees }),

    addEmployee: employee =>
        set(state => ({
            employees: [employee, ...state.employees],
        })),

    deleteEmployee: id =>
        set(state => ({
            employees: state.employees.filter(item => item.id !== id),
        })),

    updateEmployee: (id, updatedData) =>
        set(state => ({
            employees: state.employees.map(emp =>
                emp.id === id ? { ...emp, ...updatedData } : emp,
            ),
        })),
});

export const useEmployeeStore = create(employeesStore);

// selectors
export const useEmployees = () => useEmployeeStore(state => state.employees);
export const useEmployeeById = (id: string) => useEmployeeStore(state => state.employees.find(emp => emp.id === id));


// Action creators
export const setAllEmployees = (employees: Employee[]) => useEmployeeStore.getState().setEmployees(employees);
export const createEmployee = (employee: Employee) => useEmployeeStore.getState().addEmployee(employee);
export const removeEmployee = (id: string) => useEmployeeStore.getState().deleteEmployee(id);
export const modifyEmployee = (id: string, updatedData: Partial<Employee>) => useEmployeeStore.getState().updateEmployee(id, updatedData);
