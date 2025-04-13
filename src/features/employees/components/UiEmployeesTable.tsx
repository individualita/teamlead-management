import  { useState,  useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


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

//store
import { useEmployeeStore } from '../../../shared/stores/employeesStore';

//schema & types
import { employeeSchema } from '../schema/employee.schema';
import { Employee } from '../../../shared/types/employee';
import { EmployeeFormData } from '../types/employeeFormData';

//constants
import { TABLE_COLUMNS } from '../constants/tableColumns';
import { EMPLOYEE_STATUSES } from '../../../shared/constants/employeeStatuses';

//components
import TableHeader from './TableHeader';
import EmployeeRow from './EmployeeRow';

//Hooks
import usePagination from '../hooks/usePagination';


const UiEmployeesTable = () => {
    //1. Состояния и рефы

    // Состояние для хранения ID (string | null) раскрытой строки
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
    const [expandedActionId, setExpandedActionId] = useState<string | null>(null);
    const [editedId, setEditedId] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    //2. data and hooks
    const {employees, updateEmployee} = useEmployeeStore();

    const {
        paginatedItems : paginatedEmployees, 
        rowsPerPage,
         currentPage, 
         handleChangePage, 
         handleChangeRowsPerPage 
    } = usePagination({items: employees});


    const { register, handleSubmit, reset, control, formState: {errors}} = useForm<EmployeeFormData>({
        mode: 'onChange',
        resolver: zodResolver(employeeSchema),
    });


    //3. event handlers
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

        //or setValue()
        reset({
            name: currentEmployee.name,
            position: currentEmployee.position,
            phone: currentEmployee.phone,
            email: currentEmployee.email,
            startDate: currentEmployee.startDate || new Date(),
            status: currentEmployee.status,
        });
        
    }

    const onSubmit: SubmitHandler<EmployeeFormData> = (data) => {

        if (!editedId) return;

        updateEmployee(editedId, data);
        //закрываем окна. 
        setExpandedRowId(null);
        setExpandedActionId(null);
        setEditedId(null);


        //с reset() не сбросится, поэтому указываем явно
        reset({
            name: '',
            position: '',
            phone: '',
            email: '',
            startDate: new Date(),
            status: EMPLOYEE_STATUSES.ACTIVE,
        });

    };
    

    //4. Effects
    useEffect(() => {

        const handleClickOutside = (e: MouseEvent) => {
            
            if (expandedActionId !== null && ref.current && !ref.current.contains(e.target as Node)) {
                setExpandedActionId(null);
            }
    
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);

    }, [ expandedActionId]);



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

                        {paginatedEmployees.map((emp: Employee) =>  (
                            <EmployeeRow
                                key={emp._id}
                                employee={emp}
                                isExpanded={expandedRowId === emp._id} 
                                isActioned={expandedActionId === emp._id}
                                isEditing={editedId === emp._id}
                                onToggleCollapse={handleToggleRowCollapse}
                                onToggleActions={handleToggleActionMenu}
                                onEdit={handleEditEmployee}
                                errors={errors}
                                control={control}
                                register={register}
                                onSubmit={handleSubmit(onSubmit)}
                                actionMenuRef={ref}
                            />
                        ))}

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


