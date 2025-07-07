import { useEffect } from 'react';

//store
import { useActiveTab, useOpenTabs, setActiveTab, closeTab } from '@/shared/stores/tabsStore';

//hooks
import { setAllEmployees, useEmployeeById } from '@/shared/stores/employeesStore';
import { useEmployeesQuery } from '@/shared/hooks/useEmployeesQuery';

import { LoadingCircle } from '../LoadingCircle';
import HeaderSection from './components/HeaderSection';
import ContentSection from './components/ContentSection';
import Sidebar from '../sidebar/Sidebar';


const MainLayout = () => {

    const {isLoading, isError, data: employees, error} = useEmployeesQuery();
    //tabs
    const openTabs = useOpenTabs();
    const activeTab = useActiveTab();
    
    const activeEmployee = useEmployeeById(activeTab);

    useEffect(() => {
        if (employees) setAllEmployees(employees);
    }, [employees]);


    if (isLoading ) return <LoadingCircle />;
//h-dvh flex flex-col
    return (
        <div className='h-dvh flex flex-col' role='application'>
            <HeaderSection />
            <main className='flex flex-col-reverse md:flex md:flex-row flex-grow'>

                <Sidebar  />
                
                <ContentSection 
                    activeEmployee={activeEmployee} 
                    isError={isError}
                    error={error}
                    openTabs={openTabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    closeTab={closeTab}
                />

            </main>

        </div>
    )
}

export default MainLayout;