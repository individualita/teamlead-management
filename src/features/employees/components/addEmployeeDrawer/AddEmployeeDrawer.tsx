import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Drawer from '@mui/material/Drawer';

import { Alert } from '@mui/material';

import AddEmployeeForm from '../addEmployeeForm/AddEmployeeForm';




const drawerStyle =  {
    width: 400,
    padding: '18px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: '100dvh',


}

interface EmployeeModalProps {
    showAlert: (name: string) => void;
}

//sx={style}
const AddEmployeeDrawer = ({showAlert} : EmployeeModalProps) => {
    const [open, setOpen] = useState(false);

    //modal toggle.
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Button 
                onClick={handleOpen} 
                variant='contained' 
                sx={{background: 'var(--color-primary)', marginLeft: 'auto', display:'block'}}
                title='Add new employee'
                >
                    + Add
            </Button>

            <Drawer
                anchor='right'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box 
                    sx={drawerStyle} 
                    role="presentation"
                >
                    <div className='text-xl font-bold'>Add employee</div>


                    <AddEmployeeForm handleClose={handleClose} showAlert={showAlert}/>
                </Box>

            </Drawer>
        </div>
    )

}

export default AddEmployeeDrawer; 