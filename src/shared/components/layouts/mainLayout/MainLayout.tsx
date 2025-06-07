import { useEffect } from 'react';

//hooks
import { useEmployeeStore } from '../../../stores/employeesStore';
import { useTabsStore } from '../../../stores/tabsStore';
import { useEmployeesQuery } from '../../../hooks/useEmployeesQuery';

import { LoadingCircle } from '../loadingCircle/LoadingCircle';
import HeaderSection from './headerSection/HeaderSection';
import Sidebar from './sidebar/Sidebar';
import ContentSection from './contentSection/ContentSection';


const MainLayout = () => {

    const {isLoading, isError, data: employees, error} = useEmployeesQuery();
    const { setEmployees } = useEmployeeStore();
    const { activeTab, openTabs,  setActiveTab, closeTab  } = useTabsStore();

    const activeEmployee = employees?.find(emp => emp.id === activeTab);

    useEffect(() => {
        if (employees) setEmployees(employees);
    }, [employees]);


    if (isLoading ) return <LoadingCircle />;

    return (
        <div className='h-dvh'>
            <HeaderSection />

            <main className='flex h-full'>

                {/* либо флекс бейсис 260*/}
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