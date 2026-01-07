import {CalendarX, ChevronRight} from "lucide-react";
import {format, isValid, parseISO} from "date-fns";
import {useTask} from "../../context/ProjectContext.jsx";

export function TaskButton({data, projectID, projectName, children, onClick = () => {}}) {
    const {completeTask} = useTask();

    function setTaskComplete(e) {
        if (projectID === undefined) {
            console.warn("No project ID specified");
            return;
        }

        completeTask(projectID, data.id, e.target.checked);
    }

    return (
        <button className="flex items-center gap-4 text-left p-3 text-base-content/75" onClick={onClick}>
            <input type="checkbox"
                   className="checkbox checkbox-sm checkbox-accent"
                   checked={data.isCompleted}
                   onChange={(e) => {
                       e.stopPropagation();
                       setTaskComplete(e);
                   }}
                   onClick={(e) => e.stopPropagation()}
            />
            <div className="flex flex-col gap-1 flex-1">
                {children}
                <div className="flex text-sm">
                    {isValid(parseISO(data.dueDate)) && <div className="flex items-center gap-1"><CalendarX className="inline" size="20" />{format(data.dueDate, "dd-MM-yyyy")}</div>}
                    <div className="divider divider-horizontal"></div>
                    {projectName}
                </div>
            </div>
            <ChevronRight className="ml-auto"/>
        </button>
    )
}