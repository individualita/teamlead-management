import { useDroppable } from '@dnd-kit/core';

import { ReactNode } from 'react';


interface DroppableProps {
    children: ReactNode,
    id: string,
}
const Droppable = ({children, id} : DroppableProps) => {

    // Хук useDroppable добавляет функционал для области бросания
    const {isOver, setNodeRef} = useDroppable({
        id: id,
    });



    return (
        <div ref={setNodeRef} className={isOver ? 'border-2 border-gray-300 bg-green-50' : ''}>
            {children}
        </div>

    )

}

export default Droppable;