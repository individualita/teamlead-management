import { useMemo, useState, useEffect } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

//store
import { useTasksStore } from '../../stores/tasksStore';

//types
import { TaskStatus, TasksGroupedByStatus} from '../../types/task';

//constants + utils
import { TASK_STATUSES } from '../../constants/tasks';
import { BOARD_COLUMNS } from '../../constants/board';
import { groupTasksByStatus } from '../../utils/groupTasksByStatus';

//hooks
import useCustomDnDSensors from '../../dnd/hooks/useCustomDnDSensors';
import { useTasksQuery } from '../../hooks/useTasksQuery';

//components
import { LoadingCircle } from '../../../../shared/components/layouts/loadingCircle/LoadingCircle';
import BoardColumn from './BoardColumn';
import Droppable from '../../dnd/Droppable';



const Board = () => {
    //State
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    //Custom hooks
    const { isLoading, isError, data, error } = useTasksQuery();
    const {tasks, setTasks, updateTaskStatus} = useTasksStore();
    const sensors = useCustomDnDSensors();

    // Memoized values
    const tasksGroupedByStatus = useMemo(() => groupTasksByStatus(tasks), [tasks]);

    // Sync server data to Zustand
    useEffect(() => {
        if (data) setTasks(data);
    }, [data]);

    // Event handlers
    const handleOpenForm = () => setIsFormOpen(true);
    const handleCloseForm = () => setIsFormOpen(false);

    const handleDragEnd = (event: DragEndEvent) =>  {
        const {active, over} = event;

        // Если задача не была брошена в колонку, ничего не делаем
        if (!over) return;

        // ID задачи, которую перетащили
        const taskId = active.id as string;
        // Новый статус задачи (ID колонки, куда бросили)
        const newStatus = over.id as TaskStatus; //To Do | In Progress | Done
        
        // Обновляем состояние задач, меняя статус + completed перетащенной задачи
        updateTaskStatus(taskId, newStatus, newStatus === TASK_STATUSES.DONE);
    };

    if (isLoading ) return <LoadingCircle />;
    if (isError) return <div className='p-4 text-red-500'>Error: {error.message || 'Something went wrong'}</div>;


    return (

        <div className='flex gap-2'>

            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                {BOARD_COLUMNS.map(col => 

                    <Droppable key={col.key} id={col.label}>
                        <BoardColumn 
                            key={col.key} 
                            title={col.label} 
                            tasks={tasksGroupedByStatus[col.label as keyof TasksGroupedByStatus] || []} // Provide an empty array fallback if no tasks exist for this status.
                            isFormOpen={isFormOpen}
                            onOpenForm={handleOpenForm}
                            onCloseForm={handleCloseForm}
                        />

                    </Droppable>

                )}
            </DndContext>


        </div>


    )
}

export default Board;