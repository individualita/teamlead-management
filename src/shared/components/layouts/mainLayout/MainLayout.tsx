import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//hooks
import { useEmployeeStore } from '../../../stores/employeesStore';
import { useTabsStore } from '../../../stores/tabsStore';
import { useEmployeesQuery } from '../../../hooks/useEmployeesQuery';

import { getPageTitle } from '../../../utils/getPageTitle';
import { OUTLET_TAB } from '../../../constants/outletTab';

import { LoadingCircle } from '../loadingCircle/LoadingCircle';
import { ErrorMessage } from '../../ErrorMessage';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import TabsHeader  from '../../tabs/TabsHeader';
import EmployeeProfile from '../../../../features/employees/components/EmployeeProfile';


const MainLayout = () => {

    const {isLoading, isError, data: employees, error} = useEmployeesQuery();
    const { setEmployees } = useEmployeeStore();
    const { openTabs, activeTab, setActiveTab, closeTab } = useTabsStore();

    const { pathname } = useLocation();
    
    const activeEmployee = employees?.find(emp => emp.id === activeTab);

    useEffect(() => {
        if (employees) setEmployees(employees);
    }, [employees]);


    if (isLoading ) return <LoadingCircle />;

    return (
        <div className='h-dvh'>
            <Header />

            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <main className='flex h-full'>

                {/* либо флекс бейсис 260*/}
                <Sidebar  />
                

                <div className='content grow-1 px-6'>

                    <h1 className='text-lg font-bold mt-3'>{getPageTitle(pathname)}</h1>

                    <div 
                        className='flex gap-4 mt-2'
                        role='tablist' 
                        aria-label='Employee Tabs'
                    >

                        <TabsHeader 
                            openTabs={openTabs} 
                            activeTab={activeTab} 
                            onTabSelect={setActiveTab}
                            onCloseTab={closeTab}
                        />

                    </div>

                    <div className='container mx-auto pt-3'>
                        {isError && <ErrorMessage message={error.message}/> }
                        {activeTab === OUTLET_TAB ? 
                            <Outlet /> 
                            : 
                            <EmployeeProfile employee={activeEmployee}/> 
                        }

                    </div>

                </div>

            </main>

        </div>
    )
}

export default MainLayout;