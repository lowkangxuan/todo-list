import {createContext, useContext, useState} from "react";

const TabStateProvider = createContext(null);
const TabDispatchProvider = createContext(null);

export function TabContext({children}) {
    const [activeTab, setActiveTab] = useState("today");

    return (
        <TabStateProvider value={activeTab}>
            <TabDispatchProvider value={setActiveTab}>
                {children}
            </TabDispatchProvider>
        </TabStateProvider>
    )
}

export function useActiveTab() {
    const context = useContext(TabStateProvider);
    if (!context) throw new Error("useTab must be used within a TabContext");
    return context;
}

export function useSetActiveTab() {
    const context = useContext(TabDispatchProvider);
    if (!context) throw new Error("useTab must be used within a TabContext");
    return context;
}