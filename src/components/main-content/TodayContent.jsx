import {ContentHeading} from "./ContentHeading.jsx";
import {useTaskView} from "../../context/TaskViewContext.jsx";
import {TaskButton} from "./TaskButton.jsx";

export function TodayContent() {
    const {tasks, count} = useTaskView();

    return (
        <div>
            <ContentHeading count={count.today}>Today</ContentHeading>
            <div className="flex flex-col divide-y-2 divide-base-300 h-full">
                {tasks.today.map(task => {
                    return (
                        <TaskButton key={task.id} data={task}>{task.name}</TaskButton>
                    )
                })}
            </div>
        </div>
    )
}