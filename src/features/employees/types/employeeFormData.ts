import { Employee } from '../../../shared/types';

export type EmployeeFormData = Omit<Employee, 'id'>;
