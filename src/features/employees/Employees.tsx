
import { useEffect, useState } from 'react';

import { useEmployeeStore } from '../../shared/stores/employeesStore';
import EmployeesTable from './components/employeesTable/EmployeesTable';


import EmployeeCard from './components/employeeCard/EmployeeCard';

import UiEmployeesTable from './components/uiEmployeesTable/UiEmployeesTable';

import AddEmployeeDrawer from './components/addEmployeeDrawer/AddEmployeeDrawer';
import AddEmployeeForm from './components/addEmployeeForm/AddEmployeeForm';

import { Alert } from '@mui/material';


const Employees = () => {

    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const {employees} = useEmployeeStore();

    useEffect(() => {

        const timer = setTimeout(() => {

            setIsAlertVisible(false);

        }, 3000);


        return () => clearTimeout(timer);

    }, [isAlertVisible]);
    

    const showAlert = (name: string) => {
        setIsAlertVisible(true);
        setAlertMessage(name);
    };

    const test = false;

    

    return (
        <div className='employees'>

            <div className='container mx-auto p-6'>
                <AddEmployeeDrawer showAlert={showAlert}/>

                {isAlertVisible && <Alert>Employee <strong>{alertMessage}</strong> has been added successfully</Alert> }


                {/* desktop size */}
                <div className='overflow-x-auto rounded-lg shadow-md hidden md:block'>

                    

                    {test && <EmployeesTable />}

                </div>

                {/* card view for mobile size */}
                <div className='block md:hidden space-y-4'>

                    {employees.map(emp => <EmployeeCard key={emp._id} employee={emp}/>)}

                </div>

                <UiEmployeesTable />

            </div>

        </div>
    )
}

export default Employees;