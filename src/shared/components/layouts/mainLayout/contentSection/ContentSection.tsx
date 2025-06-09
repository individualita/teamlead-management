import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//types
import { Employee } from '../../../../types';

//utils + constants
import { getPageTitle } from '../../../../utils/getPageTitle';
import { OUTLET_TAB } from '../../../../constants/outletTab';

//components
import { ErrorMessage } from '../../../ErrorMessage';
import EmployeeProfile from '../../../EmployeeProfile';
import TabsHeader from '../../../tabs/TabsHeader';


interface ContentSectionProps {
    activeEmployee: Employee | undefined,
    isError: boolean,
    error: Error | null,
    openTabs: Employee[];
    activeTab: string;
    setActiveTab: (id: string) => void;
    closeTab: (employee: Employee) => void;
}
const ContentSection = ({activeEmployee, isError,  error, openTabs, activeTab, setActiveTab, closeTab}: ContentSectionProps) => {

    const { pathname } = useLocation();

    return (
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
                {isError && <ErrorMessage message={error?.message}/> }
                {activeTab === OUTLET_TAB ? 
                    <Outlet /> 
                    : 
                    <EmployeeProfile employee={activeEmployee}/> 
                }

            </div>

        </div>
    )
}

export default ContentSection;