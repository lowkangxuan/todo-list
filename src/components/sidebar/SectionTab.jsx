import {useActiveTab, useSetActiveTab} from "../../context/TabContext.jsx";

export function SectionTab({id, icon, count, children, onClick}) {
    const activeTab = useActiveTab();
    const setActiveTab = useSetActiveTab();

    function handleClick() {
        if (onClick !== undefined) onClick();
        if (id !== undefined) {
            setActiveTab(id);
        }
    }

    return (
        <button className={activeTab === id ? "menu-active" : ""} onClick={handleClick}>
            {icon}
            {children}
            <span className="ml-auto">{count > 0 && count}</span>
        </button>
    )
}