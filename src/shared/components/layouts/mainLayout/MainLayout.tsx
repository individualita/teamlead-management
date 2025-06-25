import { useEffect } from 'react';

//store
import { useActiveTab, useOpenTabs, setActiveTab, closeTab } from '../../../stores/tabsStore';

//hooks
import { setAllEmployees, useEmployeeById } from '../../../stores/employeesStore';
import { useEmployeesQuery } from '../../../hooks/useEmployeesQuery';

import { LoadingCircle } from '../loadingCircle/LoadingCircle';
import HeaderSection from './components/headerSection/HeaderSection';
import ContentSection from './components/contentSection/ContentSection';
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

    return (
        <div className='h-dvh'>
            <HeaderSection />
            <main className='flex flex-col-reverse md:flex md:flex-row h-full'>

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