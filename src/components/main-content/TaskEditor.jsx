import {Heading} from "../Heading.jsx";
import {X} from "lucide-react";
import {addDays, format} from "date-fns";
import {useEffect, useState} from "react";

export function TaskEditor({taskData, onCloseEditor, onDelete, onSave}) {
    const [draft, setDraft] = useState({
        name: "",
        description: "",
        dueDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    });

    useEffect(() => {
        if (!taskData) return;
        setDraft(taskData);
    }, [taskData]);

    function handleInputChange(e) {
        const {id, value} = e.target;
        setDraft((prev) => ({
            ...prev,
            [id]: value
        }));
    }

    return (
        <div className="flex flex-col p-5 gap-4 bg-base-200 w-md h-full rounded-box">
            <div className="flex justify-between items-center">
                <Heading as="h2">Task:</Heading>
                <button className="btn p-0" onClick={onCloseEditor}><X /></button>
            </div>

            <input type="text" id="name" placeholder="Task Name" value={draft.name} className="input w-auto" onChange={handleInputChange} />

            <textarea id="description" className="textarea resize-none w-auto h-1/5" placeholder="Task Description" value={draft.description} onChange={handleInputChange} />

            <label className="input w-auto">
                <span className="label">Due Date</span>
                <input type="date" id="dueDate" min={format(new Date(), "yyyy-MM-dd")} value={draft.dueDate} onChange={handleInputChange} />
            </label>

            <div className="flex justify-around ">
                <button className="btn btn-error" onClick={onDelete}>Delete Task</button>
                <button className="btn btn-info" onClick={() => onSave(draft)}>Save Changes</button>
            </div>
        </div>
    )
}