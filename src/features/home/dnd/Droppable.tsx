import { useDroppable } from '@dnd-kit/core';

import { ReactNode } from 'react';

import { TaskStatus } from '../types';

interface DroppableProps {
    children: ReactNode,
    id: TaskStatus,
};

const Droppable = ({children, id} : DroppableProps) => {

    const DROPPABLE_STYLES = {
        base: '',
        over: 'border-2 border-gray-300 bg-green-50',
    };

    const {isOver, setNodeRef} = useDroppable({
        id: id,
    });



    return (
        <div ref={setNodeRef} className={isOver ? DROPPABLE_STYLES.over : DROPPABLE_STYLES.base}>
            {children}
        </div>

    )

}

export default Droppable;