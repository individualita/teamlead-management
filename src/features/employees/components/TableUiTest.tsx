import { useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material';


import { TablePagination } from '@mui/material';


import { useEmployeeStore } from '../../../shared/stores/employeesStore';

import { Employee } from '../../../shared/types/employee';
import CollapsibleRow from './CollapsibleRow';

const TableUiTest = () => {

    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const [isOpen, setIsOpen] = useState(true);


    const {employees} = useEmployeeStore();

    const employeeTableColumns = useMemo(() => {
        return employees.length? Object.keys(employees[0]).filter(item => item!== '_id'): [];
    }, [employees]);



    const handleChangePage = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage(0);
    };

    const handleCollapsibleRow = () => {
        setIsOpen(prev => prev);
    };
    return (
        <div className='tableTest mt-5'>

            <TableContainer>

                <Table>
                    <TableHead>
                        <TableRow>

                            {/* columns */}

                            {/*empty cell */}
                            <TableCell/> 

                            {employeeTableColumns.map(col => (
                                <TableCell key={col}>{col}</TableCell>
                            ))}

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {employees.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map((emp: Employee) => (
                            <>
                                
                                <TableRow key={emp._id}>
                                    <TableCell>
                                        <button onClick={() => setIsOpen(prev => !prev)}>V</button>
                                    </TableCell>

                                    {employeeTableColumns.map(col => (

                                        <TableCell 
                                            key={col}
                                        >
                                            {emp[col as keyof Employee]}
                                        </TableCell>
                                    ))}

                                </TableRow> 
                                <CollapsibleRow employee={emp}/>
                            </>
                        ))}
                    </TableBody>

                </Table>

            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, { value: -1, label: 'All' }]}
                component="div"
                count={employees.length}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </div>
    )
}


export default TableUiTest;


