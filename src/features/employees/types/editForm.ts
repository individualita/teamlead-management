import { Employee } from '../../../shared/types/employee';

export type EditFormType = Omit<Employee, '_id'>;
