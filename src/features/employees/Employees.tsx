import { Alert } from '@mui/material';
import { toast } from 'react-toastify';

//store
import {
    useEmployees,
    removeEmployee,
    modifyEmployee,
} from '../../shared/stores/employeesStore';
//hooks
import { useDeleteMutation } from '../../shared/hooks/useDeleteMutation';
import { useUpdateEmployee } from './hooks/useUpdateEmployee';
import { useAutoDismissAlert } from './hooks/useAutoDismissAlert';

//types
import { Employee } from '../../shared/types';

//services
import { employeesService } from '../../shared/services/employeesService';

//components
import EmployeeCard from './components/EmployeeCard';
import UiEmployeesTable from './components/UiEmployeesTable';
import AddEmployeeDrawer from './components/AddEmployeeDrawer';


const Employees = () => {
    //store
    const employees = useEmployees();

    const deleteEmployeeMutation = useDeleteMutation({
        mutationFn: employeesService.deleteEmployeeFromFirestore,
        queryKey: ['employees'],
    });
    const updateEmployeeMutation = useUpdateEmployee();

    const { showAlert, alertMessage } = useAutoDismissAlert();

    const handleDeleteEmployee = (employeeId: string) => {
        deleteEmployeeMutation.mutate(employeeId, {
            onSuccess: () => {
                removeEmployee(employeeId); //zustand
            },
            onError: error => {
                toast.error(error.message);
            },
        });
    };

    const handleUpdateEmployee = (
        employeeId: string,
        data: Partial<Employee>,
    ) => {
        updateEmployeeMutation.mutate(
            { data, employeeId },
            {
                onSuccess: () => modifyEmployee(employeeId, data), //zustand
                onError: error => toast.error(error.message),
            },
        );
    };

    const renderEmptyState = () => (
        <div className='flex flex-col items-center justify-center mt-4 p-12 text-center text-inactive  rounded-lg border-1 border-dashed border-inactive select-none'>
            <span>No employees found. Add your first employee!</span>
        </div>
    );

    const renderSuccessAlert = () => {
        if (!alertMessage) return null;

        return (
            <Alert>
                Employee <strong>{alertMessage}</strong> has been added
                successfully
            </Alert>
        );
    };
    return (
        <div className='employees'>
            <AddEmployeeDrawer showAlert={showAlert} />

            {renderSuccessAlert()}

            {employees.length === 0 ? (
                renderEmptyState()
            ) : (
                <>
                    {/* desktop size */}
                    <div className='mt-5 shadow-md overflow-x-auto rounded-lg inset-shadow-2xs hidden md:block'>
                        <UiEmployeesTable
                            employees={employees}
                            onUpdateEmployee={handleUpdateEmployee}
                            onDeleteEmployee={handleDeleteEmployee}
                            isPending={
                                deleteEmployeeMutation.isPending ||
                                updateEmployeeMutation.isPending
                            }
                        />
                    </div>

                    {/* card view for mobile size */}
                    <div className='block space-y-4 md:hidden'>
                        {employees.map(emp => (
                            <EmployeeCard 
                                key={emp.id} 
                                employee={emp} 
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Employees;
