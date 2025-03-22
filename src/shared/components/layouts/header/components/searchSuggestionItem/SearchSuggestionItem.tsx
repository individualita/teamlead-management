import { Employee } from '../../../../../types/employee';

interface SearchSuggestionItemProps {
    employee: Employee,
    onSelectEmployee: (id: string) => void,
}

const SearchSuggestionItem = ({employee, onSelectEmployee}: SearchSuggestionItemProps) => {

    return (
        <li
            onClick={() => onSelectEmployee(employee._id)}
            className="p-2 hover:bg-gray-50 cursor-pointer"
        >
            {employee.name}
        </li>

    )



}

export default SearchSuggestionItem;