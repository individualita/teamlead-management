import { Outlet, useLocation } from 'react-router-dom';

import { useEmployeeStore } from '../../../stores/employeesStore';
import { useTabsStore } from '../../../stores/tabsStore';

import { getPageTitle } from '../../../utils/getPageTitle';

import { OUTLET_TAB } from '../../../constants/outletTab';

import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import EmployeeProfile from '../../../../features/employees/components/employeeProfile/EmployeeProfile';


const MainLayout = () => {

    const { employees } = useEmployeeStore();
    const { openTabs, activeTab, setActiveTab } = useTabsStore();

    const { pathname } = useLocation();
    
    const activeEmployee = employees.find(emp => emp._id === activeTab);

    return (
        <div className='h-dvh'>
            <Header />

            <main className='flex h-full'>

                {/* либо флекс бейсис 260*/}
                <Sidebar  />
                


                <div className='content grow-1'>
                    <h1 className='text-lg font-bold'>{getPageTitle(pathname)}</h1>

                    <div className='flex gap-2'>

                        {openTabs.length >= 1 && 
                            <div 
                                onClick={() => setActiveTab(OUTLET_TAB)}
                                className={`${activeTab === OUTLET_TAB? 'font-bold': ''} bg-gray-100 text-xs p-1 rounded-xl cursor-pointer`} 
                            >
                                {getPageTitle(pathname)}
                            </div>}

                        {openTabs.map((tab => (
                            <div 
                                key={tab._id}
                                onClick={() => setActiveTab(tab._id)} 
                                className={`${tab._id === activeTab? 'font-bold': '' } bg-gray-100 text-xs p-1 rounded-xl  cursor-pointer`} 
                            >
                                    {tab.name} 
                            </div>
                        )))}

                    </div>
                    
                    {activeTab === OUTLET_TAB ? 
                        <Outlet /> 
                        : 
                        <EmployeeProfile employee={activeEmployee}/> 
                    }
                </div>

            </main>

        </div>
    )
}

export default MainLayout;