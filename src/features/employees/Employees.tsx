import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const createData = (name: string, role: string, phone: string, email: string, employmentDate: string) => {
    return {name, role, phone, email, employmentDate}
}


type Employee = {
    _id: number,
    name: string;
    position: string;
    phone: string;
    email: string;
    startDate: string;
};

const EMPLOYEES: Employee[] = [
    {
        _id: 1,
        name: 'Lucia Morales',
        position: 'Sales Representative',
        phone: '+34 654 321 987',
        email: 'lucia.morales@barcelonamail.org',
        startDate: '12/03/2020'
    },
    {
        _id: 2,
        name: 'Aleksandr Orlov',
        position: 'Software Engineer',
        phone: '+7 911 654 3210',
        email: 'a.orlov@sibir-post.com',
        startDate: '05/07/2018'
    },
    {
        _id: 3,
        name: 'Tobias Weber',
        position: 'Data Analyst',
        phone: '+49 152 789 6543',
        email: 't.weber@hamburg-mail.net',
        startDate: '23/09/2019'
    },
    {
        _id: 4,
        name: 'Jakub Nowak',
        position: 'Marketing Specialist',
        phone: '+48 601 234 567',
        email: 'jakub.nowak@warszawamail.pl',
        startDate: '17/06/2021'
    },
    {
        _id: 5,
        name: 'Camille Laurent',
        position: 'HR Manager',
        phone: '+33 612 345 678',
        email: 'camille.lefevre@lyonpost.fr',
        startDate: '11/02/2022'
    },
    {
        _id: 6,
        name: 'Mateo Rossi',
        position: 'Product Designer',
        phone: '+39 328 765 4321',
        email: 'matteo.rossi@roma-mail.it',
        startDate: '30/08/2020'
    },
    {
        _id: 7,
        name: 'Leonardo Bianchi',
        position: 'Financial Advisor',
        phone: '+39 329 123 4567',
        email: 'leonardo.bianchi@napoli-post.it',
        startDate: '14/11/2017'
    },
    {
        _id: 8,
        name: 'Emily Smith',
        position: 'Customer Support',
        phone: '+44 7911 123456',
        email: 'emily.smith@londonpost.uk',
        startDate: '04/04/2019'
    },
    {
        _id: 9,
        name: 'Petr Ivanov',
        position: 'IT Administrator',
        phone: '+7 916 987 6543',
        email: 'p.ivanov@moskva-net.ru',
        startDate: '29/05/2016'
    },
    {
        _id: 10,
        name: 'Magdalena Zielinska',
        position: 'Project Manager',
        phone: '+48 602 987 654',
        email: 'm.zielinska@gdansknet.pl',
        startDate: '09/12/2020'
    }
];


/*
const employeeTableColumns = [... new Set(EMPLOYEES.flatMap(item => Object.keys(item)))];*/

const employeeTableColumns = Object.keys(EMPLOYEES[0]).filter(item => item!== '_id');



const Employees = () => {
    return (
        <div className='employees'>

            <div className='container mx-auto p-6'>


                {/* desktop size */}
                <div className='overflow-x-auto rounded-lg shadow-md hidden md:block'>
                    <table className='min-w-full bg-white border border-gray-200'>

                        <thead>
                            <tr className='bg-gray-100 text-left text-gray-600 uppercase text-sm font-semibold'>
                                {employeeTableColumns.map(col => (
                                    <th key={col} className='px-6 py-3 col border-b'>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        
                        <tbody className='text-gray-700'>
                            {/* stroka s rabotnikom*/}
                            {EMPLOYEES.map(item => (

                                <tr key={item._id} className='border-b hover:bg-gray-50'>
                                    
                                    {employeeTableColumns.map(col => (
                                        <td key={col} className='px-6 py-4 border-b'>{item[col as keyof Employee]}</td>

                                    ))}


                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* card view for mobile size */}
                <div className='block md:hidden space-y-4'>
                    
                    {EMPLOYEES.map(item => (
                        <div key ={item._id} className='bg-white p-4 rounded-lg shadow-md border border-gray-200'>

                            <p className='text-lg font-semibold'>{item.name}</p>
                            <p className='text-gray-600'>{item.position}</p>
                            <address className='text-gray-500'>{item.email}</address>
                            <p className='text-gray-400 text-sm'>start date:{item.startDate}</p>

                        </div>                        
                    ))}

                </div>
            </div>


            

        </div>
    )
}

export default Employees;