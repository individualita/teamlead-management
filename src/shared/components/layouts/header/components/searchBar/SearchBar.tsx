import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

//icons
import { CiSearch } from 'react-icons/ci';

//store
import { useEmployeeStore } from '../../../../../stores/employeesStore';

//hook
import { useDebounce } from '../../hooks/useDebounce';

import { CSS_ANIMATION_DURATION } from '../../../../../constants/cssAnimationDuration';

import SearchSuggestionItem from './SearchSuggestionItem';

import '../../../../../styles/shared.css';


const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState<string>('');
    const { employees } = useEmployeeStore();
    const nodeRef = useRef(null);

    const debouncedQuery = useDebounce(query);

    useEffect(() => {
        setIsOpen(debouncedQuery.trim().length > 0);
    }, [debouncedQuery]);

    const filteredEmployees = useMemo(() => {
        if (!debouncedQuery.trim()) {
            return [];
        }
        return employees.filter(emp =>
            emp.name
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase().trim()),
        );
    }, [debouncedQuery, employees]);

    const clearQuery = useCallback(() => {
        setQuery('');
        setIsOpen(false);
    }, []);

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

            {/* SearchSuggestionItem */}

            <CSSTransition
                nodeRef={nodeRef}
                in={isOpen}
                timeout={CSS_ANIMATION_DURATION}
                classNames={'fade'}
                unmountOnExit
            >
                <ul
                    ref={nodeRef}
                    className='absolute top-10 w-100 z-10  bg-white shadow-lg rounded-md'
                >
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map(emp => (
                            <SearchSuggestionItem
                                key={emp.id}
                                employee={emp}
                                clearQuery={clearQuery}
                            />
                        ))
                    ) : (
                        <li className='p-2 text-gray-500'>No results found</li>
                    )}
                </ul>
            </CSSTransition>
        </div>
    );
};

export default SearchBar;
