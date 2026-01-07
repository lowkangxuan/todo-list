import {ContentHeading} from "./ContentHeading.jsx";
import {useTaskView} from "../../context/TaskViewContext.jsx";
import {TaskButton} from "./TaskButton.jsx";
import {TaskList} from "./TaskList.jsx";

export function TodayContent() {
    const {tasks, count} = useTaskView();

    return (
        <div className="flex flex-col min-h-0">
            <ContentHeading count={count.today}>Today</ContentHeading>
            {count.today === 0 ? (
                <div className="flex-1 text-center content-center text-xl font-semibold text-base-content/40">
                    No Pending Tasks For Today
                </div>
            ) : (
                <TaskList>
                    {tasks.today.map(task => {
                        return (
                            <TaskButton key={task.id}
                                        data={task}
                                        projectID={task.projectID}
                                        projectName={task.projectName}
                            >
                                {task.name}
                            </TaskButton>
                        )
                    })}
                </TaskList>
            )}

        </div>
    )
}