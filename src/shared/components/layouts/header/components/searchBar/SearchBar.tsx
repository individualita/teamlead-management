import { useState, useRef, useEffect } from 'react';

import { CiSearch } from 'react-icons/ci';

import styles from './searchBar.module.css';

import { CSS_ANIMATION_DURATION } from '../../../../../constants/cssAnimationDuration';

import { useEmployeeStore } from '../../../../../stores/employeesStore';

import { useNavigate } from 'react-router-dom';

import SearchSuggestionItem from '../searchSuggestionItem/SearchSuggestionItem';

import { fadeTransitionClassNames } from '../../../../../constants/fadeTransitionClassnames';

import { CSSTransition } from 'react-transition-group';


const SearchBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState<string>('');
    const {employees} = useEmployeeStore();
    const navigate = useNavigate();

    const filteredEmployees = employees.filter(emp => (
        emp.name.toLowerCase().includes(query.toLowerCase().trim()) )
    );

    const nodeRef = useRef(null);



    console.log(filteredEmployees);

    const handleSelectEmployee = (id: string) => {
        navigate(`/employee/${id}`);
        setQuery('');
    }


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

                    <ul ref={nodeRef} className='absolute top-9 w-60 z-10  bg-white  rounded-md'>

                        {filteredEmployees.map((emp) => (

                            <SearchSuggestionItem 
                                key={emp._id} 
                                employee={emp} 
                                onSelectEmployee={handleSelectEmployee} 
                            />

                        ))}

                    </ul>

                </CSSTransition>

            )}

        </div>
    )

}

export default SearchBar;