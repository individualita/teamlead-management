import { useEffect, useState } from 'react';

export const useDebounce = (query: string, delay: number = 300): string => {
    const [debouncedQuery, setDebouncedQuery] = useState<string>('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, delay);

        return () => clearTimeout(timeout);
    }, [query, delay]);

    return debouncedQuery;
};
