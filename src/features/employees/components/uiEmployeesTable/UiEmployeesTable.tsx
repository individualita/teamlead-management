import { useState } from 'react';


//MUI
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
} from '@mui/material';

//schema & types
import { Employee } from '../../../../shared/types';

//Hooks
import usePagination from '../../hooks/usePagination';

//constants
import { TABLE_COLUMNS } from '../../constants/tableColumns';

//components
import TableHeader from '../tableHeader/TableHeader';
import EmployeeRow from '../employeeRow/EmployeeRow';

interface UiEmployeesTableProps {
    employees: Employee[];
    onUpdateEmployee: (id: string, data: Partial<Employee>) => void;
    onDeleteEmployee: (id: string) => void;
    isPending?: boolean;
}

const UiEmployeesTable = ({
    employees,
    onUpdateEmployee,
    onDeleteEmployee,
    isPending,
}: UiEmployeesTableProps) => {
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    const handleToggleRowExpansion = (id: string) => {
        setExpandedRowId(prev => (prev === id ? null : id));
    };

    const {
        paginatedItems: paginatedEmployees,
        rowsPerPage,
        currentPage,
        handleChangePage,
        handleChangeRowsPerPage,
    } = usePagination({ items: employees });

    return (
        <div className='mt-5'>
            <TableContainer
                sx={{
                    borderRadius: 3,
                }}
                component={Paper}
            >
                <Table>
                    <TableHeader />

                    <TableBody>
                        {paginatedEmployees.map((employee: Employee) => (
                            <EmployeeRow
                                key={employee.id}
                                employee={employee}
                                isExpanded={expandedRowId === employee.id}
                                onToggleExpansion={handleToggleRowExpansion}
                                onUpdateEmployee={onUpdateEmployee}
                                onDeleteEmployee={onDeleteEmployee}
                                isPending={isPending}
                            />
                        ))}
                    </TableBody>

                    {/* Футер таблицы с пагинацией */}
                    <TableFooter>
                        <TableRow>
                            <TableCell
                                colSpan={TABLE_COLUMNS.length}
                                sx={{ padding: '1px' }}
                            >
                                <TablePagination
                                    rowsPerPageOptions={[
                                        5,
                                        10,
                                        { value: -1, label: 'All' },
                                    ]}
                                    count={employees.length}
                                    rowsPerPage={rowsPerPage}
                                    page={currentPage}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'right',
                                        borderBottom: 'none',
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UiEmployeesTable;
