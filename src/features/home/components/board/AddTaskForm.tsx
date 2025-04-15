import { TextField, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

//firebase
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../shared/config/firebaseConfig';

import { useTasksStore } from '../../stores/tasksStore';

import { taskSchema, TaskFormDataSchema } from '../../schema/tasks.schema';
import { Task } from '../../types/task';

import { addTaskFormInputSx } from '../../constants/styles';
import { TASK_PRIORITIES, TASK_STATUSES } from '../../constants/tasks';


interface AddTaskFormProps {
    onClose: () => void,
}


const AddTaskForm = ({onClose}: AddTaskFormProps) => {

    const {addTask} = useTasksStore();

    const addTaskToDb = async(newTask : Task) => {

        try {
            const docRef = await addDoc(collection(db, 'tasks'), newTask);
        
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    
    }

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

        const newTask: Task = {
            _id: uuidv4(),
            ...data,
            status: TASK_STATUSES.TODO,
            completed: false,
        };
        addTask(newTask);
        addTaskToDb(newTask)

        reset();
        onClose();

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
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                            
                    </TextField>


                )}
            />

            <Button
                variant='contained' 
                color='success' 
                type='submit' 
                size='small'>
                    Add
            </Button>

        </form>
    )
}

export default AddTaskForm;