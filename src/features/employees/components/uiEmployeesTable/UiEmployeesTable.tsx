import  { Fragment, useState, useMemo, useEffect, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Box,
    Paper,
    TextField,
    MenuItem,
} from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { employeeSchema } from '../../schema/employee.schema';

import { useForm, SubmitHandler, Controller } from 'react-hook-form'


import { ChangeEvent } from 'react';

import { FaAngleUp } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';

import { formatDate } from '../../utils/formatDate';
import { getStatusColor } from '../../utils/getStatusColor';
import { TABLE_COLUMNS } from '../../constants/tableColumns';
import { EMPLOYEE_STATUS_OPTIONS } from '../../constants/employeeStatusOptions';


import { useEmployeeStore } from '../../../../shared/stores/employeesStore';
import { Employee } from '../../../../shared/types/employee';
import CollapsibleRow from '../collapsibleRow/CollapsibleRow';

import TableHeader from '../tableHeader/TableHeader';

import ActionMenu from '../actionMenu/ActionMenu';

import { zodResolver } from '@hookform/resolvers/zod';

import { commonInputSx } from '../../constants/commonInputSx';
import { commonDatePickerSx } from '../../constants/commonDatePickerSx';

import { EmployeeFormData } from '../../types/employeeFormData';
import styles from './../../employees.module.css';
import { NewEmployeeFormData } from '../../types/newEmployeeFormData';


const UiEmployeesTable = () => {
    const ref = useRef<HTMLDivElement>(null);

    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(0);

    // Состояние для хранения ID (string | null) раскрытой строки
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    const [expandedActionId, setExpandedActionId] = useState<string | null>(null);


    
    const [editedId, setEditedId] = useState<string | null>(null);
    
    const [editForm, setEditForm] = useState<EmployeeFormData>({
        name: '',
        position: '',
        phone: '',
        email: '',
        startDate: null,
        status: '',
    });

    const {employees, deleteEmployee, updateEmployee} = useEmployeeStore();

    const { watch, register, getValues,setValue,  handleSubmit, control, formState: {errors, isDirty}} = useForm<NewEmployeeFormData>({
        mode: 'onChange',
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: editForm.name,
            position: editForm.position,
            startDate: editForm.startDate? editForm.startDate : new Date(),
            status: editForm.status,
            email: editForm.email,
            phone: editForm.phone
        }

    });

    console.log(watch());
    console.log(errors);
    console.log('editFOrm: ',editForm)


    //as stirng??? //handleUPDATEEMPLOYEE(BYLE)
    const onSubmit: SubmitHandler<NewEmployeeFormData> = (data) => {

        if (!editedId) return;

        updateEmployee(editedId, data);
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
                    startDate: null,
                    status: '',
                })
    };


    useEffect(() => {


        const handleCLickOutside = (e: MouseEvent) => {
            
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

        if(rowsPerPage === -1) return employees;

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

        setValue('name', currentEmployee.name);
        setValue('position', currentEmployee.position);
        setValue('phone', currentEmployee.phone);
        setValue('email', currentEmployee.email);
        setValue('startDate', currentEmployee.startDate? currentEmployee.startDate : new Date());
        setValue('status', currentEmployee.status);
        


        
        setEditForm({
            name: currentEmployee.name,
            position: currentEmployee.position,
            phone: currentEmployee.phone,
            email: currentEmployee.email,
            startDate: currentEmployee.startDate,
            status: currentEmployee.status,
        });

    }



    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        setEditForm(prev => ({
            ...prev, 
            [name]: value,
        }));

    };


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
                        {paginatedEmployees.map((emp: Employee) =>  {

                                //открываем когда редактируем или когда нажимаем на стрелку вниз. 
                                const isExpanded = expandedRowId === emp._id;
                                const isActioned = expandedActionId === emp._id;

                                const isEmployeeEditing = editedId === emp._id;

                                return (
                                    <Fragment key={emp._id}>
                                        
                                        <TableRow 
                                            sx={{ '& > *': { borderBottom: 'unset' } }} 
                                            className='hover:bg-gray-50'
                                        >
                                            {isEmployeeEditing? (
                                                <>
                                                    <TableCell>
                                                        <TextField
                                                            {...register('name', {required: true})}
                                                            helperText={errors.name && errors.name.message}
                                                            error={!!errors.name}
                                                            type='text' 
                                                            name='name'
                                                            size='small'
                                                            sx={commonInputSx}

                                                        />
                                                    </TableCell>
                                                    
                                                    <TableCell>

                                                        <TextField
                                                            {...register('position', {required: true})}
                                                            type='text' 
                                                            name='position'
                                                            size='small'
                                                            sx={commonInputSx}

                                                        />
                                                        
                                                    </TableCell>

                                                    <TableCell>

                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                name='startDate'
                                                                format='DD/MM/YYYY'
                                                                slotProps={{
                                                                    textField: {
                                                                        size: 'small', 
                                                                        sx: commonDatePickerSx
                                                                    },
                                                                }}                                                     

                                                            />
                                                        </LocalizationProvider>
                                                        
                                                    </TableCell>

                                                    <TableCell>

                                                        <TextField 
                                                            {...register('status', {required: true})}
                                                            select
                                                            name='status'
                                                            sx={commonInputSx}
                                                        >
                                                            
                                                            {EMPLOYEE_STATUS_OPTIONS.map(status => (
                                                                <MenuItem
                                                                    key={status}
                                                                    value={status}
                                                                    sx={{fontSize: '14px'}}
                                                                >
                                                                    {status}
                                                                </MenuItem>
                                                            ))}
                                                                
                                                        </TextField>

                                                    </TableCell>

                                                    <TableCell>
                                                        <button 
                                                            type='button'
                                                            //onClick={onSubmit} 
                                                            className='py-2 px-4 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-600/90'
                                                            aria-label='save changes'
                                                            title='save changes'
                                                        >
                                                            Save
                                                        </button>

                                                    </TableCell>

                                                </>
                                            ) : (
                                                <>
                                                    <TableCell>{emp.name}</TableCell>
                                                    <TableCell>{emp.position}</TableCell>
                                                    <TableCell>{emp.startDate? dayjs(emp.startDate).format('DD/MM/YYYY') : '-'}</TableCell>

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
                                            isRowExpanded={isExpanded || isEmployeeEditing} 
                                            isEmployeeEditing={isEmployeeEditing} 
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


export default UiEmployeesTable;


