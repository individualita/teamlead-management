import { Employee } from '../../../../../types/employee.types';

import { useTabsStore } from '../../../../../stores/tabsStore';

interface SearchSuggestionItemProps {
    employee: Employee,
    clearQuery: () => void,
}

const SearchSuggestionItem = ({employee, clearQuery}: SearchSuggestionItemProps) => {

    const { openTab } = useTabsStore();
    
    return (
        <li
            onClick={() => {
                clearQuery()
                openTab(employee)
            }}
            className="p-2 hover:bg-gray-50 cursor-pointer"
        >
            {employee.name}
        </li>

    )



}

export default SearchSuggestionItem;