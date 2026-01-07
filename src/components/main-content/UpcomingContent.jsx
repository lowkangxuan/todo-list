import {ContentHeading} from "./ContentHeading.jsx";
import {useTaskView} from "../../context/TaskViewContext.jsx";
import {WeeklyContentBox} from "./WeeklyContentBox.jsx";

export function UpcomingContent() {
    const {tasks, count} = useTaskView();
    const todayTasks = tasks.today;
    const tomorrowTasks = tasks.tomorrow;
    const weekTasks = tasks.week;
    console.log (todayTasks);

    return (
        <div className="flex flex-col min-h-0">
            <ContentHeading count={count.upcoming}>Upcoming</ContentHeading>
            <div className="grid grid-rows-[1fr_1fr] grid-cols-[1fr_1fr] gap-4 flex-1 min-h-0">
                <WeeklyContentBox className="col-span-2" tasks={todayTasks}>Today</WeeklyContentBox>
                <WeeklyContentBox tasks={tomorrowTasks}>Tomorrow</WeeklyContentBox>
                <WeeklyContentBox tasks={weekTasks}>This Week</WeeklyContentBox>
            </div>
        </div>
    )
}