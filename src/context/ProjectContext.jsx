import {createContext, useContext, useReducer} from "react";

const ProjectProvider = createContext(null);

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
            dueDate: new Date(),
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
            const {id, newName} = action.payload;
            return {
                ...projects,
                [id]: {
                    ...projects[id],
                    name: newName,
                }
            };
        }

        case "DELETE_PROJECT": {
            const {id} = action.payload;
            if (!projects[id]) return projects;

            const { [id]: _, ...rest } = projects;
            return rest;
        }

        case "CREATE_TASK": {
            const {id} = action.payload;
            const newTask = taskTemplate();

            return {
                ...projects,
                [id]: {
                    ...projects[id],
                    tasks: {
                        ...projects[id].tasks,
                        [newTask.id]: newTask,
                    },
                }
            };
        }

        case "EDIT_TASK":
            return;

        case "DELETE_TASK":
            return;

        default:
            console.error("Unknown action type: ", action.type);
            return projects;
    }
}

export function ProjectContext({children}) {
    const [projects, dispatch] = useReducer(projectReducer, {});
    return (
        <ProjectProvider value={{projects, dispatch}}>
            {children}
        </ProjectProvider>
    )
}

export function useProject() {
    const context = useContext(ProjectProvider);
    if (!context) throw new Error("useProject must be used within a ProjectContext");
    return context;
}