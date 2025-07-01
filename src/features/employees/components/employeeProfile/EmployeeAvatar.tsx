
const EmployeeAvatar = ({name}: {name: string}) => {
    return (
        <div className='flex justify-center mb-4'>
            <div className='w-24 h-24 rounded-full bg-gray-200 shadow-md border-2 border-gray-300 hover:scale-110 transition-transform duration-300 flex items-center justify-center'>
                <span className='text-gray-500 text-2xl'>
                    {name.charAt(0).toUpperCase()}
                </span>
            </div>
        </div>
    );
};

export default EmployeeAvatar;
