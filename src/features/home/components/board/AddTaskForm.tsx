// External libraries
import { TextField, MenuItem, Button } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';


// Internal modules: stores and hooks
import { useTasksStore } from '../../stores/tasksStore';
import { useAddTask } from '../../hooks/useAddTask';

// Internal modules: types and schemas
import { taskSchema, TaskFormDataSchema } from '../../schema/tasks.schema';
import { Task } from '../../types/task';

// Internal modules: constants
import { addTaskFormInputSx } from '../../constants/styles';
import { TASK_PRIORITIES, TASK_STATUSES } from '../../constants/tasks';



interface AddTaskFormProps {
    onClose: () => void,
}


const AddTaskForm = ({onClose}: AddTaskFormProps) => {

    const {addTask} = useTasksStore();

    const addTaskMutation = useAddTask();


    const { register, handleSubmit, control, reset, formState: {errors}} = useForm<TaskFormDataSchema>({
        mode: 'onChange',
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            priority: TASK_PRIORITIES.LOW
        } 


    });

    const onSubmit: SubmitHandler<TaskFormDataSchema> = (data) => {

        const newTask: Omit<Task, 'id'> = {
            ...data,
            status: TASK_STATUSES.TODO,
            completed: false,
        };

        addTaskMutation.mutate(newTask, {
            onSuccess: (savedTask) => {
                addTask(savedTask); //zustand обновляем только после успеха. 
                toast.success(`Task ${savedTask.title.toUpperCase()} added successfully!`)
                reset();
                onClose();
            },

            onError: (error) => {
                toast.error(`Failed to add task: ${error.message || 'Something went wrong. Try again later'}`);
            }
        })
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white rounded-lg shadow-sm p-4 flex flex-col gap-4'>

   

            <TextField
                {...register('title', {required: true})}
                type='text' 
                name='title'
                size='small'
                label='Task title'
                helperText={errors.title && errors.title.message}
                error={!!errors.title}
                sx={addTaskFormInputSx}
                
            />

            <TextField
                {...register('description', {required: true})}
                type='text' 
                name='description'
                multiline
                rows={4}
                size='small'
                label='Task description'
                helperText={errors.description && errors.description.message}
                error={!!errors.description}
                sx={addTaskFormInputSx}
                
            />


            <Controller 
                name='priority'
                control={control}
                render={({ field }) => (

                    <TextField
                        {...field}
                        select
                        label='Priority'
                        size='small'
                        helperText={errors.priority?.message}
                        error={!!errors.priority}
                        sx={addTaskFormInputSx}
                    >

                        {Object.values(TASK_PRIORITIES).map(item => (
                            <MenuItem 
                                key={item} 
                                value={item}
                                sx={{fontSize: '14px'}}
                                >
                                    {item}
                            </MenuItem>
                        ))}
                            
                    </TextField>


                )}
            />

            <Button
                variant='contained' 
                color='success' 
                type='submit' 
                size='small'
                disabled={addTaskMutation.isPending}
                >
                    {addTaskMutation.isPending ? 'Adding...' : 'Add'}

            </Button>
        </form>
    )
}

export default AddTaskForm;