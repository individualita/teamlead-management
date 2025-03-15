import { ChangeEvent } from 'react';
import {
    TextField,
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Box,
    Table,
    TableBody,
    TableHead
} from '@mui/material';

import { commonInputSx } from '../../constants/commonInputSx';



import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { EmployeeFormData } from '../../types/employeeFormData';
import { Employee } from '../../../../shared/types/employee';

import styles from './../../employees.module.css';

interface CollapsibleRowProps {
    employee: Employee,
    isRowExpanded: boolean,
    isEmployeeEditing: boolean,
    colSpanCount: number,
    register: UseFormRegister<EmployeeFormData>,
    errors: FieldErrors<EmployeeFormData>
}

const CollapsibleRow = ({employee, isRowExpanded, isEmployeeEditing, colSpanCount, register, errors}: CollapsibleRowProps) => {

    return (
        <TableRow aria-expanded={isRowExpanded}>
            <TableCell colSpan={colSpanCount} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
                    <Box sx={{padding: 2, borderRadius: 1 }} >

                        <Table size="small">
                            <TableHead sx={{backgroundColor: '#f5f5f5'}}>
                                <TableRow sx={{'& > *': {fontWeight: '500', color:'black'}}}>
                                    <TableCell sx={{color: '#3e3e3e', fontWeight: '600'}}>Email</TableCell>
                                    <TableCell sx={{color: '#3e3e3e', fontWeight: '600'}}>Phone</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow sx={{'& > *':{fontWEight: '400', color: 'var(--text-inactive)'}}}>
                                    {isEmployeeEditing? (
                                        <>
                                            <TableCell >

                                                <TextField 
                                                    {...register('email', {required: true})}
                                                    helperText={errors.email && errors.email.message}
                                                    error={!!errors.email}
                                                    type='email'
                                                    name='email'
                                                    sx={commonInputSx}
                                                /> 

                                            </TableCell>

                                            <TableCell> 

                                                <TextField
                                                    {...register('phone', {required: true})}
                                                    helperText={errors.phone && errors.phone.message}
                                                    error={!!errors.phone}
                                                    type='tel'
                                                    name='phone'
                                                    sx={commonInputSx}
                                                 />
                                            </TableCell>

                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>{employee.phone}</TableCell>
                                        </>

                                    )}

                                </TableRow>
                            </TableBody>

                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )

}

export default CollapsibleRow;
