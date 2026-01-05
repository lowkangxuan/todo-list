import {SectionTab} from "./SectionTab.jsx";
import {ChevronsRight, List} from "lucide-react";
import {SectionList} from "./SectionList.jsx";

export function GeneralSection() {
    return (
        <SectionList title="General">
            <li><SectionTab id="upcoming" icon={<ChevronsRight size="20" />} count="1">Upcoming</SectionTab></li>
            <li><SectionTab id="today" icon={<List size="20" />} count="1">Today</SectionTab></li>
        </SectionList>
    )
}