import { useState, useRef, useEffect } from 'react';

import { CiSearch } from 'react-icons/ci';

import styles from './searchBar.module.css';

import { useEmployeeStore } from '../../../../../stores/employeesStore';

import { useNavigate } from 'react-router-dom';

import SearchSuggestionItem from '../searchSuggestionItem/SearchSuggestionItem';

import { Transition } from 'react-transition-group';



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

    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
        unmounted: {},
    };


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

                <Transition nodeRef={nodeRef} in={isOpen} timeout={duration} unmountOnExit>
                    {state => (

                        <ul ref={nodeRef} style={{...defaultStyle, ...transitionStyles[state]}} className="absolute top-9 w-60 z-10  bg-white  rounded-md">

                            {filteredEmployees.map((emp) => (

                                <SearchSuggestionItem 
                                    key={emp._id} 
                                    employee={emp} 
                                    onSelectEmployee={handleSelectEmployee} 
                                />

                            ))}

                        </ul>

                    )}
                </Transition>

            )}

        </div>
    )

}

export default SearchBar;