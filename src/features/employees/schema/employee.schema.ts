import { z } from 'zod';

import { EMPLOYEE_STATUSES } from '../../../shared/constants/employeeStatuses';
import { EmployeeStatus } from '../../../shared/types/employee';

const statusValues = Object.values(EMPLOYEE_STATUSES) as [EmployeeStatus, ...EmployeeStatus[]]

export const employeeSchema = z.object({
    name: z.string().trim().min(2, 'At least 2 characters long'),
    position: z.string().trim().min(2, 'At least 2 characters long'),
    startDate: z.date({message:'Start date is required'}), 
    status: z.enum(statusValues,  { required_error: 'Status is required' }),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().regex(/^\+?\d{9,15}$/, 'Phone number must be 9 to 15 digits and may start with "+"'),
});


export type EmployeeFormDataSchema = z.infer<typeof employeeSchema>;
