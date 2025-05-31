import { EMPLOYEE_STATUSES } from '../constants/employeeStatuses';

// Employee
export type EmployeeStatus = typeof EMPLOYEE_STATUSES[keyof typeof EMPLOYEE_STATUSES];

export interface Employee {
    id: string,
    name: string;
    position: string;
    phone: string;
    email: string;
    startDate: Date,
    status: EmployeeStatus;
};


// User 
export interface User {
    id: string ,
    username: string | null,
    email: string | null,
    photoURL: string | null,
    token: string | null,
}