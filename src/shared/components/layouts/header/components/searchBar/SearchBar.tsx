import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

//icons
import { CiSearch } from 'react-icons/ci';

import { useEmployeeStore } from '../../../../../stores/employeesStore';

import { CSS_ANIMATION_DURATION } from '../../../../../constants/cssAnimationDuration';
import { fadeTransitionClassNames } from '../../../../../constants/fadeTransitionClassNames';

import SearchSuggestionItem from '../searchSuggestionItem/SearchSuggestionItem';

import styles from './searchBar.module.css';


const SearchBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState<string>('');
    const {employees} = useEmployeeStore();

    const filteredEmployees = employees.filter(emp => (
        emp.name.toLowerCase().includes(query.toLowerCase().trim()) )
    );

    const nodeRef = useRef(null);


    useEffect(() => {
        setIsOpen(query.trim().length > 0);

    }, [query]);


    return (
        <div className='relative flex items-center'>
            <CiSearch className='absolute left-2 w-5'/>
            
            <input 
                name='search' 
                type='text' 
                placeholder='Search...' 
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value) }
            />

            {/* SearchSuggestionItem */}
            {query && (

                <CSSTransition 
                    nodeRef={nodeRef} 
                    in={isOpen} 
                    timeout={CSS_ANIMATION_DURATION} 
                    classNames={fadeTransitionClassNames} 
                    unmountOnExit
                >

                    <ul ref={nodeRef} className='absolute top-10 w-100 z-10  bg-white shadow-lg rounded-md'>

                        {filteredEmployees.map((emp) => (

                            <SearchSuggestionItem 
                                key={emp._id} 
                                employee={emp} 
                                clearQuery={() => setQuery('')} 
                            />

                        ))}

                    </ul>

                </CSSTransition>

            )}

        </div>
    )

}

export default SearchBar;