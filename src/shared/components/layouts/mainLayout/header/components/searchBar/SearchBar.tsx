import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

//icons
import { CiSearch } from 'react-icons/ci';

//store
import { useEmployeeStore } from '../../../../../../stores/employeesStore';

//hook
import { useDebounce } from '../../hooks/useDebounce';

import { CSS_ANIMATION_DURATION } from '../../../../../../constants/cssAnimationDuration';
import { fadeTransitionClassNames } from '../../../../../../constants/fadeTransitionClassNames';

import SearchSuggestionItem from './SearchSuggestionItem';

import styles from './searchBar.module.css';

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
                className={styles.input}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            {/* SearchSuggestionItem */}

            <CSSTransition
                nodeRef={nodeRef}
                in={isOpen}
                timeout={CSS_ANIMATION_DURATION}
                classNames={fadeTransitionClassNames}
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
