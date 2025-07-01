import { Task } from '../types';

import { getTaskPriorityColor } from '../utils/getTaskPriorityColor';

import XButton from '../../../shared/components/XButton';

interface TaskCardProps {
    task: Task;
    onDelete: (id: string) => void;
}

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
    return (
        // max-w-[15rem] sm:max-w-[20rem]
        <article
            aria-describedby={`task-${task.id}-description`}
            className='bg-white rounded-lg shadow-sm p-4 relative w-full  cursor-grab'
        >
            {task.completed ? (
                <span className='bg-green-100 text-green-800 text-sm px-2 py-1 rounded-md'>
                    Completed
                </span>
            ) : (
                <span
                    className={`${getTaskPriorityColor(task.priority)} text-sm px-2 py-1 rounded-md`}
                >
                    {task.priority}
                </span>
            )}
            <header className='flex items-center justify-between mt-4'>
                <h3 className='text-xl font-bold'>{task.title}</h3>

                <XButton
                    onClick={() => onDelete(task.id)}
                    className='absolute top-1 right-1'
                    ariaLabel='Delete task'
                    title='Delete task'
                />
            </header>

            <p className='text-sm text-gray-600 mt-5 break-words '>{task.description}</p>
        </article>
    );
};

export default TaskCard;
