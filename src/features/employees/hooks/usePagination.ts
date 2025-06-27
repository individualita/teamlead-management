import { useState } from 'react';


interface usePaginationProps<T> {
    items: T[],
    initialRowsPerPage?: number,
}


const usePagination = <T,>({ initialRowsPerPage = 5, items} : usePaginationProps<T>) => {

    const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage(0);
    };

    const paginatedItems = rowsPerPage === -1
    ? items
    : items.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    return {
        paginatedItems,  
        rowsPerPage,
        currentPage,
        handleChangePage, 
        handleChangeRowsPerPage
    }

};

export default usePagination;




