import {SectionTab} from "./SectionTab.jsx";
import {ChevronsRight, List} from "lucide-react";

export function SectionList({title, children}) {
    return (
        <>
            <ul className="menu bg-base-200 rounded-box w-56 p-0 gap-1">
                {(title !== undefined || title !== "")
                    && <li className="menu-title px-0 text-xs uppercase">{title}</li>}
                {children}
            </ul>
        </>
    )
}