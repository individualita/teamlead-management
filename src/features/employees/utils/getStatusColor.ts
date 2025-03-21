import { STATUS_COLORS } from '../constants/statusColors';

// Возвращает Tailwind-классы для стилизации статуса сотрудника 
export const getStatusColor = (status: string) => {
    return STATUS_COLORS[status] || 'bg-gray-200 text-gray-950';
};