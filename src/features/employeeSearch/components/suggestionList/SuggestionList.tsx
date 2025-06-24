import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
//types
import { Employee } from '../../../../shared/types';

//constants
import { CSS_ANIMATION_DURATION } from '../../../../shared/constants/cssAnimationDuration';

//components
import SearchSuggestionItem from '../searchSuggestionItem/SearchSuggestionItem';

//styles
import '../../../../shared/styles/shared.css';

interface SuggestionListProps {
    isOpen: boolean;
    filteredEmployees: Employee[];
    clearQuery: () => void;
}

// components/SearchResults.jsx
const SuggestionList = ({
    isOpen,
    filteredEmployees,
    clearQuery,
}: SuggestionListProps) => {

    const nodeRef = useRef(null);

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={isOpen}
            timeout={CSS_ANIMATION_DURATION}
            classNames={'fade'}
            unmountOnExit
        >
            <ul
                ref={nodeRef}
                className='absolute top-10 w-100 z-10 bg-white shadow-lg rounded-md'
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
    );
};

export default SuggestionList;
