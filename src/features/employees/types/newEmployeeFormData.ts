import { EmployeeFormData } from './employeeFormData'

export type NewEmployeeFormData = Omit<EmployeeFormData, 'startDate'> & {startDate: Date}
