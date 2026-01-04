import {Sidebar} from "./Sidebar/Sidebar.jsx";
import {Main} from "./Main.jsx";

export function Layout() {
    return (
        <div className="grid h-full" style={{gridTemplateColumns: "auto 10fr"}}>
            <Sidebar />
            <Main />
        </div>
    )
}