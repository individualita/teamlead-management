import { Employee } from '../../../../shared/types';

import EmployeeAvatar from './components/employeeAvatar/EmployeeAvatar';
import HeaderInfo from './components/headerInfo/HeaderInfo';
import ContactInfo from './components/contactInfo/ContactInfo';
import DetailsInfo from './components/detailsInfo/DetailsInfo';

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
