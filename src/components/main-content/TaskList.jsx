export function TaskList({children}) {
    return (
        <div className="flex flex-col flex-1 divide-y-2 divide-base-300 min-h-0 overflow-auto">
            {children}
        </div>
    )
}