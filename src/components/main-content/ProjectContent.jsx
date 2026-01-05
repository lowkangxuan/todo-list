import {useSetActiveTab} from "../../context/TabContext.jsx";
import {useProject} from "../../context/ProjectContext.jsx";
import {ContentHeading} from "./ContentHeading.jsx";
import {Pencil, Plus, Save, Trash} from "lucide-react";
import {useEffect, useState} from "react";

export function ProjectContent({id}) {
    const setActiveTab = useSetActiveTab();
    const {projects, dispatch} = useProject();
    const currProject = projects[id];
    const numOfTasks = Object.entries(currProject.tasks).length;

    const [isEditing, setIsEditing] = useState(false);
    const [nameDraft, setNameDraft] = useState(currProject.name);

    useEffect(() => {
        if (!currProject) return;

        setIsEditing(false);
        setNameDraft(currProject.name);
        console.log("test");
    }, [id, currProject]);

    function enterEditMode() {
        setIsEditing(true);
    }

    function saveDraft() {
        console.log(nameDraft);
        dispatch({
            type: "EDIT_PROJECT",
            payload: {
                id: id,
                newName: nameDraft,
            }
        })
        setIsEditing(false);
    }

    function handleDraftInput(e) {
        setNameDraft(e.target.value);
    }

    function handleDelete() {
        dispatch({
            type: "DELETE_PROJECT",
            payload: {id},
        })
        setActiveTab("today");
    }

    function handleTaskCreation() {
        dispatch({
            type: "CREATE_TASK",
            payload: {
                id: id,
            }
        })
    }

    return (
        <div>
            <div className="flex">
                {isEditing
                ? <input type="text" placeholder="Type new name" className="input" value={nameDraft} onChange={handleDraftInput} />
                : <ContentHeading count={numOfTasks}>{currProject.name}</ContentHeading>}
                <div className="flex gap-2 ml-auto">
                    {isEditing
                    ? <button className="btn btn-success" onClick={saveDraft}>
                            <Save size={20} />Save
                        </button>
                    : <button className="btn" onClick={enterEditMode}>
                            <Pencil size={20} />Edit Name
                      </button>
                    }
                    <button className="btn btn-error" onClick={handleDelete}>
                        <Trash size={20} /> Delete
                    </button>
                </div>
            </div>

            <div className="flex flex-col mt-8">
                <button className="btn btn-neutral btn-outline justify-start" onClick={handleTaskCreation}><Plus /> Add New Task</button>
                {numOfTasks === 0
                ? "No tasks were found!"
                    : Object.values(currProject.tasks).map((task) => (
                        <div key={task.id}>{task.name}</div>
                    ))}
            </div>
        </div>
    )
}