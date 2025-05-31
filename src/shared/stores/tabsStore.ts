import { create } from 'zustand';

import { Employee } from '../types';

import { OUTLET_TAB } from '../constants/outletTab';


interface TabsState {
    activeTab: string,
    setActiveTab: (id: string) => void,

    openTab: (employee: Employee) => void,
    openTabs: Employee[],

    closeTab: (employee: Employee) => void,
}


export const useTabsStore = create<TabsState>((set => ({

    activeTab: OUTLET_TAB,
    setActiveTab: (tab) => 
        set({activeTab: tab}),

    openTabs: [],

    openTab: (employee) => 
        set(state => ({
            openTabs: state.openTabs.some(item => item.id === employee.id) ? state.openTabs : [...state.openTabs, employee],
            activeTab: employee.id,
        })),
        

    closeTab: (employee) =>
        set(state => ({
            openTabs: state.openTabs.filter(item => item.id !== employee.id),
            activeTab: state.activeTab === employee.id? OUTLET_TAB: state.activeTab
        }))


})))