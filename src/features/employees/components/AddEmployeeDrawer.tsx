import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

import { IoPersonAdd } from 'react-icons/io5';

import AddEmployeeForm from './AddEmployeeForm';

const drawerStyle = {
    width: { xs: '100vw', sm: 400 },
    padding: { xs: '12px', sm: '18px' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: '100dvh',
    overflowY: 'auto'
};

const buttonStyles = {
    background: 'var(--color-primary)',
    marginLeft: 'auto',
    display: 'flex',
    gap: '8px',
    textTransform: 'none' as const,
    padding: { xs: '8px', sm: '6px 16px' }, 
};

interface EmployeeModalProps {
    showAlert: (name: string) => void;
}

const AddEmployeeDrawer = ({ showAlert }: EmployeeModalProps) => {
    const [open, setOpen] = useState(false);

    //modal toggle.
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                type='button'
                onClick={handleOpen}
                variant='contained'
                sx={buttonStyles}
                aria-label='Add new employee'
                title='Add new employee'
            >
                <IoPersonAdd />
                Add
            </Button>

            <Drawer
                anchor='right'
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={drawerStyle} role='presentation'>
                    <div className='text-xl font-bold'>Add employee</div>

                    <AddEmployeeForm
                        handleClose={handleClose}
                        showAlert={showAlert}
                    />
                </Box>
            </Drawer>
        </>
    );
};

export default AddEmployeeDrawer;
