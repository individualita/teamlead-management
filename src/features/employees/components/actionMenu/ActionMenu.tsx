import { FaPencil } from 'react-icons/fa6';
import { IoTrash } from 'react-icons/io5';

import styles from './actionMenu.module.css';

interface ActionMenuProps {
    employeeId: string,
    handleEditEmployee: (id: string) => void,
    deleteEmployee: (id: string) => void,
}

const ActionMenu = ({ employeeId, handleEditEmployee, deleteEmployee} : ActionMenuProps) => {
    return (

        <div 
            className={styles.menu}
            role='menu'
            aria-label='Employee actions'
        >
            
            <button 
                onClick={() => handleEditEmployee(employeeId)} 
                className={styles.button}
                role='menu item'
                aria-label='Edit employee'

                >
                    <FaPencil className='text-lg'/> 
                    <span>Edit</span>
            </button>
            
            <button 
                onClick={() => deleteEmployee(employeeId)}
                className={styles.button}
                role='menu item'
                aria-label='Delete employee'
            >
                <IoTrash className='text-lg text-red-600' /> 
                <span>Delete</span>

            </button>
        </div>
    )
}

export default ActionMenu;