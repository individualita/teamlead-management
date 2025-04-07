interface AddTaskButtonProps {
    onClick: () => void,
}

const AddTaskButton = ({onClick}: AddTaskButtonProps ) => {
    return (
        <button 
            onClick={onClick} 
            className='w-6 h-6 bg-indigo-300 rounded-md cursor-pointer flex justify-center items-center'
        >
            <span className='text-xl text-indigo-900 font-bold'>+</span>
        </button>
    )
}

export default AddTaskButton;