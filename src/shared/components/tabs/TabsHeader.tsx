import { useLocation } from 'react-router-dom';

import { Employee } from '../../types/employee.types';

import { getPageTitle } from '../../utils/getPageTitle';

import { OUTLET_TAB } from '../../constants/outletTab';

import TabsItem from './TabsItem';


interface TabsHeaderProps {
    openTabs: Employee[],
    activeTab: string,
    onTabSelect: (tabId: string) => void,
    onCloseTab: (employee: Employee) => void,

}

const TabsHeader = ({openTabs, activeTab, onTabSelect, onCloseTab}: TabsHeaderProps) => {

    const { pathname } = useLocation();

    return (
        
        <>
            {/* Render the outlet (default) tab */}
            {openTabs.length >= 1 && (
                <TabsItem 
                    key={OUTLET_TAB} 
                    tabId={OUTLET_TAB} 
                    tabName={getPageTitle(pathname)} 
                    isActive={activeTab === OUTLET_TAB} 
                    onSelect={onTabSelect}
                />
            )}


            {/* Render dynamic employee tabs */}
            {openTabs.map(tab => (
                <TabsItem 
                    key={tab.id} 
                    tabId={tab.id} 
                    tabName={tab.name} 
                    isActive={tab.id === activeTab} 
                    onSelect={onTabSelect}
                    onClose={() => onCloseTab(tab)}
                />
            ))}

        </>
    )

}

export default TabsHeader; 