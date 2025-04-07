import { useState } from 'react';
import { TaskStatus, Task } from '../../../types/task';

import { TASK_STATUSES } from '../../../constants/taskStatuses';
import BoardHeader from '../boardHeader/BoardHeader';
import TaskCard from '../taskCard/TaskCard';
import EmptyState from '../../emptyState/EmptyState';
import AddTaskForm from '../addTaskForm/AddTaskForm';

interface BoardColumnProps {
    title: TaskStatus,
    tasks: Task[],
};


const BoardColumn = ({title, tasks}: BoardColumnProps) => {

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const handleOpenForm = () => setIsFormOpen(true);


    const isTodoColumn = title === TASK_STATUSES.TODO;
    

    return (
        <section aria-labelledby='todo-title' className='flex flex-col flex-1 bg-gray-100 rounded-xl p-5'>

            {/* Display the header with title and tasks count */}
            <BoardHeader 
                title={title} 
                tasksCount={tasks.length} 
                onClick={handleOpenForm}
                isTodoColumn={isTodoColumn}
            />

            {isTodoColumn && isFormOpen && <AddTaskForm onClose={() => setIsFormOpen(false)} />}

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