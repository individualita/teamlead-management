import Table from '../../../../shared/components/layouts/table/Table';

import { useEmployeeStore } from '../../../../shared/stores/employeesStore';

const EmployeesTable = () => {
    

    const {employees, deleteEmployee} = useEmployeeStore();

    /* const employeeTableColumns = [... new Set(EMPLOYEES.flatMap(item => Object.keys(item)))];*/
    const employeeTableColumns = employees.length? Object.keys(employees[0]).filter(item => item!== '_id'): [];

    return (
        <Table columns={employeeTableColumns} data={employees} onDelete={deleteEmployee}/>
    )

}

export default EmployeesTable;