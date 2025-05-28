import { useMemo, useState, useEffect } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { toast } from 'react-toastify';


//store
import { useTasksStore } from '../../stores/tasksStore';

//types
import { TaskStatus, TasksGroupedByStatus } from '../../types';

//constants + utils
import { TASK_STATUSES } from '../../constants/tasks';
import { BOARD_COLUMNS } from '../../constants/board';
import { groupTasksByStatus } from '../../utils/groupTasksByStatus';
import { taskService } from '../../services/taskService';

//hooks
import useCustomDnDSensors from '../../dnd/hooks/useCustomDnDSensors';
import { useTasksQuery } from '../../hooks/useTasksQuery';
import { useUpdateStatus } from '../../hooks/useUpdateTask';
import { useDeleteMutation } from '../../../../shared/hooks/useDeleteMutation';

//components
import { ErrorMessage } from '../../../../shared/components/ErrorMessage';
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
    const updateStatusMutation = useUpdateStatus();
    const deleteTaskMutation = useDeleteMutation({
        mutationFn: taskService.deleteTaskFromFirestore, 
        queryKey: ['tasks']
    });

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

        updateStatusMutation.mutate({taskId,  newStatus, completed: newStatus === TASK_STATUSES.DONE}, {
            onError: (error) => toast.error(`Failed to update task: ${error.message || 'Something went wrong. Try again later'}`)
        })
        
        // Zustand. Обновляем состояние задач, меняя статус + completed перетащенной задачи.
        updateTaskStatus(taskId, newStatus, newStatus === TASK_STATUSES.DONE);
    };

    const onDeleteTask = (taskId: string) => {

        deleteTaskMutation.mutate(taskId, {
            onError: (error) => {
                toast.error(`Failed to delete task: ${error.message || 'Something went wrong. Try again later'}`);
            }
        })
    };

    if (isLoading ) return <LoadingCircle />;
    if (isError) return <ErrorMessage message={error.message}/>

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
                            onDelete={onDeleteTask}
                        />

                    </Droppable>

                )}
            </DndContext>


        </div>


    )
}

export default Board;