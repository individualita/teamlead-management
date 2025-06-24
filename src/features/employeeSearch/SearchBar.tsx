//icons
import { CiSearch } from 'react-icons/ci';

//hooks
import { useEmployeeSearch } from './hooks/useEmployeeSearch';

//components
import SuggestionList from './components/suggestionList/SuggestionList';


const SearchBar = () => {
    const { query, setQuery, isOpen, filteredEmployees, clearQuery } = useEmployeeSearch();
    
    return (
        <div className='relative flex items-center '>
            <CiSearch className='h-4 w-5 absolute left-2' />

            <input
                name='search'
                type='search'
                placeholder='Search employee...'
                className=' border-gray-300/50 text-sm rounded-lg block  py-2 px-9  w-[400px] placeholder:text-xs bg-gray-100 focus-input'
                value={query}
                onChange={e => setQuery(e.target.value)}
            />


            <SuggestionList
                isOpen={isOpen}
                filteredEmployees={filteredEmployees}
                clearQuery={clearQuery}
            />
        </div>
    );
};

export default SearchBar;
