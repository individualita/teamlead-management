import { useState, useCallback, useEffect, useMemo } from 'react';

//store
import { useEmployees } from '../../../shared/stores/employeesStore';

//hooks
import { useDebounce } from './useDebounce';

export const useEmployeeSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const employees = useEmployees();
    const debouncedQuery = useDebounce(query);

    useEffect(() => {
        setIsOpen(debouncedQuery.trim().length > 0);
    }, [debouncedQuery]);

    const filteredEmployees = useMemo(() => {
        if (!debouncedQuery.trim()) return [];
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


    return {
        query,
        setQuery,
        isOpen,
        isMobileSearchOpen,
        setMobileSearchOpen,
        filteredEmployees,
        clearQuery,
    };
};
