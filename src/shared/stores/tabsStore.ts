import { create, StateCreator } from 'zustand';
import { Employee } from '../types';

import { OUTLET_TAB } from '../constants/outletTab';

interface TabsInitialState {
    activeTab: string,
    openTabs: Employee[],
}

interface TabsActions {
    setActiveTab: (id: string) => void,
    openTab: (employee: Employee) => void,
    closeTab: (employee: Employee) => void,
}

interface TabsState extends TabsInitialState, TabsActions {};

const tabsStore: StateCreator<TabsState> = ((set => ({
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


export const useTabsStore = create(tabsStore);
//selectors
export const useActiveTab = () => useTabsStore(state => state.activeTab);
export const useOpenTabs = () => useTabsStore(state => state.openTabs);

//action creators
export const setActiveTab = (id: string) => useTabsStore.getState().setActiveTab(id);
export const openTab = (employee: Employee) => useTabsStore.getState().openTab(employee); 
export const closeTab = (employee: Employee) => useTabsStore.getState().closeTab(employee);
