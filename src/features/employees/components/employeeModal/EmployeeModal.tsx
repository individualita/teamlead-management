import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Drawer from '@mui/material/Drawer';

import AddEmployeeForm from '../addEmployeeForm/AddEmployeeForm';



const modalStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    //transform: 'translate(-100%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '10px',    

    //moje

    height: '100dvh'
};

const drawerStyle =  {
    width: 400,
    padding: '18px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: '100dvh',


}



//sx={style}
const EmployeeModal = () => {
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


                    <AddEmployeeForm handleClose={handleClose}/>
                </Box>

            </Drawer>
        </div>
    )

}

export default EmployeeModal; 