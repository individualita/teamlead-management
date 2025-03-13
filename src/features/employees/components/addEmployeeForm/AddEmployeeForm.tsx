import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import { formInputSx } from '../../constants/formInputSx';

import { Dayjs } from 'dayjs';

import Button from '@mui/material/Button';

import { TextField, MenuItem } from '@mui/material';


import { EditFormType } from '../../types/editForm';

import { EMPLOYEE_STATUS_OPTIONS } from '../../constants/employeeStatusOptions';

import dayjs from 'dayjs';

import { employeeSchema } from '../../schema/employee.schema';
import { zodResolver } from '@hookform/resolvers/zod';


interface AddEmployeeFormProps {
    handleClose: () => void,
}


interface EmployeeFormData {
    name: string,
    position: string,
    startDate: Date,
    status: string,
    email: string,
    phone: string,
}




const AddEmployeeForm = ({handleClose}: AddEmployeeFormProps) => {

    const { watch, register, handleSubmit, control, formState: {errors}} = useForm<EmployeeFormData>({
        mode: 'onChange',
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: '',
            position: '',
            startDate: new Date(),
            status: EMPLOYEE_STATUS_OPTIONS[0],
            email: '',
            phone: '',
        }

    });

    const onSubmit: SubmitHandler<EmployeeFormData> = (data) => console.log(data)
    console.log(errors);

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className='mt-10 flex flex-col gap-4'>

            <TextField
                {...register('name', {required: true})}
                type='text' 
                name='name'
                size='small'
                label='Employee name'
                helperText={errors.name && errors.name.message}
                error={!!errors.name}
                sx={formInputSx}
            />



            <TextField
                {...register('position', {required: true})}
                type='text' 
                name='position'
                size='small'
                label='Position' 
                helperText={errors.position && errors.position.message}
                error={!!errors.position}
                sx={formInputSx}
            />


            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <Controller 
                    name='startDate'
                    control={control}
                    rules={{required: true}}
                    render={({ field }) => (

                        <DatePicker
                            {...field}
                            onChange={(date: Dayjs | null) => field.onChange(date ? date.toDate() : null)} // Dayjs -> Date
                            value={field.value ? dayjs(field.value) : null} // Date -> Dayjs
                            format='DD/MM/YYYY'
                            label='DD/MM/YYY'
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    error: !!errors.startDate,
                                    helperText: errors.startDate?.message, 
                                },
                            }}  
                            
                            sx={formInputSx}
                        />

                    )}
                />

            </LocalizationProvider>



            <TextField
                {...register('status', {required: true})}
                select
                name='status'
                label='Status'
                size='small'
                helperText={errors.status && 'Status is required'}
                error={!!errors.status}
                defaultValue={EMPLOYEE_STATUS_OPTIONS[0]}
                sx={formInputSx}
            >
                <MenuItem value='' disabled sx={{ fontSize: '14px' }}>
                    Choose status
                </MenuItem>
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


            <TextField
                {...register('email',  {required: true})}
                type='email'
                name='email'
                label='Email'
                size='small'
                helperText={errors.email && errors.email.message}
                error={!!errors.email}
                sx={formInputSx}

            />

            <TextField
                {...register('phone', {required: true})}
                type='tel'
                name='phone'
                label='Phone'
                size='small'
                helperText={errors.phone && errors.phone.message}
                error={!!errors.phone}
                sx={formInputSx}
            />


            <div className='flex gap-3 ml-auto'>
                <Button variant='contained' color='success' type='submit' size='small'>Create</Button>

                <Button
                    onClick={handleClose} 
                    variant='text' 
                    color='warning' 
                    type='button' 
                    size='small'>
                        Close
                </Button>

            </div>

        </form>
    )

}


export default AddEmployeeForm;