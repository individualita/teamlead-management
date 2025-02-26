import {
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Box,
    Table,
    TableBody,
    TableHead
} from '@mui/material';

import { useState } from 'react';


import { Employee } from '../../../shared/types/employee';


interface CollapsibleRowProps {
    employee: Employee,
}

const CollapsibleRow = ({employee}: CollapsibleRowProps) => {

    const [isOpen, setIsOpen] = useState(false); // Локальное состояние

    return (
        <>

            {/* collapsed */}
            <TableRow sx={{background: 'lightgray',  borderBottom: 'unset'}}>
                <TableCell colSpan={6}>
                    <Collapse  in={isOpen} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <h1>Additional information</h1>
                            <Table size={'small'}>

                                <TableHead>
                                    <TableRow>
                                        <TableCell>phone</TableCell>
                                        <TableCell>email</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>{employee.phone}</TableCell>
                                        <TableCell>{employee.email}</TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>

                        </Box>

                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )

}

export default CollapsibleRow;