interface BoardHeaderProps {
    title: string,
    tasksCount: number,
}

const BoardHeader = ({title, tasksCount}: BoardHeaderProps) => {
    return (
        <header className='mb-4'>
            <h2 className='text-base font-bold flex items-center gap-3'>
                {title} 
                <span className='bg-stone-300 w-5 h-5 rounded-full flex items-center justify-center text-xs' >{tasksCount}</span>
            </h2>
        </header>
    )
}

export default BoardHeader;