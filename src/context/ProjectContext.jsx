import {createContext, useContext, useEffect, useReducer} from "react";
import {addDays, format} from "date-fns";

const ProjectProvider = createContext(null);
const TaskProvider = createContext(null);

function loadFromLocalStorage() {
    try {
        const raw = localStorage.getItem("projects");
        if (!raw) return {};
        return JSON.parse(raw);
    } catch {
        return {};
    }
}

function projectReducer(projects, action) {
    function projectTemplate() {
        return {
            id: crypto.randomUUID(),
            name: createUniqueName(),
            tasks: {},
        }
    }

    function taskTemplate() {
        return {
            id: crypto.randomUUID(),
            name: "Task",
            description: "",
            dueDate: format(new Date(), "yyyy-MM-dd"),
            isCompleted: false,
        }
    }

    function createUniqueName() {
        const used = new Set(
            Object.values(projects).map(p => p.name)
        );

        let i = 1;
        while (used.has(`Project ${i}`)) {
            i++;
        }

        return `Project ${i}`;
    }

    switch(action.type) {
        case "CREATE_PROJECT": {
            const newProject = projectTemplate();
            return {
                ...projects,
                [newProject.id]: newProject,
            };
        }

        case "EDIT_PROJECT": {
            const {projectID, newName} = action.payload;
            return {
                ...projects,
                [projectID]: {
                    ...projects[projectID],
                    name: newName,
                }
            };
        }

        case "DELETE_PROJECT": {
            const {projectID} = action.payload;
            if (!projects[projectID]) return projects;

            const { [projectID]: _, ...rest } = projects;
            return rest;
        }

        case "CREATE_TASK": {
            const {projectID} = action.payload;
            const newTask = taskTemplate();

            return {
                ...projects,
                [projectID]: {
                    ...projects[projectID],
                    tasks: {
                        ...projects[projectID].tasks,
                        [newTask.id]: newTask,
                    },
                }
            };
        }

        case "SAVE_TASK": {
            const {projectID, taskID, draft} = action.payload;
            return {
                ...projects,
                [projectID]: {
                    ...projects[projectID],
                    tasks: {
                        ...projects[projectID].tasks,
                        [taskID]: draft,
                    }
                }
            }
        }

        case "DELETE_TASK": {
            const {projectID, taskID} = action.payload;
            const { [taskID]: _, ...rest } = projects[projectID].tasks;

            return {
                ...projects,
                [projectID]: {
                    ...projects[projectID],
                    tasks: {
                        ...rest,
                    }
                }
            }
        }

        case "COMPLETE_TASK": {
            const {projectID, taskID, markCompleted} = action.payload;

            return {
                ...projects,
                [projectID]: {
                    ...projects[projectID],
                    tasks: {
                        ...projects[projectID].tasks,
                        [taskID]: {
                            ...projects[projectID].tasks[taskID],
                            isCompleted: markCompleted,
                        }
                    }
                }
            };
        }

        default:
            console.error("Unknown action type: ", action.type);
            return projects;
    }
}

export function ProjectContext({children}) {
    const [projects, dispatch] = useReducer(projectReducer, {}, loadFromLocalStorage);

    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    function completeTask(projectID, taskID, markCompleted) {
        dispatch({
            type: "COMPLETE_TASK",
            payload: {projectID, taskID, markCompleted},
        });
    }

    return (
        <ProjectProvider value={{projects, dispatch}}>
            <TaskProvider value={{completeTask}}>
                {children}
            </TaskProvider>
        </ProjectProvider>
    )
}

export function useProject() {
    const context = useContext(ProjectProvider);
    if (!context) throw new Error("useProject must be used within a ProjectContext");
    return context;
}

export function useTask() {
    const context = useContext(TaskProvider);
    if (!context) throw new Error("useTask must be used within a ProjectContext");
    return context;
}