import {useActiveTab} from "../../context/TabContext.jsx";
import {UpcomingContent} from "./UpcomingContent.jsx";
import {TodayContent} from "./TodayContent.jsx";
import {ProjectContent} from "./ProjectContent.jsx";

export function MainContent() {
    const activeTab = useActiveTab();

    function contentToRender() {
        switch (activeTab) {
            case "upcoming":
                return <UpcomingContent />;
            case "today":
                return <TodayContent />;
            default:
                return <ProjectContent id={activeTab} />;
        }
    }

    return (
        <>
            {contentToRender()}
        </>
    )
}