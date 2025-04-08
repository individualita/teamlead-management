import { ReactNode } from 'react';

interface EmptyStateProps {
    message: string
    icon?: string | ReactNode,
    className?: string,
};
const EmptyState = ({message, icon = '🗒️', className=''}: EmptyStateProps) => {
    return (
        <div className={`flex flex-col items-center justify-center mt-8 text-gray-400 select-none ${className}`}>
            <div className='text-3xl mb-2'>{icon}</div>
            <p className='text-sm'>{message}</p>
        </div>
    )
}

export default EmptyState;