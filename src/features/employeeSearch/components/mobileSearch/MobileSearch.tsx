import { CiSearch } from 'react-icons/ci';

//types
import { Employee } from '../../../../shared/types';

//components
import SuggestionList from '../suggestionList/SuggestionList';

import { openTab } from '../../../../shared/stores/tabsStore';
type MobileSearchProps = {
    query: string;
    setQuery: (value: string) => void;
    isOpen: boolean;
    filteredEmployees: Employee[];
    clearQuery: () => void;
    setMobileSearchOpen: (isOpen: boolean) => void;
};

const MobileSearch = ({
    query,
    setQuery,
    isOpen,
    filteredEmployees,
    clearQuery,
    setMobileSearchOpen,
}: MobileSearchProps) => {
    const handleSelect = (employee: Employee) => {
        setMobileSearchOpen(false);
        clearQuery();
        openTab(employee);
    };

    return (
        <div className='fixed inset-0 bg-white z-50 flex flex-col p-4'>
            <div className='flex items-center gap-2'>
                <CiSearch className='h-4 w-5 text-gray-600' />
                <input
                    name='search'
                    type='search'
                    placeholder='Search employee...'
                    className='border-gray-300/50 text-sm rounded-lg block py-2 px-4 w-full placeholder:text-xs bg-gray-100 focus-input'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button
                    className='text-gray-600 p-2 text-sm'
                    onClick={() =>  {
                        setMobileSearchOpen(false);
                        clearQuery();
                    }}
                >
                    Close
                </button>
            </div>
            <SuggestionList
                isOpen={isOpen}
                filteredEmployees={filteredEmployees}
                clearQuery={clearQuery}
                onSelect={handleSelect}
            />
        </div>
    );
};

export default MobileSearch;
