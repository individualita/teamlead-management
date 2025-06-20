import { FieldErrors, UseFormRegister, Control, Controller } from 'react-hook-form';

//MUI
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs, { Dayjs } from 'dayjs';

//types
import { EmployeeFormData } from '../../types';

//constants
import { DATE_FORMAT } from '../../../../shared/constants/dateFormat';
import { EMPLOYEE_STATUSES } from '../../../../shared/constants/employeeStatuses';
import {
    employeesTableInputSx,
    employeesTableDatePickerSx,
} from '../../constants/styles';

interface EmployeeEditFormProps {
    register: UseFormRegister<EmployeeFormData>;
    control: Control<EmployeeFormData>;
    errors: FieldErrors<EmployeeFormData>;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    isPending?: boolean;
}

const employeeStatusValues = Object.values(EMPLOYEE_STATUSES);

const EmployeeEditForm = ({
    register,
    control,
    errors,
    onSubmit,
    onCancel,
    isPending,
}: EmployeeEditFormProps) => {
    return (
        <Box
            component='form'
            onSubmit={onSubmit}
            sx={{ display: 'flex', gap: 2 }}
        >
            <TextField
                {...register('name', { required: true })}
                helperText={errors.name && errors.name.message}
                error={!!errors.name}
                size='small'
                sx={employeesTableInputSx}
            />
            <TextField
                {...register('position', { required: true })}
                helperText={errors.position && errors.position.message}
                error={!!errors.position}
                size='small'
                sx={employeesTableInputSx}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    name='startDate'
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            onChange={(date: Dayjs | null) =>
                                field.onChange(date ? date.toDate() : null)
                            }
                            value={field.value ? dayjs(field.value) : null}
                            format={DATE_FORMAT}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    error: !!errors.startDate,
                                    helperText:
                                        errors.startDate &&
                                        errors.startDate.message,
                                    sx: employeesTableDatePickerSx,
                                },
                            }}
                        />
                    )}
                />
            </LocalizationProvider>
            <Controller
                name='status'
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        helperText={errors.status && errors.status.message}
                        error={!!errors.status}
                        sx={employeesTableInputSx}
                    >
                        {employeeStatusValues.map(status => (
                            <MenuItem
                                key={status}
                                value={status}
                                sx={{ fontSize: '14px' }}
                            >
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button
                    type='submit'
                    variant='contained'
                    color='success'
                    size='small'
                    aria-label='save changes'
                    title='Save changes'
                    sx={{ textTransform: 'none' }}
                    disabled={isPending}
                >
                    Save
                </Button>
                <Button
                    onClick={onCancel}
                    variant='text'
                    color='warning'
                    type='button'
                    size='small'
                    aria-label='cancel editing'
                    title='cancel editing'
                    sx={{ textTransform: 'none' }}
                    disabled={isPending}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default EmployeeEditForm;
