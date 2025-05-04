import { Outlet, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { useEmployeeStore } from '../../../stores/employeesStore';
import { useTabsStore } from '../../../stores/tabsStore';

import { getPageTitle } from '../../../utils/getPageTitle';

import { OUTLET_TAB } from '../../../constants/outletTab';

import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import TabsHeader  from '../../tabsHeader/TabsHeader';
import EmployeeProfile from '../../EmployeeProfile';



const MainLayout = () => {

    const { employees } = useEmployeeStore();
    const { openTabs, activeTab, setActiveTab } = useTabsStore();

    const { pathname } = useLocation();
    
    const activeEmployee = employees.find(emp => emp._id === activeTab);

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
                        />

                    </div>

                    <div className='container mx-auto pt-3'>
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