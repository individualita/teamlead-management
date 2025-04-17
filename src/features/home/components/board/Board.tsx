import { useMemo, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
//store
import { useTasksStore } from '../../stores/tasksStore';

//types
import { Task, TaskStatus } from '../../types/task';
import { DragEndEvent } from '@dnd-kit/core';
import {  TasksGroupedByStatus } from '../../types/task';

//constants + utils
import { TASK_STATUSES } from '../../constants/tasks';
import { BOARD_COLUMNS } from '../../constants/board';
import { groupTasksByStatus } from '../../utils/groupTasksByStatus';

//hooks
import useCustomDnDSensors from '../../dnd/hooks/useCustomDnDSensors';


//components
import BoardColumn from './BoardColumn';
import Droppable from '../../dnd/Droppable';

//TEST
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../../../shared/config/firebaseConfig';

import { LoadingCircle } from '../../../../shared/components/layouts/loadingCircle/LoadingCircle';
import useTasksQuery from '../../hooks/useTasksQuery';



const Board = () => {

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const handleOpenForm = () => setIsFormOpen(true);
    const handleCloseForm = () => setIsFormOpen(false);

    const {tasks, setTasks, updateTaskStatus} = useTasksStore();

    const tasksGroupedByStatus = useMemo(() => groupTasksByStatus(tasks), [tasks]);

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
    }


    const sensors = useCustomDnDSensors();

    
    const { isLoading, isError, data, error } = useTasksQuery();
    if (isLoading) return <LoadingCircle />
    if (isError) return <div className="p-4 text-red-500">Error: {error.message}</div>;
    console.log('data', data);
    

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