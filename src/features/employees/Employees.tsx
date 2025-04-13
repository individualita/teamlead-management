import { useEffect, useState } from 'react';

import { Alert } from '@mui/material';

import { useEmployeeStore } from '../../shared/stores/employeesStore';

import { ALERT_TIMEOUT } from './constants/alertTimeout';

import EmployeeCard from './components/EmployeeCard';
import UiEmployeesTable from './components/UiEmployeesTable';
import AddEmployeeDrawer from './components/AddEmployeeDrawer';

import styles from './employees.module.css';



const Employees = () => {

    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const {employees} = useEmployeeStore();

    

    useEffect(() => {

        const timer = setTimeout(() => {

            setIsAlertVisible(false);

        }, ALERT_TIMEOUT);

        return () => clearTimeout(timer);

    }, [isAlertVisible]);
    

    const showAlert = (name: string) => {

        setAlertMessage(name);
        setIsAlertVisible(true);
    };


    return (
        <div className='employees'>

            <div>
                <AddEmployeeDrawer showAlert={showAlert}/>

                {isAlertVisible && <Alert>Employee <strong>{alertMessage}</strong> has been added successfully</Alert> }


                {/* desktop size */}
                <div className={styles.tableDesktopWrapper}>

                    <UiEmployeesTable />

                </div>

                {/* card view for mobile size */}
                <div className='block space-y-4 md:hidden'>

                    {employees.map(emp => <EmployeeCard key={emp._id} employee={emp}/>)}

                </div>


            </div>

        </div>
    )
}

export default Employees;