import { useMemo } from 'react';

//store
import { useTasksStore } from '../../stores/tasksStore';

//types
import {  TasksGroupedByStatus } from '../../types/task';

//constants + utils
import { BOARD_COLUMNS } from '../../constants/boardColumns';
import { groupTasksByStatus } from '../../utils/groupTasksByStatus';


//components
import BoardColumn from '../boardColumn/BoardColumn';



const Board = () => {

    const {tasks} = useTasksStore();

    const tasksGroupedByStatus = useMemo(() => groupTasksByStatus(tasks), [tasks]);

    console.log(tasksGroupedByStatus);

    return (

        <div className='flex gap-2'>

            {/* Iterate over board columns and render each one with its corresponding tasks.
                Using BOARD_COLUMNS ensures consistency and centralized column definitions. */}

            {BOARD_COLUMNS.map(col => 
                <BoardColumn 
                    key={col.key} 
                    title={col.label} 
                    tasks={tasksGroupedByStatus[col.label as keyof TasksGroupedByStatus] || []} // Provide an empty array fallback if no tasks exist for this status.
                />
            )}

        </div>


    )
}

export default Board;