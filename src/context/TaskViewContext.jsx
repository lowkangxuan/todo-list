import {createContext, useContext} from "react";
import {useProject} from "./ProjectContext.jsx";
import {isThisWeek, isToday, isTomorrow, parseISO} from "date-fns";

const TaskViewProvider = createContext(null);

function getAllTasks(projects) {
    return Object.values(projects).flatMap(project =>
        Object.values(project.tasks)
    );
}

function getTodayTasks(allTasks) {
    return allTasks.filter(task => {
        return task.dueDate && isToday(parseISO(task.dueDate));
    })
}

function getTomorrowTasks(allTasks) {
    return allTasks.filter(task => {
        return task.dueDate && isTomorrow(parseISO(task.dueDate));
    })
}

// Does not include Today and Tomorrow
function getThisWeekTasks(allTasks) {
    return allTasks.filter(task => {
        return (
            task.dueDate &&
            !isToday(parseISO(task.dueDate)) &&
            !isTomorrow(parseISO(task.dueDate)) &&
            isThisWeek(parseISO(task.dueDate), { weekStartsOn: 1 })
        );
    })
}

export function TaskViewContext({children}) {
    const {projects} = useProject();
    const allTasks = getAllTasks(projects);
    const todayTasks = getTodayTasks(allTasks);
    const tomorrowTasks = getTomorrowTasks(allTasks);
    const thisWeekTasks = getThisWeekTasks(allTasks);
    const upcomingCount = todayTasks.length + tomorrowTasks.length + thisWeekTasks.length;

    return (
        <TaskViewProvider value={{
            tasks: {
                today: todayTasks,
                tomorrow: tomorrowTasks,
                week: thisWeekTasks,
            },
            count: {
                today: todayTasks.length,
                tomorrow: tomorrowTasks.length,
                week: thisWeekTasks.length,
                upcoming: upcomingCount,
            }
        }}>
            {children}
        </TaskViewProvider>
    )
}

export function useTaskView() {
    const context = useContext(TaskViewProvider);
    if (!context) throw new Error("useTaskView must be used as a TaskViewProvider");
    return context;
}