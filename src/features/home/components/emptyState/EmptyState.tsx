interface EmptyStateProps {
    title: string
};

const EmptyState = ({title}: EmptyStateProps) => {
    return (
        <div className='flex flex-col items-center justify-center mt-8 text-gray-400 select-none'>
            <div className='text-3xl mb-2'>🗒️</div>
            <p className='text-sm'>No <span className='font-medium lowercase'>{title}</span> tasks yet</p>
        </div>
    )
}

export default EmptyState;