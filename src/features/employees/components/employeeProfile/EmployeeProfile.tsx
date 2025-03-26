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
        </div>
    )
};


export default EmployeeProfile;

