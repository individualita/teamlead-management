import { Employee } from '../../../shared/types';

import EmployeeAvatar from './employeeProfile/EmployeeAvatar';
import HeaderInfo from './employeeProfile/HeaderInfo';
import ContactInfo from './employeeProfile/ContactInfo';
import DetailsInfo from './employeeProfile/DetailsInfo';

interface EmployeeProfileProps {
    employee?: Employee;
}

const EmployeeProfile = ({ employee }: EmployeeProfileProps) => {
    if (!employee) return <div>Employee not found</div>;

    return (
        <div className=' flex items-center justify-center p-4'>
            <div className='bg-white shadow-md rounded-md p-6 max-w-md w-full'>
                <EmployeeAvatar name={employee.name} />

                <HeaderInfo
                    name={employee.name}
                    position={employee.position}
                    startDate={employee.startDate}
                />

                <ContactInfo 
                    phone={employee.phone} 
                    email={employee.email} 
                />

                <DetailsInfo 
                    startDate={employee.startDate} 
                    status={employee.status} 
                />
            </div>
        </div>
    );
};

export default EmployeeProfile;
