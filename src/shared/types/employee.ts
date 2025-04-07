import { EMPLOYEE_STATUSES } from '../../features/employees/constants/employeeStatuses';

export type EmployeeStatus = typeof EMPLOYEE_STATUSES[keyof typeof EMPLOYEE_STATUSES];


export interface Employee {
    _id: string,
    name: string;
    position: string;
    phone: string;
    email: string;
    startDate: Date,
    status: EmployeeStatus;
};


