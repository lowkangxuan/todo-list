import {SectionTab} from "./SectionTab.jsx";
import {ChevronsRight, List} from "lucide-react";

export function GeneralSection() {
    return (
        <ul className="menu bg-base-200 rounded-box w-56 p-0">
            <li className="menu-title px-0 text-xs uppercase">General</li>
            <li><SectionTab id="upcoming" icon={<ChevronsRight size="20" />} count="1">Upcoming</SectionTab></li>
            <li><SectionTab id="today" icon={<List size="20" />} count="1">Today</SectionTab></li>
        </ul>
    )
}