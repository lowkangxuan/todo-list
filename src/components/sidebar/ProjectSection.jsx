import {SectionTab} from "./SectionTab.jsx";
import {ChevronsRight, Plus} from "lucide-react";
import {SectionList} from "./SectionList.jsx";
import {useProject} from "../../context/ProjectContext.jsx";

export function ProjectSection() {
    const {projects, dispatch} = useProject();

    function handleCreateProject() {
        dispatch({
            type: "CREATE_PROJECT",
        })
    }

    return (
        <SectionList title="Projects">
            {Object.entries(projects).map((project) => {
                const id = project[0];
                const data = project[1];
                const numOfTasks = Object.values(data.tasks).length;

                return (
                    <li key={id}>
                        <SectionTab id={id} icon={<ChevronsRight size="20"/>} count={numOfTasks}>
                            {data.name}
                        </SectionTab>
                    </li>
                )
            })}
            <li>
                <SectionTab icon={<Plus size="20"/>} onClick={handleCreateProject}>Add New Project</SectionTab>
            </li>
        </SectionList>
    )
}