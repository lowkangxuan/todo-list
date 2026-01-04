import {useContext} from "react";

export function SectionTab({id, icon, count, children}) {
    const currTab = useContext(TabContext);
    const setTab = useContext(SetTabContext);

    function handleTabSwap() {
        setTab(id);
    }

    return (
        <button className={currTab === id ? "menu-active" : ""} onClick={handleTabSwap}>
            {icon}
            {children}
            <span className="ml-auto">{count > 0 && count}</span>
        </button>
    )
}