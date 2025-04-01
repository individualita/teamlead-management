import { Status } from '../../types/task';

import { getTaskStatusColor } from '../../utils/getTaskStatusColor';

interface BoardHeaderProps {
    title: Status,
    tasksCount: number,
}

const BoardHeader = ({title, tasksCount}: BoardHeaderProps) => {


    return (
        <header className='mb-4 flex flex-col gap-5'>
            <h2 className='text-base font-bold flex items-center gap-3'>

                <span className={`w-2 h-2 ${getTaskStatusColor(title)} rounded-full`}></span>
                {title} 
                <span className='bg-stone-300 w-5 h-5 rounded-full flex items-center justify-center text-xs' >{tasksCount}</span>
            </h2>
            <div className={`${getTaskStatusColor(title)} w-full h-1`}></div>
        </header>
    )
}

export default BoardHeader;