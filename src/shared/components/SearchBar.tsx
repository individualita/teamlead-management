import { CiSearch } from "react-icons/ci";

const SearchBar = () => {

    return (
        <div className='serach-container relative flex items-center'>
            <CiSearch className='absolute left-2 w-5'/>
            <input name='search' type='text' placeholder='Search...' className='border-gray-300/50 text-sm rounded-lg block  py-2 px-9  w-[400px] focus:outline-none  focus:ring-2 focus:ring-[rgba(18,41,77,0.5)] transition-all duration-300  bg-gray-100' />
        </div>
    )

}

export default SearchBar;