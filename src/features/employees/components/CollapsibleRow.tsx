import { ChangeEvent } from 'react';
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


import { EditFormType } from './types/editForm';
import { Employee } from '../../../shared/types/employee';


interface CollapsibleRowProps {
    employee: Employee,
    isRowExpanded: boolean,
    isEmployeeEditing: boolean,
    colSpanCount: number,
    formData: EditFormType,
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
}

const CollapsibleRow = ({employee, isRowExpanded, isEmployeeEditing, colSpanCount, formData, handleChange}: CollapsibleRowProps) => {

    return (
        <TableRow aria-expanded={isRowExpanded}>
            <TableCell colSpan={colSpanCount} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
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
                                    {isEmployeeEditing? (
                                        <>
                                            <TableCell> 
                                                <input 
                                                    type='email' 
                                                    name='email'
                                                    value={formData.email} 
                                                    onChange={handleChange}


                                                />
                                            </TableCell>
                                            <TableCell> 
                                                <input 
                                                    type='tel' 
                                                    name='phone' 
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </TableCell>

                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>{employee.phone}</TableCell>
                                        </>

                                    )}

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
