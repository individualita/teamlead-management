import { z } from 'zod';

export const employeeSchema = z.object({
    name: z.string().min(2, 'At least 2 characters long'),
    position: z.string().min(2, 'At least 2 characters long'),
    startDate: z.date({message:'Start date is required'}), 
    status: z.string().nonempty('Status is required'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().regex(/^\+?\d{9,15}$/, 'Phone number must be 9 to 15 digits and may start with "+"'),
});

