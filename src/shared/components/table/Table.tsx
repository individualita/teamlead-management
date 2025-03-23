
import styles from './table.module.css';


interface TableProps  {
    columns: string[],
    data: Record<string, any>[],
    onDelete?: (id: string) => void,
}

const Table = ({columns, data, onDelete}: TableProps) => {
    return (
        <table className='min-w-full bg-white border border-gray-200'>

            <thead>
                <tr className={styles.row}>

                    {columns.map(col=> (
                        <th key={col} className='px-6 py-3 border-b'>{col}</th>
                    ))}

                </tr>
            </thead>  

            <tbody className='text-gray-700'>
                {/* stroka s rabotnikom*/}
                {data.map(item => (

                    <tr key={item._id} className='border-b hover:bg-gray-50 relative'>
                        
                        {columns.map(col => (
                            <td key={col} className='px-6 py-4 border-b'>{item[col] ?? '-'}</td>
                        ))}
                        
                        {onDelete && (
                            <td>
                                <button onClick={(() => onDelete(item._id))} className='absolute cursor-pointer top-4 right-[5px] text-xl text-red-500'>X</button>
                            </td>
                        )}
                    </tr>
                ))}

            </tbody>
        </table>
    )
}

export default Table;