import { Alert } from '@mui/material';
import { toast } from 'react-toastify';

//store
import { useEmployees, removeEmployee, modifyEmployee } from '../../shared/stores/employeesStore';
//hooks
import { useDeleteMutation } from '../../shared/hooks/useDeleteMutation';
import { useUpdateEmployee } from './hooks/useUpdateEmployee';
import { useAutoDismissAlert } from './hooks/useAutoDismissAlert';

import { Employee } from '../../shared/types';
import { employeesService } from '../../shared/services/employeesService';

import EmployeeCard from './components/employeeCard/EmployeeCard';
import UiEmployeesTable from './components/uiEmployeesTable/UiEmployeesTable';
import AddEmployeeDrawer from './components/addEmployeeDrawer/AddEmployeeDrawer';

import styles from './employees.module.css';


const Employees = () => {


    //store
    const employees = useEmployees();

    const deleteEmployeeMutation = useDeleteMutation({
        mutationFn: employeesService.deleteEmployeeFromFirestore,
        queryKey: ['employees']
    });
    const updateEmployeeMutation = useUpdateEmployee()

    const { showAlert, alertMessage } = useAutoDismissAlert();
    

    const onDeleteEmployee = (employeeId: string) => {

        deleteEmployeeMutation.mutate(employeeId, {
            onSuccess: () => {
                removeEmployee(employeeId); //zustand
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    };

    const onUpdateEmployee = (employeeId: string, data: Partial<Employee>) => {

        updateEmployeeMutation.mutate({data, employeeId}, {
            onSuccess: () => modifyEmployee(employeeId, data), //zustand
            onError: (error) => toast.error(error.message)
        })
 
    };

    return (
        <div className='employees'>
            
            <AddEmployeeDrawer showAlert={showAlert}/>

            {!!alertMessage && <Alert>Employee <strong>{alertMessage}</strong> has been added successfully</Alert> }

            {employees.length <= 0 && <span>Add new employee</span>}

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
    )
}

export default Employees;