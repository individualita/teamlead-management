import { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

//MUI
import {
    TableCell,
    TableRow,
} from '@mui/material';

//schema
import { employeeSchema } from '../schema/employee.schema';

//types
import { Employee } from '@/shared/types';
import { EmployeeFormData } from '../types';

//constants
import { TABLE_COLUMNS } from '../constants/tableColumns';

import CollapsibleRow from './CollapsibleRow';
import EmployeeRowView from './EmployeeRowView';
import EmployeeEditForm from './EmployeeEditForm';

interface EmployeeRowProps {
    employee: Employee;
    isExpanded: boolean;
    onToggleExpansion: (id: string) => void;
    onUpdateEmployee: (id: string, data: Partial<Employee>) => void;
    onDeleteEmployee: (id: string) => void;
    isPending?: boolean;
}


const EmployeeRow = ({
    employee,
    isExpanded,
    onToggleExpansion,
    onUpdateEmployee,
    onDeleteEmployee,
    isPending,
}: EmployeeRowProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isActioned, setIsActioned] = useState(false);
    const actionMenuRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<EmployeeFormData>({
        mode: 'onChange',
        resolver: zodResolver(employeeSchema),
    });

    //button actions
    const handleToggleExpansion = () => {
        onToggleExpansion(employee.id);
    };

    const handleToggleActions = () => {
        setIsActioned(prev => !prev);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setIsActioned(false);
        // Сбрасываем форму с текущими данными
        reset({
            name: employee.name,
            position: employee.position,
            phone: employee.phone,
            email: employee.email,
            startDate: employee.startDate || new Date(),
            status: employee.status,
        });
    };

    const handleCancelEdit = () => setIsEditing(false);

    const handleSubmitEdit: SubmitHandler<EmployeeFormData> = data => {
        onUpdateEmployee(employee.id, data);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDeleteEmployee(employee.id);
        setIsActioned(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                actionMenuRef.current &&
                !actionMenuRef.current.contains(event.target as Node)
            ) {
                setIsActioned(false);
            }
        };

        if (isActioned) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActioned]);

    return (
        <>
            <TableRow>
                {isEditing ? (
                    <TableCell colSpan={TABLE_COLUMNS.length}>
                        <EmployeeEditForm
                            register={register}
                            control={control}
                            errors={errors}
                            onSubmit={handleSubmit(handleSubmitEdit)}
                            onCancel={handleCancelEdit}
                            isPending={isPending}
                        />
                    </TableCell>
                ) : (
                    <EmployeeRowView
                        employee={employee}
                        isExpanded={isExpanded}
                        isActioned={isActioned}
                        onToggleExpansion={handleToggleExpansion}
                        onToggleActions={e => {
                            e.stopPropagation();
                            handleToggleActions();
                        }}
                        onEdit={handleEdit}
                        onDeleteEmployee={handleDelete}
                        isPending={isPending ?? false}
                        actionMenuRef={actionMenuRef}
                    />
                )}
            </TableRow>

            <CollapsibleRow
                employee={employee}
                isRowExpanded={isExpanded || isEditing}
                isEmployeeEditing={isEditing}
                colSpanCount={TABLE_COLUMNS.length}
                errors={errors}
                register={register}
            />
        </>
    );
};

export default EmployeeRow;
