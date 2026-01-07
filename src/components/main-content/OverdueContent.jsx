import {useTaskView} from "../../context/TaskViewContext.jsx";
import {ContentHeading} from "./ContentHeading.jsx";
import {TaskList} from "./TaskList.jsx";
import {TaskButton} from "./TaskButton.jsx";

export function OverdueContent() {
    const {tasks, count} = useTaskView();

    return (
        <div className="flex flex-col min-h-0">
            <ContentHeading count={count.overdue}>Overdue</ContentHeading>
            {count.overdue === 0 ? (
                <div className="flex-1 text-center content-center text-xl font-semibold text-base-content/40">
                    No Overdue Tasks
                </div>
            ) : (
                <TaskList>
                    {tasks.overdue.map(task => {
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