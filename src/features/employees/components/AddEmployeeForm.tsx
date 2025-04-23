import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

//MUI
import { TextField, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';

import { toast } from 'react-toastify';

//hooks
import { useAddEmployee } from '../hooks/useAddEmployee';
import { useEmployeeStore } from '../../../shared/stores/employeesStore';

import { employeeSchema, EmployeeFormDataSchema } from '../schema/employee.schema';
import { addEmployeeFormInputSx } from '../constants/styles';
import { EMPLOYEE_STATUSES } from '../../../shared/constants/employeeStatuses';


interface AddEmployeeFormProps {
    handleClose: () => void,
    showAlert: (name: string) => void,
}

const AddEmployeeForm = ({handleClose, showAlert}: AddEmployeeFormProps) => {

    const addEmployeeMutation = useAddEmployee();
    const {addEmployee} = useEmployeeStore();

    const { register, handleSubmit, control, reset, formState: {errors}} = useForm<EmployeeFormDataSchema>({
        mode: 'onChange',
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: '',
            position: '',
            startDate: new Date(),
            status: EMPLOYEE_STATUSES.ACTIVE, 
            email: '',
            phone: '',
        }

    });

    const onSubmit: SubmitHandler<EmployeeFormDataSchema> = (data) => {

        addEmployeeMutation.mutate(data, {
            onSuccess: (savedData) => {
                addEmployee(savedData);
                reset();
                handleClose();
                showAlert(savedData.name);
            },
            onError: (error) => toast.error(error.message)
        });
    };


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
                sx={addEmployeeFormInputSx}
            />



            <TextField
                {...register('position', {required: true})}
                type='text' 
                name='position'
                size='small'
                label='Position' 
                helperText={errors.position && errors.position.message}
                error={!!errors.position}
                sx={addEmployeeFormInputSx}
            />


            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <Controller 
                    name='startDate'
                    control={control}
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
                            
                            sx={addEmployeeFormInputSx}
                        />

                    )}
                />

            </LocalizationProvider>


            <Controller 
                name='status'
                control={control}
                rules={{required: true}}
                render={({ field }) => (

                    <TextField
                        {...field}
                        select
                        label='Status'
                        size='small'
                        helperText={errors.status && 'Status is required'}
                        error={!!errors.status}
                        sx={addEmployeeFormInputSx}
                    >
                        <MenuItem value='' disabled sx={{ fontSize: '14px' }}>
                            Choose status
                        </MenuItem>
        
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




            <TextField
                {...register('email',  {required: true})}
                type='email'
                name='email'
                label='Email'
                size='small'
                helperText={errors.email && errors.email.message}
                error={!!errors.email}
                sx={addEmployeeFormInputSx}

            />

            <TextField
                {...register('phone', {required: true})}
                type='tel'
                name='phone'
                label='Phone'
                size='small'
                helperText={errors.phone && errors.phone.message}
                error={!!errors.phone}
                sx={addEmployeeFormInputSx}
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