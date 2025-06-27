//icons
import { CiSearch } from 'react-icons/ci';

//hooks
import { useEmployeeSearch } from './hooks/useEmployeeSearch';

//components
import MobileSearch from './components/mobileSearch/MobileSearch';
import SuggestionList from './components/suggestionList/SuggestionList';

const SearchBar = () => {
    const {
        query,
        setQuery,
        isOpen,
        filteredEmployees,
        clearQuery,
        isMobileSearchOpen,
        setMobileSearchOpen,
    } = useEmployeeSearch();

    return (
        <div className='relative flex items-center justify-center'>

            {/* for desktop */}
            <div className='hidden md:flex items-center relative'>
                <CiSearch className='h-4 w-5 absolute left-2 text-gray-600' />
                <input
                    name='search'
                    type='search'
                    placeholder='Search employee...'
                    className='border-gray-300/50 text-sm rounded-lg block py-2 px-9 w-100 lg:w-140 placeholder:text-xs bg-gray-100 focus-input hover:bg-gray-200'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>

            <SuggestionList
                isOpen={isOpen}
                filteredEmployees={filteredEmployees}
                clearQuery={clearQuery}
            />

            {/* for mobile*/}
            <button
                className='block md:hidden text-gray-600'
                onClick={() => setMobileSearchOpen(true)}
            >
                <CiSearch className='h-5 w-5' />
            </button>

            {/* Modal for mobile search */}
            {isMobileSearchOpen && (
                <MobileSearch
                    query={query}
                    setQuery={setQuery}
                    isOpen={isOpen}
                    filteredEmployees={filteredEmployees}
                    clearQuery={clearQuery}
                    setMobileSearchOpen={setMobileSearchOpen}
                />
            )}
        </div>
    );
};

export default SearchBar;
