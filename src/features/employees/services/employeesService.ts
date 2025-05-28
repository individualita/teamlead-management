import {getDocs, addDoc, deleteDoc, updateDoc,  collection, doc } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';

import { Employee } from '../../../shared/types';

export interface updateEmployee {
    employeeId: string,
    data: Partial<Employee>,
}

export const employeesService = {

    fetchEmployeesFromFirestore: async () => {

        try {
            const querySnapshot = await getDocs(collection(db, 'employees'));

            const employees: Employee[] = querySnapshot.docs.map((doc) => {

                const {startDate} = doc.data();

                return {
                    ...(doc.data() as Omit<Employee, 'id' | 'startDate'>),
                    id: doc.id,
                    startDate: startDate.toDate(), //преобразуем из Timestamp в Date
                }

            });
            
            return employees;

        } catch (error) {
            console.error('Failed to fetch employees', error);
            throw new Error('Could not fetch employees. Please try again later.');
        }

    },

    addEmployeeToFirestore: async (employeeData: Omit<Employee, 'id'>) => {
        try {
            const docRef = await addDoc(collection(db, 'employees'), employeeData);
            return {id: docRef.id, ...employeeData} as Employee;
        } catch (error) {
            console.error('Error adding employee:', error);
            throw error;
        }

    },

    deleteEmployeeFromFirestore: async (employeeId: string) => {
        try {
            await deleteDoc(doc(db, 'employees', employeeId));
        } catch (error) {
            console.error('Error deleting employee:', error);
            throw error;
        }
    },

    updateEmployeeInFirestore: async ({employeeId, data}: updateEmployee) => {

        try {
            const taskRef = doc(db, 'employees', employeeId);
            await updateDoc(taskRef, {...data});
    
            return {id: employeeId, ...data};  
        } catch (error) {
            console.error('Error updating employee:', error);
            throw error;
        }
    },
        
}

