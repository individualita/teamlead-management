import { Employee } from '../../../shared/types/employee';

export type EmployeeFormData = Omit<Employee, '_id'>;
