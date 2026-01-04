import {SectionTab} from "./SectionTab.jsx";
import {ChevronsRight, List} from "lucide-react";

export function ProjectSection() {
    return (
        <ul className="menu bg-base-200 rounded-box w-56 p-0">
            <li className="menu-title px-0 text-xs uppercase">Lists</li>
            <li><SectionTab id="personal"
                            icon={<ChevronsRight size="20" />}
                            count="1"
                >Personal</SectionTab>
            </li>
            <li><SectionTab id="" icon={<List size="20" />} count="1">Work</SectionTab></li>
        </ul>
    )
}