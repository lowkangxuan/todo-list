import {Sidebar} from "./Sidebar/Sidebar.jsx";
import {Main} from "./Main.jsx";
import {createContext, useState} from "react";

const SetTabContext = createContext(null);
const TabContext = createContext(null);

export function Layout() {
    const [selectedTab, setSelectedTab] = useState(null);

    return (
        <div className="grid h-full flex-1" style={{gridTemplateColumns: "auto 10fr"}}>
            <TabContext value={selectedTab}>
                <SetTabContext value={setSelectedTab}>
                    <Sidebar />
                </SetTabContext>
                <Main />
            </TabContext>

        </div>
    )
}