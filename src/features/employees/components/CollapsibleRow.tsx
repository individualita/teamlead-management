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
    isOpen: boolean,
    colSpanLength: number,
}

const CollapsibleRow = ({employee, isOpen, colSpanLength}: CollapsibleRowProps) => {


    return (
        <TableRow >
            <TableCell colSpan={colSpanLength} style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Box sx={{padding: 2, borderRadius: 1 }} >
                        <h3>Additional Info</h3>

                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{'& > *': {fontWeight: 'bold'}}}>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.phone}</TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )

}

export default CollapsibleRow;
