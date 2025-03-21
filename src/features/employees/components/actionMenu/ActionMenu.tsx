import { forwardRef } from 'react';

//icons
import { FaPencil } from 'react-icons/fa6';
import { IoTrash } from 'react-icons/io5';

//store
import { useEmployeeStore } from '../../../../shared/stores/employeesStore';

import styles from './actionMenu.module.css';

interface ActionMenuProps {
    employeeId: string,
    onEdit: (id: string) => void,
}

const ActionMenu = forwardRef<HTMLDivElement, ActionMenuProps>(
    ({ employeeId, onEdit, }, ref) => {

        const {deleteEmployee} = useEmployeeStore();
        return (

            <div 
                ref={ref}
                className={styles.menu}
                role='menu'
                aria-label='Employee actions'
            >
                
                <button 
                    onClick={() => onEdit(employeeId)} 
                    className={styles.button}
                    role='menuitem'
                    aria-label='Edit employee'

                    >
                        <FaPencil className='text-lg'/> 
                        <span>Edit</span>
                </button>
                
                <button 
                    onClick={() => deleteEmployee(employeeId)}
                    className={styles.button}
                    role='menuitem'
                    aria-label='Delete employee'
                >
                    <IoTrash className='text-lg text-red-600' /> 
                    <span>Delete</span>

                </button>
            </div>
        );
    }
);

export default ActionMenu;