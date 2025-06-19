import {RefObject} from 'react';
import { Controller, FieldErrors, UseFormRegister, Control } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';


//MUI
import {
    TableCell,
    TableRow,
    Box,
    TextField,
    MenuItem,
    Button
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

//icons
import { FaAngleUp } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';

//types
import { Employee } from '../../../../shared/types';
import { EmployeeFormData } from '../../types';

//store
import { openTab } from '../../../../shared/stores/tabsStore';

//constants
import { DATE_FORMAT } from '../../../../shared/constants/dateFormat';
import { EMPLOYEE_STATUSES } from '../../../../shared/constants/employeeStatuses';
import { employeesTableInputSx } from '../../constants/styles';
import { employeesTableDatePickerSx } from '../../constants/styles';
import { TABLE_COLUMNS } from '../../constants/tableColumns';

import { getEmployeeStatusColor } from '../../../../shared/utils/getEmployeeStatusColor';
import { formatDate } from '../../../../shared/utils/formatDate';


import ActionMenu from '../actionMenu/ActionMenu';
import CollapsibleRow from '../collapsibleRow/CollapsibleRow';

interface EmployeeRowProps {
    employee: Employee,
    isExpanded: boolean,
    isActioned: boolean,
    isEditing: boolean,
    isDeleting?: boolean,
    onToggleCollapse: (id: string) => void,
    onToggleActions: (id: string) => void,
    onEdit: (id: string) => void,
    onDeleteEmployee: (id: string) => void,
    errors: FieldErrors<EmployeeFormData>,
    control: Control<EmployeeFormData, any>
    register: UseFormRegister<EmployeeFormData>,
    onSubmit: () => void,
    actionMenuRef: RefObject<HTMLDivElement>,

};



const EmployeeRow = ({
    employee, 
    isExpanded, 
    isActioned, 
    isEditing, 
    isDeleting,
    onToggleCollapse, 
    onToggleActions,
    onEdit,
    onDeleteEmployee,
    errors, 
    control, 
    register, 
    onSubmit,
    actionMenuRef,

} : EmployeeRowProps) => {

    return (
        <>
            <TableRow 
                sx={{ '& > *': { borderBottom: 'unset' } }} 
                className='hover:bg-gray-50'
            >
                {isEditing? (
                    <>
                        <TableCell>
                            <TextField
                                {...register('name', {required: true})}
                                helperText={errors.name && errors.name.message} 
                                error={!!errors.name}
                                type='text' 
                                name='name'
                                size='small'
                                sx={employeesTableInputSx }
                            />
                        </TableCell>
                        
                        <TableCell>

                            <TextField
                                {...register('position', {required: true})}
                                type='text' 
                                name='position'
                                size='small'
                                helperText={errors.position && errors.position.message} 
                                error={!!errors.position}
                                sx={employeesTableInputSx }

                            />
                            
                        </TableCell>

                        <TableCell>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller 
                                    name='startDate'
                                    control={control}
                                    rules={{required: true}}
                                    render={({field}) =>  (
                                        
                                        //MUI DatePicker = Dayjs, RHF = date. поэтому onChange + value (для обработки даты)
                                        <DatePicker
                                            {...field}
                                            onChange={(date: Dayjs | null) => field.onChange(date ? date.toDate() : null)} // Dayjs -> Date
                                            value={field.value ? dayjs(field.value) : null} // Date -> Dayjs
                                            format={DATE_FORMAT}
                                            slotProps={{
                                                textField: {
                                                    size: 'small', 
                                                    error: !!errors.startDate,
                                                    helperText: errors.startDate && errors.startDate.message,
                                                    sx: employeesTableDatePickerSx 
                                                },

                                            }}  
                                            
                                        />

                                    )}

                                />

                            </LocalizationProvider>
                            
                        </TableCell>

                        <TableCell>
                            
                            <Controller
                                name='status'
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (

                                    <TextField 
                                        {...field}
                                        select
                                        helperText={errors.status && errors.status.message}
                                        error={!!errors.status}
                                        sx={employeesTableInputSx }
                                    >
                                        
                                        {Object.values(EMPLOYEE_STATUSES).map(status => (
                                            <MenuItem
                                                key={status}
                                                value={status}
                                                sx={{fontSize: '14px'}}
                                            >
                                                {status}
                                            </MenuItem>
                                        ))}
                                            
                                    </TextField>

                                )}
                            />



                        </TableCell>

                        <TableCell align='center'>

                            <Button 
                                type='button' 
                                onClick={onSubmit}
                                variant='contained' 
                                color='success' 
                                size='small'
                                aria-label='save changes'
                                title='Save changes'
                                sx={{padding: '6 28px', textTransform:'none'}}
                                >
                                    Save
                            </Button>
                            

                        </TableCell>

                    </>
                ) : (
                    <>

                        <TableCell 
                            onClick={() => openTab(employee)}
                            sx={{cursor: 'pointer'}}
                            >
                                {employee.name}
                        </TableCell>

                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{formatDate((employee.startDate))}</TableCell>

                        <TableCell sx={{width: 120}}>
                            <div className={`${getEmployeeStatusColor(employee.status)} text-center  font-semibold rounded-xl p-1 text-xs`}>
                                {employee.status}
                            </div>
                        </TableCell>

                        <TableCell className='relative'>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>

                                <button 
                                    type='button'
                                    onClick={() => onToggleCollapse(employee.id)} 
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
                                        onToggleActions(employee.id);
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
                                    employeeId={employee.id} 
                                    onEdit={onEdit}
                                    isDeleting={isDeleting}
                                    onDeleteEmployee={onDeleteEmployee} 
                                    ref={actionMenuRef}
                                />
                            )}

                        </TableCell>

                    </>  
                )}



            </TableRow>

            {/* Выпадающая часть */}
            {/* открывается когда редактирование или просто нажатие на стрелку вниз*/}
            <CollapsibleRow 
                employee={employee} 
                isRowExpanded={isExpanded || isEditing} 
                isEmployeeEditing={isEditing} 
                colSpanCount={TABLE_COLUMNS.length} 
                errors={errors}
                register={register}
            />

        </>
    )

};

export default EmployeeRow; 



