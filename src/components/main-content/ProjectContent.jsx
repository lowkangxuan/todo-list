import {useSetActiveTab} from "../../context/TabContext.jsx";
import {useProject} from "../../context/ProjectContext.jsx";
import {ContentHeading} from "./ContentHeading.jsx";
import {Pencil, Plus, Save, Trash, X} from "lucide-react";
import {useEffect, useState} from "react";
import {TaskEditor} from "./TaskEditor.jsx";
import {TaskButton} from "./TaskButton.jsx";
import {TaskList} from "./TaskList.jsx";

export function ProjectContent({id}) {
    const setActiveTab = useSetActiveTab();
    const {projects, dispatch} = useProject();

    const currProject = projects[id];
    const numOfTasks = Object.entries(currProject.tasks).length;

    const [isEditingProject, setIsEditingProject] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [nameDraft, setNameDraft] = useState(currProject.name);

    const taskData = currProject?.tasks?.[editingTaskId] ?? null;
    const isOpen = !!taskData;

    useEffect(() => {
        if (!currProject) return;

        setIsEditingProject(false);
        setEditingTaskId(null);
        setNameDraft(currProject.name);
    }, [id, currProject.name]);

    function enterEditMode() {
        setIsEditingProject(true);
    }

    function startTaskEdit(taskID) {
        setEditingTaskId(taskID);
    }

    function endTaskEdit() {
        setEditingTaskId(null);
    }

    function saveDraft() {
        dispatch({
            type: "EDIT_PROJECT",
            payload: {
                projectID: id,
                newName: nameDraft,
            }
        })
        setIsEditingProject(false);
    }

    function handleDraftInput(e) {
        setNameDraft(e.target.value);
    }

    function handleDelete() {
        dispatch({
            type: "DELETE_PROJECT",
            payload: {
                projectID: id
            },
        })
        setActiveTab("today");
    }

    function handleTaskCreation() {
        dispatch({
            type: "CREATE_TASK",
            payload: {
                projectID: id,
            }
        })
    }

    function handleTaskCompletion(e, taskID) {
        dispatch({
            type: "COMPLETE_TASK",
            payload: {
                projectID: id,
                taskID: taskID,
                markCompleted: e.target.checked,
            }
        })
    }

    function handleTaskSave(draft) {
        dispatch({
            type: "SAVE_TASK",
            payload: {
                projectID: id,
                taskID: editingTaskId,
                draft: draft,
            }
        })
    }

    function handleTaskDelete() {
        dispatch({
            type: "DELETE_TASK",
            payload: {
                projectID: id,
                taskID: editingTaskId,
            }
        })
        setEditingTaskId(null);
    }

    return (
        <div className="flex gap-4 min-h-0">
            <div className="flex flex-col flex-1 min-h-0">
                <div className="flex">
                    {isEditingProject
                        ? <input type="text" placeholder="Type new name" className="input" value={nameDraft}
                                 onChange={handleDraftInput}/>
                        : <ContentHeading count={numOfTasks}>{currProject.name}</ContentHeading>}
                    <div className="flex gap-2 ml-auto">
                        {isEditingProject
                            ? <button className="btn btn-success" onClick={saveDraft}>
                                <Save size={20}/>Save
                            </button>
                            : <button className="btn" onClick={enterEditMode}>
                                <Pencil size={20}/>Edit Name
                            </button>
                        }
                        <button className="btn btn-error" onClick={handleDelete}>
                            <Trash size={20}/> Delete
                        </button>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-2 min-h-0">
                    <button className="btn justify-start py-6" onClick={handleTaskCreation}><Plus/> Add
                        New Task
                    </button>
                    <TaskList>
                        {numOfTasks === 0
                            ? <div className="flex-1 text-center content-center text-2xl font-semibold text-base-content/40">You have currently no tasks for this project</div>
                            : Object.values(currProject.tasks).map((task) => (
                                <TaskButton key={task.id}
                                            data={task}
                                            projectID={id}
                                            projectName={currProject.name}
                                            onClick={() => startTaskEdit(task.id)}
                                >
                                    {task.name}
                                </TaskButton>
                            ))}
                    </TaskList>
                </div>
            </div>

            <aside
                className={`
                  overflow-hidden
                  transition-all duration-300 ease-in-out
                  ${isOpen ? "max-w-md opacity-100" : "max-w-0 opacity-0 pointer-events-none"}
                `}
            >
                <TaskEditor taskData={taskData} onCloseEditor={endTaskEdit} onDelete={handleTaskDelete} onSave={handleTaskSave} />
            </aside>
        </div>

    )
}