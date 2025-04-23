import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { toast } from 'react-toastify';


//hooks
import { useEmployeeStore } from '../../shared/stores/employeesStore';
import { useEmployeesQuery } from './hooks/useEmployeesQuery';

import { ALERT_TIMEOUT } from './constants/alertTimeout';
import { LoadingCircle } from '../../shared/components/layouts/loadingCircle/LoadingCircle';
import EmployeeCard from './components/EmployeeCard';
import UiEmployeesTable from './components/UiEmployeesTable';
import AddEmployeeDrawer from './components/AddEmployeeDrawer';

import styles from './employees.module.css';

import { useDeleteEmployee } from './hooks/useDeleteEmployee';
import { useUpdateEmployee } from './hooks/useUpdateEmployee';
import { Employee } from '../../shared/types/employee';


const Employees = () => {

    const [alertMessage, setAlertMessage] = useState<string>('');

    const {employees, setEmployees, deleteEmployee, updateEmployee} = useEmployeeStore();
    const deleteEmployeeMutation = useDeleteEmployee();
    const updateEmployeeMutation = useUpdateEmployee()


    const { isLoading, isError, data, error } = useEmployeesQuery();

    useEffect(() => {
        if (data) setEmployees(data);
    }, [data]);
    
    //alert
    useEffect(() => {

        const timer = setTimeout(() => {

            setAlertMessage('');

        }, ALERT_TIMEOUT);

        return () => clearTimeout(timer);

    }, [alertMessage]);
    

    const showAlert = (name: string) => setAlertMessage(name);

    const onDeleteEmployee = (employeeId: string) => {

        deleteEmployeeMutation.mutate(employeeId, {
            onSuccess: () => {
                deleteEmployee(employeeId); //zustand
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    };

    const onUpdateEmployee = (employeeId: string, data: Partial<Employee>) => {

        updateEmployeeMutation.mutate({data, employeeId}, {
            onSuccess: () => updateEmployee(employeeId, data), //zustand
            onError: (error) => toast.error(error.message)
        })
 
    };


    if (isLoading ) return <LoadingCircle />;
    if (isError) return <div className='p-4 text-red-500'>Error: {error.message || 'Something went wrong'}</div>;

    return (
        <div className='employees'>

            <div>
                <AddEmployeeDrawer showAlert={showAlert}/>

                {!!alertMessage && <Alert>Employee <strong>{alertMessage}</strong> has been added successfully</Alert> }


                {/* desktop size */}
                <div className={styles.tableDesktopWrapper}>

                    <UiEmployeesTable
                        employees={employees}
                        onUpdateEmployee={onUpdateEmployee}
                        onDeleteEmployee={onDeleteEmployee}
                        isDeleting={deleteEmployeeMutation.isPending}
                    />

                </div>

                {/* card view for mobile size */}
                <div className='block space-y-4 md:hidden'>

                    {employees.map(emp => <EmployeeCard key={emp.id} employee={emp}/>)}

                </div>


            </div>

        </div>
    )
}

export default Employees;