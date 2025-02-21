import { Employee } from '../../../../shared/types/employee';

interface EmployeeCardProps {
    employee: Employee
}

const EmployeeCard = ({employee}: EmployeeCardProps) => {
    return (
                    
        <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200'>

            <p className='text-lg font-semibold'>{employee.name}</p>
            <p className='text-gray-600'>{employee.position}</p>
            <address className='text-gray-500'>{employee.email}</address>
            <p className='text-gray-400 text-sm'>start date:{employee.startDate}</p>

        </div>                        

    )
}

export default EmployeeCard;