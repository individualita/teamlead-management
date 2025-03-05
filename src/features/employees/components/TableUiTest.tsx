import  { Fragment, useState, useMemo, useEffect, useRef } from 'react';
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
    IconButton,
    Tab,
    getListItemSecondaryActionClassesUtilityClass
} from '@mui/material';

import { ChangeEvent } from 'react';

import { FaAngleUp } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';


import { getStatusColor } from '../utils/getStatusColor';
import { TABLE_COLUMNS } from '../constants/tableColumns';
import { EMPLOYEE_STATUS_OPTIONS } from '../constants/employeeStatusOptions';



import { useEmployeeStore } from '../../../shared/stores/employeesStore';
import { Employee } from '../../../shared/types/employee';
import CollapsibleRow from './CollapsibleRow';

import ActionMenu from './actionMenu/ActionMenu';

import { EditFormType } from './types/editForm';

const TableUiTest = () => {
    const ref = useRef<HTMLDivElement>(null);

    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(0);

    // Состояние для хранения ID (string | null) раскрытой строки
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    const [expandedActionId, setExpandedActionId] = useState<string | null>(null);


    
    const [editedId, setEditedId] = useState<string | null>(null);
    
    const [editForm, setEditForm] = useState<EditFormType>({
        name: '',
        position: '',
        phone: '',
        email: '',
        startDate: '',
        status: '',
    });

    const {employees, deleteEmployee, updateEmployee} = useEmployeeStore();
    
    useEffect(() => {


        const handleCLickOutside = (e: MouseEvent) => {
            /*
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setExpandedActionId(null);
            }
            */
            
            if (expandedActionId !== null && ref.current && !ref.current.contains(e.target as Node)) {
                setExpandedActionId(null);
            }
            
        }

        document.addEventListener('click', handleCLickOutside);

        return () => document.removeEventListener('click', handleCLickOutside);

    }, [ref.current, expandedActionId]);

    //pagination
    const handleChangePage = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage(0);
    };

    const paginatedEmployees = useMemo(() => {
        const startIndex = currentPage * rowsPerPage;
        const endIndex = (currentPage + 1) * rowsPerPage; 

        return employees.slice(startIndex, endIndex);

    }, [currentPage, rowsPerPage, employees]);


    // Разворачивает/сворачивает строку таблицы (стрелка)
    const handleToggleRowCollapse = (id: string) => {
        setExpandedRowId(prev => (prev === id ? null : id)); // Открывает только одну строку, закрывает предыдущую
    };

    // доп окно на 3 точки
    const handleToggleActionMenu = (id: string) => {
        setExpandedActionId(prev => (prev === id? null : id));
    };

    // при клике на Edit заполняем стейт редактирования
    const handleEditEmployee = (id: string) => {
        setEditedId(prev => (prev === id? null : id));

        const currentEmployee = employees.find(emp => emp._id === id);

        if (!currentEmployee) return;

        setEditForm({
            name: currentEmployee.name,
            position: currentEmployee.position,
            phone: currentEmployee.phone,
            email: currentEmployee.email,
            startDate: currentEmployee.startDate,
            status: currentEmployee.status,
        });

    }

    // при сохранении изменений обновляем сотрудника в сторе

    const handleUpdateEmployee = () => {

        if (!editedId) return;

        //установить данные в инпуте?

        const updatedData = {
            name: editForm.name,
            position: editForm.position,
            phone: editForm.phone,
            email: editForm.email,
            startDate: editForm.startDate,
            status: editForm.status,
        };


        updateEmployee(editedId , updatedData);

        //закрываем окна. 
        setExpandedRowId(null);
        setExpandedActionId(null);
        setEditedId(null);

        //чистим стейты
        setEditForm({
            name: '',
            position: '',
            phone: '',
            email: '',
            startDate: '',
            status: '',
        })
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        setEditForm(prev => ({
            ...prev, 
            [name]: value,
        }));

    };



    //сделать функцию вместо слайс тут енаписать нормальных емплои
    return (
        <div className='tableTest mt-5'>

            <h1>expandedActionId: {expandedActionId}</h1>
            <TableContainer 
                sx={{
                    borderRadius: 3,
                }}
                component={Paper}
                > 

                <Table>
                    <TableHead  
                        sx={{
                            '& th:first-of-type': { borderTopLeftRadius: 8 },
                            '& th:last-of-type': { borderTopRightRadius: 8 },
                            backgroundColor: '#f5f5f5', 
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
                        {paginatedEmployees.map((emp: Employee) =>  {

                                //открываем когда редактируем или когда нажимаем на стрелку вниз. 
                                const isExpanded = expandedRowId === emp._id;
                                const isActioned = expandedActionId === emp._id;

                                const isEditing = editedId === emp._id;

                                return (
                                    <Fragment key={emp._id}>
                                        
                                        <TableRow 
                                            sx={{ '& > *': { borderBottom: 'unset' } }} 
                                            className='hover:bg-gray-100'
                                        >
                                            {isEditing? (
                                                <>
                                                    <TableCell>
                                                        <input 
                                                            type='text'
                                                            name='name' 
                                                            onChange={handleChange}  
                                                            value={editForm.name} 
                                                        />
                                                    </TableCell>
                                                    
                                                    <TableCell>
                                                        <input 
                                                            type='text' 
                                                            name='position' 
                                                            value={editForm.position}
                                                            onChange={handleChange} 
    
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        <input 
                                                            type='date' 
                                                            name='date' 
                                                            value={editForm.startDate}
                                                            onChange={handleChange} 
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        <select
                                                            name='status' 
                                                            onChange={handleChange} 
                                                            value={editForm.status}
                                                            >
                                                                {EMPLOYEE_STATUS_OPTIONS.map(status => (
                                                                    <option value={status}>{status}</option>
                                                                ))}
                                                        </select> 

                                                    </TableCell>

                                                    <TableCell>
                                                        <button 
                                                            type='button'
                                                            onClick={handleUpdateEmployee} 
                                                            className='p-2 bg-indigo-600 text-white rounded-md cursor-pointer'
                                                            aria-label='save changes'
                                                            title='save changes'
                                                        >
                                                            save changes
                                                        </button>

                                                    </TableCell>

                                                </>
                                            ) : (
                                                <>
                                                    <TableCell>{emp.name}</TableCell>
                                                    <TableCell>{emp.position}</TableCell>
                                                    <TableCell>{emp.startDate}</TableCell>

                                                    <TableCell sx={{width: 120}}>
                                                        <div className={`${getStatusColor(emp.status)} text-center  font-semibold rounded-xl p-1 text-xs`}>
                                                            {emp.status}
                                                        </div>
                                                    </TableCell>

                                                    <TableCell className='relative'>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>

                                                            <button 
                                                                type='button'
                                                                onClick={() => handleToggleRowCollapse(emp._id)} 
                                                                className='text-xl cursor-pointer'
                                                                aria-expanded={isExpanded} 
                                                                aria-label={isExpanded ? "Collapse row" : "Expand row"}
                                                                title={isExpanded ? "Collapse row" : "Expand row"}
                                                            >
                                                                {isExpanded ?   <FaAngleUp/> : <FaAngleDown />}
                                                            </button>

                                                            
                                                            <button 
                                                                type='button'
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleToggleActionMenu(emp._id);
                                                                } } 
                                                                className='text-xl cursor-pointer'
                                                                aria-haspopup='true'
                                                                aria-label='Open action menu'
                                                                title='Open action menu'
                                                                >
                                                                    <HiDotsVertical />
                                                            </button>

                                                        </Box>

                                                        {isActioned && (
                                                            <ActionMenu 
                                                                employeeId={emp._id} 
                                                                handleEditEmployee={handleEditEmployee} 
                                                                deleteEmployee={deleteEmployee} 
                                                                ref={ref}
                                                            />
                                                        )}

                                                    </TableCell>

                                                </>  
                                            )}



                                        </TableRow>

                                        {/* Выпадающая часть */}
                                        {/* открывается когда редактирование или просто нажатие на стрелку вниз*/}
                                        <CollapsibleRow 
                                            employee={emp} 
                                            isOpen={isExpanded || isEditing} 
                                            isEditing={isEditing} 
                                            colSpanCount={TABLE_COLUMNS.length} 
                                            formData={editForm} 
                                            handleChange={ handleChange}
                                        />

                                    </Fragment>
                                )

                            })
                        }
                    </TableBody>

                    {/* Футер таблицы с пагинацией */}
                    <TableFooter>
                        <TableRow>

                            <TableCell colSpan={TABLE_COLUMNS.length} sx={{ padding: '1px'}}>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, { value: -1, label: 'All' }]}
                                    count={employees.length}
                                    rowsPerPage={rowsPerPage}
                                    page={currentPage}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    sx={{  display: 'flex', justifyContent: 'right', borderBottom: 'none'}}

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


