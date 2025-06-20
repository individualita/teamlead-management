import { Employee } from '../../../../shared/types';
import { formatDate } from '../../../../shared/utils/formatDate';

interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    const formattedDate = formatDate(employee.startDate);
    return (
        <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200'>
            <p className='text-lg font-semibold'>{employee.name}</p>
            <p className='text-gray-600'>{employee.position}</p>
            <address className='text-gray-500'>{employee.email}</address>
            <p className='text-gray-400 text-sm'>
                start date:{formattedDate}
            </p>
        </div>
    );
};

export default EmployeeCard;
