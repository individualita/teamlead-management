import { TableRow, TableHead, TableCell } from '@mui/material';

import { TABLE_COLUMNS } from '../../constants/tableColumns';

const TableHeader = () => {
    return (
        
        <TableHead  
            sx={{
                '& th:first-of-type': { borderTopLeftRadius: 8 },
                '& th:last-of-type': { borderTopRightRadius: 8 },
                backgroundColor: '#f5f5f5', 
            }}
        >

            <TableRow>

                {/* columns */}
                {TABLE_COLUMNS.map(col=> (
                    <TableCell key={col.key} align={col.align}>
                        {col.label}
                    </TableCell>
                ))}

            </TableRow>
        </TableHead>
    )
}

export default TableHeader;
