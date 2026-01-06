import {Sidebar} from "./sidebar/Sidebar.jsx";
import {MainContent} from "./main-content/MainContent.jsx";
import {createContext, useState} from "react";
import {TabContext} from "../context/TabContext.jsx";
import {ProjectContext} from "../context/ProjectContext.jsx";
import {TaskViewContext} from "../context/TaskViewContext.jsx";

export function Layout() {
    return (
        <div className="grid h-full flex-1 gap-8 grid-cols-[auto_10fr]">
            <TabContext>
                <ProjectContext>
                    <TaskViewContext>
                        <Sidebar/>
                        <MainContent />
                    </TaskViewContext>
                </ProjectContext>
            </TabContext>
        </div>
    )
}