import {Heading} from "../Heading.jsx";
import {Menu} from "lucide-react";
import {GeneralSection} from "./GeneralSection.jsx";
import {ProjectSection} from "./ProjectSection.jsx";

export function Sidebar() {
    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex justify-between items-center">
                <Heading as="h2">Menu</Heading>
                <Menu />
            </div>
            <GeneralSection />
            <ProjectSection />
        </div>
    )
}