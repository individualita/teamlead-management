import { create } from 'zustand';

import { Employee } from '../types/employee';

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
            openTabs: state.openTabs.some(item => item._id === employee._id) ? state.openTabs : [...state.openTabs, employee],
            activeTab: employee._id,
        })),
        

    closeTab: (employee) =>
        set(state => ({
            openTabs: state.openTabs.filter(item => item._id !== employee._id),
            activeTab: state.activeTab === employee._id? OUTLET_TAB: state.activeTab
        }))


})))