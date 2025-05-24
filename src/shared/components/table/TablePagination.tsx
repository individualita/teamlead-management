interface TablePaginationProps {
    onNext: () => void,
    onPrev: () => void,
    rowsPerPageOptions: number[],
    rowsPerPage: number,
    onRowsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    totalRows: number,
    isFirstPage: boolean,
    isLastPage: boolean, 
    startIndex: number, 
    endIndex: number,
};

const TablePagination = ({
    onNext, 
    onPrev,
    rowsPerPageOptions,
    rowsPerPage, 
    onRowsChange,
    totalRows, 
    isFirstPage, 
    isLastPage, 
    startIndex, 
    endIndex
}: TablePaginationProps) => {

    return (
        <nav  aria-label='Pagination navigation' className='flex justify-between bg-blue-50 p-2'>
            <div className='select'>

                <label htmlFor='rows'>
                    select rows:
                    <select 
                        name='rows' 
                        id='rows'
                        value={rowsPerPage} 
                        onChange={onRowsChange}
                    >

                        {rowsPerPageOptions.map(opt => (
                            <option 
                                key={opt} 
                                value={opt}
                                >
                                    {opt}
                            </option>
                        ))}
                        <option value={totalRows}>all</option>

                    </select>
                </label>

            </div>
            
            <div aria-live='polite'>
                {startIndex + 1} - {endIndex} of {totalRows}
            </div>
            <div className='pages flex gap-5 text-bold text-xl '>
                <button 
                    onClick={onPrev}
                    disabled={isFirstPage} 
                    className={isFirstPage ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}
                    aria-label='Previous page'
                    >
                        {'<'}
                    </button>
                <button 
                    onClick={onNext}
                    disabled={isLastPage} 
                    className={`${isLastPage? 'text-gray-400 cursor-not-allowed': 'cursor-pointer'}`}
                    aria-label='Next page'
                    >
                        {'>'}
                </button>
            </div>
        </nav>        
    )
}

export default TablePagination;