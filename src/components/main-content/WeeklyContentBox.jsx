import {Heading} from "../Heading.jsx";
import {TaskList} from "./TaskList.jsx";
import {TaskButton} from "./TaskButton.jsx";

export function WeeklyContentBox({className="", tasks, children}) {
    return (
        <div className={`${className} flex flex-col gap-2 rounded-box border-2 border-base-300 p-4 min-h-0`}>
            <Heading as="h2">{children}</Heading>
            {tasks.length === 0 ? (
                <div className="flex-1 text-center content-center text-xl font-semibold text-base-content/40">
                    No Pending Tasks
                </div>
            ) : (
                <TaskList>
                    {tasks.map(task => (
                        <TaskButton key={task.id}
                                    data={task}
                                    projectID={task.projectID}
                                    projectName={task.projectName}
                        >
                            {task.name}
                        </TaskButton>
                    ))}
                </TaskList>
            )}
        </div>
    )
}