import { TaskStatus, Task } from '../../../types/task';

import { TASK_STATUSES } from '../../../constants/taskStatuses';

import BoardHeader from '../boardHeader/BoardHeader';
import TaskCard from '../taskCard/TaskCard';
import EmptyState from '../../../../../shared/components/emptyState/EmptyState';
import AddTaskForm from '../addTaskForm/AddTaskForm';

interface BoardColumnProps {
    title: TaskStatus,
    tasks: Task[],
    isFormOpen: boolean,
    onOpenForm: () => void,
    onCloseForm: () => void,
};


const BoardColumn = ({title, tasks, isFormOpen, onOpenForm, onCloseForm}: BoardColumnProps) => {

    const isTodoColumn = title === TASK_STATUSES.TODO;

    return (
        <section aria-labelledby='todo-title' className='flex flex-col gap-3 flex-1 bg-gray-100 rounded-xl p-5'>

            {/* Display the header with title and tasks count */}
            <BoardHeader 
                title={title} 
                tasksCount={tasks.length} 
                onClick={onOpenForm}
                isTodoColumn={isTodoColumn}
            />

            {isTodoColumn && isFormOpen && <AddTaskForm onClose={onCloseForm} />}

            {/* Render a TaskCard for each task in the column */}
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskCard key={task._id} task={task} />
                ))
            ) : (
                <EmptyState message={`No tasks ${title.toLowerCase()} yet` }/>
            )}

        </section>
    )
}

export default BoardColumn;