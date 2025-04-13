import {useDraggable} from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DraggableProps {
    children: ReactNode,
    id: string,
}

const Draggable = ({children, id}: DraggableProps) => {

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
    });

    const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, opacity: 0.6 }
    : { opacity: 1 };


    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}> 
            {children}
        </div>
    )
}

export default Draggable;