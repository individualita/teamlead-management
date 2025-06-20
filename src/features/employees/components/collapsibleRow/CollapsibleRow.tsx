import { UseFormRegister, FieldErrors } from 'react-hook-form';

import {
    TextField,
    TableRow,
    TableCell,
    Collapse,
    Box,
} from '@mui/material';

//types
import { EmployeeFormData } from '../../types';
import { Employee } from '../../../../shared/types';

//constants
import { employeesTableInputSx } from '../../constants/styles';
import { COLLAPSIBLE_ROW_COLUMNS } from '../../constants/tableColumns';

interface CollapsibleRowProps {
    employee: Employee;
    isRowExpanded: boolean;
    isEmployeeEditing: boolean;
    colSpanCount: number;
    register: UseFormRegister<EmployeeFormData>;
    errors: FieldErrors<EmployeeFormData>;
}

const CollapsibleRow = ({
    employee,
    isRowExpanded,
    isEmployeeEditing,
    colSpanCount,
    register,
    errors,
}: CollapsibleRowProps) => {
    return (
        <TableRow aria-expanded={isRowExpanded}>
            <TableCell
                colSpan={colSpanCount}
                sx={{ paddingBottom: 0, paddingTop: 0 }}
            >
                <Collapse in={isRowExpanded} timeout='auto' unmountOnExit>
                    <Box
                        sx={{
                            padding: 2,
                            borderRadius: 1,
                            display: 'grid',
                            gap: 2,
                        }}
                    >
                        {/* Заголовки */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                bgcolor: '#f5f5f5',
                                p: 1,
                                borderRadius: 1,
                            }}
                        >
                            {COLLAPSIBLE_ROW_COLUMNS.map(column => (
                                <Box
                                    key={column}
                                    sx={{ fontWeight: 600, color: '#3e3e3e' }}
                                >
                                    {column}
                                </Box>
                            ))}
                        </Box>
                        {/* Данные */}
                        <Box
                            sx={{
                                display: 'grid',
                                gap: '10px',
                                gridTemplateColumns: '1fr 1fr',
                                color: 'var(--text-inactive)',
                            }}
                        >
                            {isEmployeeEditing ? (
                                <>
                                    <TextField
                                        {...register('email', {
                                            required: true,
                                        })}
                                        helperText={
                                            errors.email
                                                ? errors.email.message
                                                : '\u200B'
                                        }
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
                                                },
                                            },
                                        }}
                                    />
                                    <TextField
                                        {...register('phone', {
                                            required: true,
                                        })}
                                        helperText={
                                            errors.phone
                                                ? errors.phone.message
                                                : '\u200B'
                                        }
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
                                                },
                                            },
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Box>{employee.email}</Box>
                                    <Box>{employee.phone}</Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export default CollapsibleRow;
