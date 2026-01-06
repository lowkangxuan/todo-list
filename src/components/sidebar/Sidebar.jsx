import {Heading} from "../Heading.jsx";
import {GeneralSection} from "./GeneralSection.jsx";
import {ProjectSection} from "./ProjectSection.jsx";
import {ThemeController} from "../ThemeController.jsx";

export function Sidebar() {
    return (
        <div className="flex flex-col gap-4 h-full p-5 bg-base-200 rounded-box">
            <div className="flex justify-between items-center">
                <Heading as="h2">Menu</Heading>
                <ThemeController />
            </div>
            <GeneralSection />
            <ProjectSection />
        </div>
    )
}