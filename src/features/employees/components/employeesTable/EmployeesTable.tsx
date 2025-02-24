
import { useState, useMemo } from 'react';

import { useEmployeeStore } from '../../../../shared/stores/employeesStore';

import Table from '../../../../shared/components/layouts/table/Table';

import TablePagination from '../../../../shared/components/layouts/tablePagination/TablePagination';



const EmployeesTable = () => {
    
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);

    //get employees from global state.
    const {employees, deleteEmployee} = useEmployeeStore();

    const totalRows = employees.length;

    /* const employeeTableColumns = [... new Set(EMPLOYEES.flatMap(item => Object.keys(item)))];*/

    //calculate table columns excluding the id field. 
    const employeeTableColumns = useMemo(() => {
        return employees.length? Object.keys(employees[0]).filter(item => item!== '_id'): [];
    }, [employees]);


    let startIndex = (currentPage - 1) * rowsPerPage; 
    let endIndex = Math.min((currentPage * rowsPerPage), totalRows);// не выходим за пределы totalRows

    const isFirstPage = currentPage === 1;
    const isLastPage = endIndex >= totalRows; 

    const displayedEmployees = employees.slice(startIndex, endIndex); 

    
    const handleNextPage = () => {
        if(isLastPage) return; 
        setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if(isFirstPage) return;
        setCurrentPage(prev => prev -1);

    };

    const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };
    
    return (
        <>
            <Table 
                columns={employeeTableColumns} 
                data={displayedEmployees} 
                onDelete={deleteEmployee}
            />

            <TablePagination 
                onNext={handleNextPage} 
                onPrev={handlePrevPage}
                rowsPerPageOptions={[5, 10]}
                rowsPerPage={rowsPerPage}
                onRowsChange={handleRowsChange}
                totalRows={totalRows}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
                endIndex={endIndex}
                startIndex={startIndex}
            />

        </>
    )

}

export default EmployeesTable;