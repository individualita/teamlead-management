import Table from '../../../../shared/components/layouts/table/Table';

import { useState } from 'react';

import { useEmployeeStore } from '../../../../shared/stores/employeesStore';

const EmployeesTable = () => {
    
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const {employees, deleteEmployee} = useEmployeeStore();

    /* const employeeTableColumns = [... new Set(EMPLOYEES.flatMap(item => Object.keys(item)))];*/
    const employeeTableColumns = employees.length? Object.keys(employees[0]).filter(item => item!== '_id'): [];


    const totalRows = employees.length;


    let startIndex = (currentPage - 1) * rowsPerPage; 
    let endIndex = Math.min((currentPage * rowsPerPage), totalRows);// не выходим за пределы totalRows


    const showEmployeesRow = employees.slice(startIndex, endIndex); 


    const isLastPage = endIndex >= totalRows; 
    const isFirstPage = currentPage === 1;
    
    const goToNextPage = () => {
        if(isLastPage) return; 
        setCurrentPage(prev => prev + 1);

    };

    const goToPrevPage = () => {
        if(isFirstPage) return;
        setCurrentPage(prev => prev -1);

    };

    const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    }
    
    return (
        <>
            <Table 
                columns={employeeTableColumns} 
                data={showEmployeesRow} 
                onDelete={deleteEmployee}
            />

            <div className='pagin flex justify-between bg-blue-50 p-2'>
                <div className='select'>

                    <label htmlFor='rows'>
                        select rows
                        <select name='rows' id='rows' onChange={handleRowsChange}>
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value={totalRows}>all</option>
                        </select>
                    </label>
                    <div>StartIndex: {startIndex} endIndex: {endIndex}</div>
                    <div>rows per page state: {rowsPerPage}</div>
                    <div>current page state: {currentPage}</div>

                </div>
                
                <h3>{startIndex + 1} - {endIndex} of {totalRows}</h3>
                <div className='pages flex gap-5 text-bold text-xl '>
                    <button 
                        onClick={goToPrevPage}
                        disabled={isFirstPage} 
                        className={isFirstPage ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}
                        >
                            {'<'}
                        </button>
                    <button 
                        onClick={goToNextPage}
                        disabled={isLastPage} 
                        className={`${isLastPage? 'text-gray-400 cursor-not-allowed': 'cursor-pointer'}`}
                        >
                            {'>'}
                    </button>
                </div>
            </div>

        </>
    )

}

export default EmployeesTable;