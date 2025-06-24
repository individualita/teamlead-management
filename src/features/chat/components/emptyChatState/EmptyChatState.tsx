import emptyStateImg from '../../assets/hello_nobg.png';

const EmptyChatState = () => {

    return (
        <div className='flex justify-center items-center h-full'>
            <div className='p-8 bg-gray-100 rounded-xl flex flex-col'>
                <span>No messages yet... </span>
                <span>Write something.</span> 
                <img src={emptyStateImg} alt='A pink cartoon character waves.' className='w-30 h-30'/>

            </div>
        </div>
    )

}

export default EmptyChatState;