import  { Fragment, useState, useMemo } from 'react';
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
    Tab
} from '@mui/material';

import { ChangeEvent } from 'react';

import { FaAngleUp } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';
import { IoTrash } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

import { getStatusColor } from '../utils/getStatusColor';
import { EMPLOYEE_STATUS_OPTIONS } from '../constants/employeeStatusOptions';



import { useEmployeeStore } from '../../../shared/stores/employeesStore';
import { Employee } from '../../../shared/types/employee';
import CollapsibleRow from './CollapsibleRow';

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

const TableUiTest = () => {

    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(0);

    // Состояние для хранения ID (string | null) раскрытой строки
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    const [expandedActionId, setExpandedActionId] = useState<string | null>(null);


    
    const [editedId, setEditedId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState<string >('');
    const [editedPosition, setEditedPosition] = useState<string>('');
    const [editedPhone, setEditedPhone] = useState<string>('');
    const [editedEmail, setEditedEmail] = useState<string>('');
    const [editedDate, setEditedDate] = useState<string >('');
    const [editedStatus, setEditedStatus] = useState<string>('');

    const {employees, deleteEmployee, updateEmployee} = useEmployeeStore();
    
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
        const endIndex = (currentPage +1) * rowsPerPage; 

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

        setEditedName(currentEmployee?.name || '');
        setEditedPosition(currentEmployee?.position || '');
        setEditedPhone(currentEmployee?.phone || '');
        setEditedEmail(currentEmployee?.email || '');
        setEditedDate(currentEmployee?.startDate || '');
        setEditedStatus(currentEmployee?.status || '');
        

    }

    // при сохранении изменений обновляем сотрудника в сторе

    const handleUpdateEmployee = () => {

        if (!editedId) return;

        //установить данные в инпуте?

        const updatedData = {
            name: editedName,
            position: editedPosition,
            phone: editedPhone,
            startDate: editedDate,
            email: editedEmail,
            status: editedStatus,
        };


        updateEmployee(editedId , updatedData);

        //закрываем окна. 
        setExpandedRowId(null);
        setExpandedActionId(null);
        setEditedId(null);

        //чистим стейты
        setEditedName('');
        setEditedPosition('');
        setEditedPhone('');
        setEditedEmail('');
        setEditedDate('');
        setEditedStatus('');
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        switch (name) {
            case 'name':
                setEditedName(value);
                break;
            case 'position':
                setEditedPosition(value);
                break;
            case 'date':
                setEditedDate(value);
                break;
            case 'email':
                setEditedEmail(value);
                break;
            case 'phone':
                setEditedPhone(value);
                break;
        }
    };



    //сделать функцию вместо слайс тут енаписать нормальных емплои
    return (
        <div className='tableTest mt-5'>


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
                                                            onChange={handleInputChange}  
                                                            value={editedName} 
                                                        />
                                                    </TableCell>
                                                    
                                                    <TableCell>
                                                        <input 
                                                            type='text' 
                                                            name='position' 
                                                            value={editedPosition}
                                                            onChange={handleInputChange} 
    
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        <input 
                                                            type="date" 
                                                            name='date' 
                                                            value={editedDate}
                                                            onChange={handleInputChange} 
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        <select
                                                            name='status' 
                                                            onChange={(e) => setEditedStatus(e.target.value)} 
                                                            value={editedStatus}
                                                            >
                                                                {EMPLOYEE_STATUS_OPTIONS.map(status => (
                                                                    <option value={status}>{status}</option>
                                                                ))}
                                                        </select> 

                                                    </TableCell>

                                                    <TableCell>
                                                        <button onClick={handleUpdateEmployee} className='p-2 bg-indigo-600 text-white rounded-md cursor-pointer'>save changes</button>
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
                                                                onClick={() => handleToggleRowCollapse(emp._id)} 
                                                                className='text-xl cursor-pointer'
                                                            >
                                                                {isExpanded ?   <FaAngleUp/> : <FaAngleDown />}
                                                            </button>

                                                            
                                                            <button onClick={() => handleToggleActionMenu(emp._id)} className='text-xl cursor-pointer'><HiDotsVertical /></button>


                                                        </Box>

                                                        {isActioned && (
                                                            <article className='absolute -left-22 top-3 w-35 bg-white shadow-sm rounded-md inset-shadow-sm z-10 px-1 flex flex-col '>
                                                                
                                                                <button onClick={() => handleEditEmployee(emp._id)} className='flex gap-4 items-center py-2 hover:bg-gray-100 rounded-md cursor-pointer'><FaPencil className='text-lg'/> <span>Edit</span></button>
                                                                <button onClick={()=> deleteEmployee(emp._id)} className='flex gap-4 items-center py-2 text-red-600 hover:bg-gray-100 rounded-md cursor-pointer'><IoTrash className='text-lg' /> <span>Delete</span></button>
                                                            </article>
                                                        )}

                                                    </TableCell>

                                                </>  
                                            )}



                                        </TableRow>

                                        {/* Выпадающая часть */}
                                        {/* открывается когда редактирование или просто нажатие на стрелку вниз*/}
                                        <CollapsibleRow employee={emp} isOpen={isExpanded || isEditing} isEditing={isEditing} colSpanCount={TABLE_COLUMNS.length} editedEmail={editedEmail} editedPhone={editedPhone} handleInputChange={ handleInputChange}/>
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


