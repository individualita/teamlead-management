interface UsePaginationResult<T>  {
    displayedData: T[],
    startIndex: number,
    endIndex: number,
    isFirstPage: boolean,
    isLastPage: boolean,
}
export const usePagination = <T,>(
    data: T[],
    currentPage: number, 
    rowsPerPage: number,

): UsePaginationResult<T>=> {

    const totalRows = data.length;

    let startIndex = (currentPage - 1) * rowsPerPage; 
    let endIndex = Math.min((currentPage * rowsPerPage), totalRows);// не выходим за пределы totalRows

    const isFirstPage = currentPage === 1;
    const isLastPage = endIndex >= totalRows; 

    const displayedData = data.slice(startIndex, endIndex);

    return {displayedData, startIndex, endIndex, isFirstPage, isLastPage}
};








