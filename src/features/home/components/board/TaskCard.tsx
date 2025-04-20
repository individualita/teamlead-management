import { toast } from 'react-toastify';
import { Task } from '../../types/task';

import { useTasksStore } from '../../stores/tasksStore';

import { getTaskPriorityColor } from '../../utils/getTaskPriorityColor';

import XButton from '../../../../shared/components/xButton/XButton';

import { useDeleteTask } from '../../hooks/useDeleteTask';


interface TaskCardProps {
    task: Task,
}




const TaskCard = ({task}: TaskCardProps) => {

    const { deleteTask } = useTasksStore();
    const deleteTaskMutation = useDeleteTask();

    const onDeleteTask = (taskId: string) => {

        deleteTaskMutation.mutate(taskId, {
            onSuccess: () => {
                deleteTask(taskId); //zustand
            },
            onError: (error) => {
                toast.error(`Failed to delete task: ${error.message || 'Something went wrong. Try again later'}`);
            }
        })
    };

    return (
        <article 
            aria-describedby={`task-${task.id}-description`}
            className='bg-white rounded-lg shadow-sm p-4 relative w-full max-w-[15rem] sm:max-w-[20rem] cursor-grab'
        >

            <header className='flex items-center justify-between'>
                <h3 className='text-lg font-medium'>{task.title}</h3>


                {task.completed? (
                    <span className='bg-green-100 text-green-800 text-sm px-2 py-1 rounded-md'>Completed</span>
                ): (
                    <span className={`${getTaskPriorityColor(task.priority)} text-sm px-2 py-1 rounded-md`}>
                        {task.priority}
                    </span>
                )}

                <XButton 
                    onClick={() => onDeleteTask(task.id)}
                    className='absolute top-1 right-1'
                    ariaLabel='Delete task'
                    title='Delete task'
                    disabled={deleteTaskMutation.isPending}
                />
            </header>

            <p className='text-sm text-gray-600 mt-5'>
                {task.description}
            </p>

            {deleteTaskMutation.isPending && <div className='text-xs text-gray-400 mt-2'>Loading...</div>}

        </article>
    )
}

export default TaskCard;