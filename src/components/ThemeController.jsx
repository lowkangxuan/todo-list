import {Moon, Sun} from "lucide-react";

export function ThemeController() {
    return (
        <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="black" />

            {/* sun icon */}
            <Sun className="swap-off" />

            {/* moon icon */}
            <Moon className="swap-on" />
        </label>
    )
}