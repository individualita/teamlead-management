import { EMPLOYEE_STATUS_COLORS } from '../constants/employeeStatusColors';

// Возвращает Tailwind-классы для стилизации статуса сотрудника 
export const getEmployeeStatusColor = (status: string) => {
    return EMPLOYEE_STATUS_COLORS[status] || 'bg-gray-200 text-gray-950';
};