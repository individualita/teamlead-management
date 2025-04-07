import { Task } from '../../../types/task';

import { getTaskPriorityColor } from '../../../utils/getTaskPriorityColor';

interface TaskCardProps {
    task: Task,
}


//    [TASK_PRIORITIES.COMPLETED]: 'bg-green-100 text-green-800',


const TaskCard = ({task}: TaskCardProps) => {

    return (
        <article className='mb-4 bg-white rounded-lg shadow-sm p-4'>

            <header className='flex items-center justify-between'>
                <h3 className='text-lg font-medium'>{task.title}</h3>

                {task.completed? (
                    <span className='bg-green-100 text-green-800 text-sm px-2 py-1 rounded-md'>Completed</span>
                ): (
                    <span className={`${getTaskPriorityColor(task.priority)} text-sm px-2 py-1 rounded-md`}>
                        {task.priority}
                    </span>
                )}

            </header>

            <p className='text-sm text-gray-600 mt-5'>
                {task.description}
            </p>

        </article>
    )
}

export default TaskCard;