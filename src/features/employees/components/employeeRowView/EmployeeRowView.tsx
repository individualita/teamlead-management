import { TableCell, Box } from '@mui/material';

//types
import { Employee } from '../../../../shared/types';

//utils
import { formatDate } from '../../../../shared/utils/formatDate';
import { getEmployeeStatusColor } from '../../../../shared/utils/getEmployeeStatusColor';

//store
import { openTab } from '../../../../shared/stores/tabsStore';


//icons
import { FaAngleUp } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';

//components
import ActionMenu from '../actionMenu/ActionMenu';


interface EmployeeRowViewProps {
    employee: Employee;
    isExpanded: boolean;
    isActioned: boolean;
    onToggleExpansion: () => void;
    onToggleActions: (e: React.MouseEvent) => void;
    onEdit: (id: string) => void;
    onDeleteEmployee: (id: string) => void;
    isPending: boolean;
    actionMenuRef: React.RefObject<HTMLDivElement>;
}

const EmployeeRowView = ({
    employee,
    isExpanded,
    isActioned,
    onToggleExpansion,
    onToggleActions,
    onEdit,
    onDeleteEmployee,
    isPending,
    actionMenuRef,
}: EmployeeRowViewProps) => {

    const formattedDate = formatDate(employee.startDate);
    const employeeStatusColor = getEmployeeStatusColor(employee.status);

    return (
        <>
            <TableCell
                onClick={() => openTab(employee)}
                sx={{ cursor: 'pointer' }}
            >
                {employee.name}
            </TableCell>

            <TableCell>{employee.position}</TableCell>
            <TableCell>{formattedDate}</TableCell>

            <TableCell sx={{ width: 120 }}>
                <div
                    className={`${employeeStatusColor} text-center  font-semibold rounded-xl p-1 text-xs`}
                >
                    {employee.status}
                </div>
            </TableCell>

            <TableCell className='relative'>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3,
                    }}
                >
                    <button
                        type='button'
                        onClick={onToggleExpansion}
                        className='text-xl cursor-pointer'
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                        title={isExpanded ? 'Collapse row' : 'Expand row'}
                    >
                        {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                    </button>

                    <button
                        type='button'
                        onClick={onToggleActions}
                        className='text-xl cursor-pointer'
                        aria-haspopup='true'
                        aria-label='Open action menu'
                        title='Open action menu'
                    >
                        <HiDotsVertical />
                    </button>
                </Box>

                {isActioned && (
                    <ActionMenu
                        employeeId={employee.id}
                        onEdit={onEdit}
                        isPending={isPending}
                        onDeleteEmployee={onDeleteEmployee}
                        ref={actionMenuRef}
                        className={'w-35 absolute md:-left-14 md:w-32 lg:-left-6 -left-10 top-3'}
                    />
                )}
            </TableCell>
        </>
    );
};

export default EmployeeRowView;
