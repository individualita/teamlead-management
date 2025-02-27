import  { Fragment, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Box,
    Collapse,
    Paper,
    IconButton
} from '@mui/material';

import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

import { useEmployeeStore } from '../../../shared/stores/employeesStore';
import { Employee } from '../../../shared/types/employee';
import CollapsibleRow from './CollapsibleRow';



const TableUiTest = () => {

    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(0);

  // Состояние для хранения ID (string | null) раскрытой строки
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    const handleToggleRow = (id: string) => {
        setExpandedRowId(prev => (prev === id ? null : id)); // Открывает только одну строку, закрывает предыдущую
    };
    const {employees} = useEmployeeStore();


    const handleChangePage = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage(0);
    };

    type AlignOptions = 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;

    interface TableColumn {
        key: string,
        label: string,
        align: AlignOptions
    }

    const TABLE_COLUMNS: TableColumn[] = [
        { key: 'name', label: 'Name', align: 'left' },
        { key: 'position', label: 'Position', align: 'left' },
        { key: 'startDate', label: 'Start Date', align: 'left' },
        { key: 'status', label: 'Status', align: 'center' },
        { key: 'actions', label: 'Actions', align: 'center' }, 
    ];

    console.log(TABLE_COLUMNS.length)

    return (
        <div className='tableTest mt-5'>
            <TableContainer 
                sx={{
                    borderRadius: 3,
                    boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}>

                <Table>
                    <TableHead  
                        sx={{
                            "& th:first-of-type": { borderTopLeftRadius: 8 },
                            "& th:last-of-type": { borderTopRightRadius: 8 },
                            backgroundColor: "#f5f5f5", 
                        }}
                    >

                        <TableRow>

                            {/* columns */}
                            {TABLE_COLUMNS.map(col=> (
                                <TableCell key={col.key} align={col.align}>
                                    {col.label}
                                </TableCell>
                            ))}

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {employees
                            .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                            .map((emp: Employee) =>  {

                                const isExpanded = expandedRowId === emp._id; // Проверяем, является ли эта строка открытой


                                return (
                                    <Fragment key={emp._id}>
                                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className='hover:bg-gray-100'>

                                            <TableCell>{emp.name}</TableCell>
                                            <TableCell>{emp.position}</TableCell>
                                            <TableCell>{emp.startDate}</TableCell>
                                            <TableCell><div className='bg-green-100 text-green-950 text-center rounded-xl p-1 text-xs'>status here</div></TableCell>


                                            <TableCell>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>

                                                    <button onClick={() => handleToggleRow(emp._id)} className='text-xl cursor-pointer'>
                                                        {isExpanded ?   <FaAngleUp/> : <FaAngleDown />}
                                                    </button>

                                                    <button className='text-xl cursor-pointer'><HiDotsVertical /></button>


                                                </Box>

                                            </TableCell>
                                        </TableRow>

                                        {/* Выпадающая часть */}

                                        <CollapsibleRow employee={emp} isOpen={isExpanded} colSpanLength={TABLE_COLUMNS.length}/>
                                    </Fragment>
                                )

                            })
                        }
                    </TableBody>

                    {/* Футер таблицы с пагинацией */}
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={TABLE_COLUMNS.length} sx={{ padding: "1px"}}>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, { value: -1, label: "All" }]}
                                    count={employees.length}
                                    rowsPerPage={rowsPerPage}
                                    page={currentPage}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    sx={{  display: "flex", justifyContent: "right", borderBottom: 'none'}}

                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>

                </Table>

            </TableContainer>

        </div>
    )
}


export default TableUiTest;


