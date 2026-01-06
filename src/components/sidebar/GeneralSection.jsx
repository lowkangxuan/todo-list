import {SectionTab} from "./SectionTab.jsx";
import {Calendar1, ChevronsRight, ClockAlert, List} from "lucide-react";
import {SectionList} from "./SectionList.jsx";
import {useTaskView} from "../../context/TaskViewContext.jsx";

export function GeneralSection() {
    const {count} = useTaskView();

    return (
        <SectionList title="General">
            <li><SectionTab id="upcoming" icon={<ChevronsRight size="20" />} count={count.upcoming}>Upcoming</SectionTab></li>
            <li><SectionTab id="today" icon={<Calendar1 size="20" />} count={count.today}>Today</SectionTab></li>
            <li><SectionTab id="overdue" icon={<ClockAlert size="20" />} count={count.today}>Overdue</SectionTab></li>
        </SectionList>
    )
}