
import { Status, Task } from '../../types/task';

import BoardHeader from '../boardHeader/BoardHeader';
import TaskCard from '../taskCard/TaskCard';
import EmptyState from '../emptyState/EmptyState';

interface BoardColumnProps {
    title: Status,
    tasks: Task[],
};


const BoardColumn = ({title, tasks}: BoardColumnProps) => {

    return (
        <section aria-labelledby='todo-title' className='flex flex-col flex-1 bg-gray-100 rounded-xl p-5'>

            {/* Display the header with title and tasks count */}
            <BoardHeader title={title} tasksCount={tasks.length}/>

            {/* Render a TaskCard for each task in the column */}
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskCard key={task._id} task={task} />
                ))
            ) : (
                <EmptyState title={title}/>
            )}

        </section>
    )
}

export default BoardColumn;