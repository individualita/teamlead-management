import { Employee } from '../../../../shared/types';

//store
import { openTab } from '../../../../shared/stores/tabsStore';

interface SearchSuggestionItemProps {
    employee: Employee;
    clearQuery: () => void;
}

const SearchSuggestionItem = ({
    employee,
    clearQuery,
}: SearchSuggestionItemProps) => {
    return (
        <li
            onClick={() => {
                clearQuery();
                openTab(employee);
            }}
            className='p-2 hover:bg-gray-50 cursor-pointer'
        >
            {employee.name}
        </li>
    );
};

export default SearchSuggestionItem;
