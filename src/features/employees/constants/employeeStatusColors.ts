import { EMPLOYEE_STATUSES } from './employeeStatuses';

export const EMPLOYEE_STATUS_COLORS: Record<string, string> = {
    [EMPLOYEE_STATUSES.ACTIVE]: 'bg-green-100 text-green-800',
    [EMPLOYEE_STATUSES.ON_VACATION]: 'bg-orange-100 text-orange-800',
    [EMPLOYEE_STATUSES.SICK_LEAVE]: 'bg-blue-100 text-blue-800',
    [EMPLOYEE_STATUSES.MATERNITY_LEAVE]: 'bg-pink-100 text-pink-800',
    [EMPLOYEE_STATUSES.PROBATION]: 'bg-yellow-100 text-yellow-800',
    [EMPLOYEE_STATUSES.SUSPENDED]: 'bg-gray-300 text-gray-900',
    [EMPLOYEE_STATUSES.RESIGNED]: 'bg-gray-100 text-gray-800',
    [EMPLOYEE_STATUSES.TERMINATED]: 'bg-red-100 text-red-800',
    [EMPLOYEE_STATUSES.RETIRED]: 'bg-gray-50 text-gray-600',
    [EMPLOYEE_STATUSES.FIRED]: 'bg-red-100 text-red-800',
};

