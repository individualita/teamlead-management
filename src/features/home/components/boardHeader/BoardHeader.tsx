import { TaskStatus } from '../../types';

import { getTaskStatusColor } from '../../utils/getTaskStatusColor';
import { TASK_STATUS_BORDER_COLORS } from '../../constants/tasks';

import AddTaskButton from '../addTaskButton/AddTaskButton';

interface BoardHeaderProps {
    title: TaskStatus,
    tasksCount: number,
    onClick: () => void,
    isTodoColumn: boolean,
}

const BoardHeader = ({title, tasksCount, onClick, isTodoColumn}: BoardHeaderProps) => {

    const borderColor = TASK_STATUS_BORDER_COLORS[title] || 'border-gray-500';


    return (
        <header className={`mb-4 pb-4 flex justify-between border-b-4 ${borderColor}`}>

            <div className='flex flex-col gap-5'>
                <h2 className='text-base font-bold flex items-center gap-3'>

                    <span className={`w-2 h-2 ${getTaskStatusColor(title)} rounded-full`}></span>
                        {title} 
                    <span className='bg-stone-300 w-5 h-5 rounded-full flex items-center justify-center text-xs' >{tasksCount}</span>
                </h2>
            </div>

            {isTodoColumn && <AddTaskButton  onClick={onClick}/>}


        </header>

    )
}

export default BoardHeader;