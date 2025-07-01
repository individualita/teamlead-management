import { forwardRef } from 'react';

//icons
import { FaPencil } from 'react-icons/fa6';
import { IoTrash } from 'react-icons/io5';

//components
import ActionButton from './ActionButton';

interface ActionMenuProps {
    employeeId: string;
    onEdit: (id: string) => void;
    isPending?: boolean;
    onDeleteEmployee: (id: string) => void;
    className?: string;
}

const ActionMenu = forwardRef<HTMLDivElement, ActionMenuProps>(
    (
        { employeeId, onEdit, isPending, onDeleteEmployee, className = '' },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                className={`${className} bg-white shadow-sm rounded-md inset-shadow-sm z-10 flex flex-col`}
                role='menu'
                aria-label='Employee actions'
            >
                {isPending ? (
                    <span className='p-3'>Loading...</span>
                ) : (
                    <>
                        <ActionButton
                            onClick={() => onEdit(employeeId)}
                            ariaLabel='Edit employee'
                            text='Edit'
                            icon={<FaPencil className='text-lg' />}
                        />

                        <ActionButton
                            onClick={() => onDeleteEmployee(employeeId)}
                            ariaLabel='Delete employee'
                            text='Delete'
                            icon={<IoTrash className='text-lg text-red-600' />}
                        />
                    </>
                )}
            </div>
        );
    },
);

export default ActionMenu;
