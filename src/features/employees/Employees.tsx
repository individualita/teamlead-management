


import { useEmployeeStore } from '../../shared/stores/employeesStore';
import EmployeesTable from './components/employeesTable/EmployeesTable';


import EmployeeCard from './components/employeeCard/EmployeeCard';

import UiEmployeesTable from './components/uiEmployeesTable/UiEmployeesTable';

const Employees = () => {

    const {employees} = useEmployeeStore();

    let test = false;

    return (
        <div className='employees'>

            <div className='container mx-auto p-6'>

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