import dayjs from 'dayjs';

import { Employee } from '../../types';

import { STATUS_TEXT_COLORS } from '../../constants/statusTextColors';

import { getEmployeeBadgeInfo } from '../../../features/employees/utils/getEmployeesBadgeInfo';
import { getEmployeeStatusColor } from '../../utils/getEmployeeStatusColor';

interface EmployeeProfileProps {
    employee?: Employee 
}

const EmployeeProfile = ({employee}: EmployeeProfileProps) => {


    if (!employee) return <div>Employee not found</div>;

    const now = dayjs();
    const years = now.diff(employee.startDate, 'years'); 

    return (
        <div className=' flex items-center justify-center p-4'>

            <div className='bg-white shadow-md rounded-md p-6 max-w-md w-full'>

                {/* avatar */}
                <div className='flex justify-center mb-4'>

                    <div className='w-24 h-24 rounded-full bg-gray-200 shadow-md border-2 border-gray-300 hover:scale-110 transition-transform duration-300 flex items-center justify-center'>
                        <span className='text-gray-500 text-2xl'>
                            {employee.name.charAt(0).toUpperCase()}
                        </span>
                    </div>

                </div>

                <div className='text-center'>

                    <h2 className='text-2xl font-semibold text-gray-800'>{employee.name}</h2>
                    <p className='text-gray-500'>{employee.position}</p>
                    <p className='text-xs'>{getEmployeeBadgeInfo(years).title} {getEmployeeBadgeInfo(years).icon}</p>

                </div>

                <div className='mt-6'>
                    <h3 className='text-lg font-medium text-gray-700'>Contact</h3>
                    <div className='mt-2 space-y-2'>
                        <p>

                            <span className='text-gray-600'>Phone: </span>
                            <a
                                href={`tel:${employee.phone}`}
                                className='text-blue-500 hover:underline'
                            >
                                {employee.phone}
                            </a>
                            
                        </p>

                        <p>
                            <span className='text-gray-600'>Email: </span>
                            <a
                                href={`mailto:${employee.email}`}
                                className='text-blue-500 hover:underline'
                            >
                                {employee.email}
                            </a>
                        </p>
                        
                    </div>
                </div>

                {/* Детали */}
                <div className='mt-6'>
                    <h3 className='text-lg font-medium text-gray-700'>Details</h3>

                    <div className='mt-2 space-y-2'>
                        <p>
                            <span className='text-gray-600'>Start date: </span>
                            {new Date(employee.startDate).toLocaleDateString('ru-RU')}
                        </p>


                        <p>
                            <span className='text-gray-600'>Status: </span>

                            <span
                                style={{color: STATUS_TEXT_COLORS[employee.status]}}
                                className={`${getEmployeeStatusColor(employee.status)} p-1 rounded-md`}
                            >
                                {employee.status}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
  
    );
};


export default EmployeeProfile;

