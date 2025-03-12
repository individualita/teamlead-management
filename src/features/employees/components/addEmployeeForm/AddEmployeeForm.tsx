import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import { Dayjs } from 'dayjs';

import Button from '@mui/material/Button';

import { TextField, MenuItem } from '@mui/material';


import { EditFormType } from '../../types/editForm';

import { EMPLOYEE_STATUS_OPTIONS } from '../../constants/employeeStatusOptions';
import { commonInputSx } from '../../constants/commonInputSx';
import { commonDatePickerSx } from '../../constants/commonDatePickerSx';
import dayjs from 'dayjs';


interface AddEmployeeFormProps {
    handleClose: () => void,
}

const AddEmployeeForm = ({handleClose}: AddEmployeeFormProps) => {

    const { watch, register, handleSubmit, control, formState: {errors}} = useForm<EditFormType>({
        mode: 'onChange',

    });

    //ПЕРЕИМЕНОВАТЬ EDITFORMTYPE
    const onSubmit: SubmitHandler<EditFormType> = (data) => console.log(data)
    console.log(watch("name")) // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-10 flex flex-col gap-4'>

            <TextField
                {...register('name', {required: true})}
                type='text' 
                name='name'
                size='small'
                label='Employee name'
                sx={{
                    backgroundColor: '#fafafa',

                    '& .MuiInputLabel-root': {
                        fontSize: 14,
                    },

                    '& .MuiInputBase-input': {
                        fontSize: 14, // размер шрифта для вводимого текста
                    },
                }}
            />

            {errors.name && <span className='text-red-300'>Name is required</span>}



            <TextField
                {...register('position', {required: true})}
                type='text' 
                name='position'
                size='small'
                sx={{
                    backgroundColor: '#fafafa',

                    '& .MuiInputLabel-root': {
                        fontSize: 14,
                    },
                    '& .MuiInputBase-input': {
                        fontSize: 14, // размер шрифта для вводимого текста
                    },

                }}
                label='Position' 
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
                            name='startDate'
                            format='DD/MM/YYYY'
                            label='DD/MM/YYY'
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    error: !!errors.startDate,
                                    helperText: errors.startDate?.message, 
                                },
                            }}  
                            
                            sx={{
                                backgroundColor: '#fafafa',

                                '& .MuiOutlinedInput-input': {
                                    padding: '10px 8px', 
                                    fontSize: 14,       // размер шрифта
                                    lineHeight: 1.5,    // чтобы текст не «прилипал»
                                },
            
                                '& .MuiInputLabel-root': {
                                    fontSize: 14,
                                },

                            }}

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
                defaultValue=''
                sx={{
                    backgroundColor: '#fafafa',

                    '& .MuiOutlinedInput-input': {
                        padding: '10px 8px', // верх/низ, лево/право
                        fontSize: 14,       // размер шрифта
                        lineHeight: 1.5,    // чтобы текст не «прилипал»
                    },

                    '& .MuiInputLabel-root': {
                        fontSize: 14,
                    },

                }}
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
                sx={{
                    backgroundColor: '#fafafa',

                    '& .MuiInputLabel-root': {
                        fontSize: 14,
                    },
                    '& .MuiInputBase-input': {
                        fontSize: 14, // размер шрифта для вводимого текста
                    },
                }}

            />

            <TextField
                {...register('phone', {required: true})}
                type='tel'
                name='phone'
                label='Phone'
                size='small'
                sx={{
                    backgroundColor: '#fafafa',
                    '& .MuiInputLabel-root': {
                        fontSize: 14,
                    },

                    '& .MuiInputBase-input': {
                        fontSize: 14, // размер шрифта для вводимого текста
                    },
                }}
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