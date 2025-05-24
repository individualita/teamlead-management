
import { useState, useMemo } from 'react';

import { useEmployeeStore } from '../../../../shared/stores/employeesStore';

import { usePagination } from '../../../../shared/hooks/usePagination';

import Table from '../../../../shared/components/table/Table';

import TablePagination from '../../../../shared/components/table/TablePagination';



const EmployeesTable = () => {
    
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);

    //get employees from global state.
    const {employees, deleteEmployee} = useEmployeeStore();

    const totalRows = employees.length;

    /* const employeeTableColumns = [... new Set(EMPLOYEES.flatMap(item => Object.keys(item)))];*/

    //calculate table columns excluding the id field. 
    const employeeTableColumns = useMemo(() => {
        return employees.length? Object.keys(employees[0]).filter(item => item!== 'id'): [];
    }, [employees]);


    const {
        displayedData: displayedEmployees, 
        startIndex, 
        endIndex, 
        isFirstPage, 
        isLastPage
    } = usePagination(employees, currentPage, rowsPerPage);



    
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