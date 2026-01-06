import {CalendarX, ChevronRight} from "lucide-react";
import {format} from "date-fns";

export function TaskButton({data, isCompleted=false, children, onClick = () => {}, onCheck = () => {}}) {
    return (
        <button className="flex items-center gap-4 text-left p-3" onClick={onClick}>
            <input type="checkbox"
                   className="checkbox checkbox-sm checkbox-accent"
                   checked={data.isCompleted}
                   onChange={(e) => {
                       e.stopPropagation();
                       onCheck(e);
                   }}
                   onClick={(e) => e.stopPropagation()}
            />
            <div className="flex flex-col gap-1 flex-1">
                {children}
                <div><CalendarX className="inline"/>{format(data.dueDate, "dd-MM-yyyy")}</div>
            </div>
            <ChevronRight className="ml-auto"/>
        </button>
    )
}