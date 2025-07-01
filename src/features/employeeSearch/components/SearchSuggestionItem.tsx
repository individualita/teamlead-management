import { Employee } from '../../../shared/types';

//store
import { openTab } from '../../../shared/stores/tabsStore';

interface SearchSuggestionItemProps {
    employee: Employee;
    clearQuery: () => void;
    onSelect?: (employee: Employee) => void;
}

const SearchSuggestionItem = ({
    employee,
    clearQuery,
    onSelect,
}: SearchSuggestionItemProps) => {
    const handleClick = () => {
        if (onSelect) {
            onSelect(employee);
        } else {
            clearQuery();
            openTab(employee);
        }
    };
    return (
        <li
            onClick={handleClick}
            className='p-2 hover:bg-gray-50 cursor-pointer'
        >
            {employee.name}
        </li>
    );
};

export default SearchSuggestionItem;
