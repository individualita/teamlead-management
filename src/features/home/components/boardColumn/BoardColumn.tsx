
import { Task } from '../../types/task';

import BoardHeader from '../boardHeader/BoardHeader';
import TaskCard from '../taskCard/TaskCard';


interface BoardColumnProps {
    title: string,
    tasks: Task[],
};


const BoardColumn = ({title, tasks}: BoardColumnProps) => {

    return (
        <section aria-labelledby='todo-title' className='flex flex-col min-w-[320px] bg-gray-100 rounded-xl p-5'>

            {/* Display the header with title and tasks count */}
            <BoardHeader title={title} tasksCount={tasks.length}/>

            {/* Render a TaskCard for each task in the column */}
            {tasks.map(task => (
                <TaskCard  key ={task._id} task={task}/>
            ))}

        </section>
    )
}

export default BoardColumn;