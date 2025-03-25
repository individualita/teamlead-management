import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useEmployeeStore } from '../../../../shared/stores/employeesStore';
import { useTabsStore } from '../../../../shared/stores/tabsStore';

import { Employee } from '../../../../shared/types/employee';



interface EmployeeProfileProps {
    employee?: Employee 
}

const EmployeeProfile = ({employee}: EmployeeProfileProps) => {

    const navigate = useNavigate();

    const {employeeId} = useParams();

    const {employees} = useEmployeeStore();
    const { closeTab } = useTabsStore();

    //const employee = employees.find(emp => emp._id === employeeId);

    if (!employee) return <div>Employee not found</div>;

    //if employee? Navigate > not found page? 

    /* if (!employee) {
        navigate('/not-found', { replace: true });
        return null;
    }  */



    return (
        <div>
            <h1>Employee profile: {employee.name}</h1>
            <h3>Employee number: {employee.phone}</h3>
            <h2> ID: {employeeId} </h2>

            {/* navigate - 1 пока оставил. А что если из серчБара? */}
            <button onClick={() => closeTab(employee)} className='p-2 bg-indigo-800 text-white'>close tab</button>
            
        </div>
    )
};


export default EmployeeProfile;

