import { UseFormRegister, FieldErrors } from 'react-hook-form';

import {
    TextField,
    TableRow,
    TableCell,
    Collapse,
    Box,
    Table,
    TableBody,
    TableHead
} from '@mui/material';

import { EmployeeFormData } from '../../types/employeeFormData';
import { Employee } from '../../../../shared/types/employee';

import { employeesTableInputSx } from '../../constants/employeesTableInputSx ';
import { COLLAPSIBLE_ROW_COLUMNS } from '../../constants/collapsibleRowColumns';



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

                                    {COLLAPSIBLE_ROW_COLUMNS.map(column => (
                                        <TableCell key={column} sx={{color: '#3e3e3e', fontWeight: '600'}}>{column}</TableCell>

                                    ))}

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow sx={{'& > *':{fontWEight: '400', color: 'var(--text-inactive)'}}}>
                                    {isEmployeeEditing? (
                                        <>
                                            <TableCell >

                                                <TextField 
                                                    {...register('email', {required: true})}
                                                    helperText={errors.email ? errors.email.message : '\u200B'}
                                                    error={!!errors.email}
                                                    type='email'
                                                    name='email'
                                                    sx={employeesTableInputSx}
                                                    slotProps={{
                                                        formHelperText: {
                                                            sx: {
                                                                minHeight: '2em',
                                                                color: 'green',
                                                                margin: 0,
                                                                padding: 0,
                                                            }
                                                        }
                                                    }}
                                                /> 

                                            </TableCell>

                                            <TableCell> 

                                                <TextField
                                                    {...register('phone', {required: true})}
                                                    helperText={errors.phone ? errors.phone.message : '\u200B'}
                                                    error={!!errors.phone}
                                                    type='tel'
                                                    name='phone'
                                                    sx={employeesTableInputSx}
                                                    slotProps={{
                                                        formHelperText: {
                                                            sx: {
                                                                minHeight: '2em',
                                                                color: 'green',
                                                                margin: 0,
                                                                padding: 0,
                                                            }
                                                        }
                                                    }}
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
