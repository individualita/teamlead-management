import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FaPencil } from 'react-icons/fa6';
import { IoTrash } from 'react-icons/io5';

//types
import { Employee } from '@/shared/types';
import { EmployeeFormData } from '../types';

//utils
import { formatDate } from '@/shared/utils/formatDate';
import { employeesService } from '@/shared/services/employeesService';

//store
import {
    modifyEmployee,
    removeEmployee,
} from '@/shared/stores/employeesStore';

//hooks
import { useDeleteMutation } from '@/shared/hooks/useDeleteMutation';
import { useUpdateEmployee } from '../hooks/useUpdateEmployee';

import { employeeSchema } from '../schema/employee.schema';

//components
import ActionButton from './ActionButton';
import EmployeeEditForm from './EmployeeEditForm';

interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    // State
    const [isEditing, setIsEditing] = useState(false);

    // Hooks
    const updateEmployeeMutation = useUpdateEmployee();
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

    // Handlers
    const handleCancelEdit = () => setIsEditing(false);

    const deleteEmployeeMutation = useDeleteMutation({
        mutationFn: employeesService.deleteEmployeeFromFirestore,
        queryKey: ['employees'],
    });

    const handleDeleteEmployee = () => {
        deleteEmployeeMutation.mutate(employee.id, {
            onSuccess: () => {
                removeEmployee(employee.id); //zustand
            },
            onError: error => {
                toast.error(error.message);
            },
        });
    };

    const handleUpdateEmployee = (
        employeeId: string,
        data: Partial<Employee>,
    ) => {
        updateEmployeeMutation.mutate(
            { data, employeeId },
            {
                onSuccess: () => modifyEmployee(employeeId, data), //zustand
                onError: error => toast.error(error.message),
            },
        );
    };

    const handleEdit = () => {
        setIsEditing(true);
        reset({
            name: employee.name,
            position: employee.position,
            phone: employee.phone,
            email: employee.email,
            startDate: employee.startDate || new Date(),
            status: employee.status,
        });
    };

    const handleSubmitEdit: SubmitHandler<EmployeeFormData> = data => {
        handleUpdateEmployee(employee.id, data);
        setIsEditing(false);
    };

    const formattedDate = formatDate(employee.startDate);

    return (
        <div className='flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-4'>
            {isEditing ? (
                <EmployeeEditForm
                    register={register}
                    control={control}
                    errors={errors}
                    onSubmit={handleSubmit(handleSubmitEdit)}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <>
                    <div className='flex flex-col gap-1'>
                        <p className='text-base md:text-lg font-semibold'>
                            {employee.name}
                        </p>
                        <p className='text-inactive'>{employee.position}</p>
                        <address className='text-xs text-inactive opacity-85'>
                            {employee.email}
                        </address>
                        <p className='text-gray-400 text-sm'>
                            start: {formattedDate}
                        </p>
                    </div>

                    <div className='flex flex-col'>
                        <ActionButton
                            onClick={handleEdit}
                            ariaLabel='Edit employee'
                            text='Edit'
                            icon={<FaPencil className='text-base md:text-lg' />}
                        />

                        <ActionButton
                            onClick={handleDeleteEmployee}
                            ariaLabel='Delete employee'
                            text='Delete'
                            icon={
                                <IoTrash className='text-base :text-lg text-red-600' />
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default EmployeeCard;
