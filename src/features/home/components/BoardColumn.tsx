import Draggable from '../dnd/Draggable';

//types
import { TaskStatus, Task } from '../types';
import { TASK_STATUSES } from '../constants/tasks';

import EmptyState from './EmptyState';

import BoardHeader from './BoardHeader';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';

interface BoardColumnProps {
    title: TaskStatus;
    tasks: Task[];
    isFormOpen: boolean;
    onOpenForm: () => void;
    onCloseForm: () => void;
    onDelete: (id: string) => void;
}

const BoardColumn = ({
    title,
    tasks,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onDelete,
}: BoardColumnProps) => {
    const isTodoColumn = title === TASK_STATUSES.TODO;

    return (
        <section
            aria-labelledby='todo-title'
            className='flex flex-col gap-3 bg-stone-100 rounded-xl p-5'
        >
            {/* Display the header with title and tasks count */}
            <BoardHeader
                title={title}
                tasksCount={tasks.length}
                onClick={onOpenForm}
                isTodoColumn={isTodoColumn}
            />

            {isTodoColumn && isFormOpen && (
                <AddTaskForm onClose={onCloseForm} />
            )}

            {/* Render a TaskCard for each task in the column */}
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <Draggable id={task.id} key={task.id}>
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={onDelete}
                        />
                    </Draggable>
                ))
            ) : (
                <EmptyState message={`No tasks ${title.toLowerCase()} yet`} />
            )}
        </section>
    );
};

export default BoardColumn;
