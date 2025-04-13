import { useMemo, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
//store
import { useTasksStore } from '../../stores/tasksStore';

//types
import { Task } from '../../types/task';
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



const Board = () => {

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const handleOpenForm = () => setIsFormOpen(true);
    const handleCloseForm = () => setIsFormOpen(false);

    const {tasks, updateTaskStatus} = useTasksStore();

    const tasksGroupedByStatus = useMemo(() => groupTasksByStatus(tasks), [tasks]);

    const handleDragEnd = (event: DragEndEvent) =>  {
        const {active, over} = event;
        console.log('over', over)
        // Если задача не была брошена в колонку, ничего не делаем
        if (!over) return;

        // ID задачи, которую перетащили
        const taskId = active.id as string;
        // Новый статус задачи (ID колонки, куда бросили)
        const newStatus = over.id as Task['status']; //To Do | In Progress | Done
        
        // Обновляем состояние задач, меняя статус + completed перетащенной задачи
        updateTaskStatus(taskId, newStatus, newStatus === TASK_STATUSES.DONE);
    }


    const sensors = useCustomDnDSensors();
    console.log(tasksGroupedByStatus);


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