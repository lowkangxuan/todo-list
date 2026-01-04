export function Heading({as, className, children}) {
    const Tag = as || "h1";
    const baseStyle = {
        h1: "text-4xl font-bold",
        h2: "text-2xl font-semibold",
        h3: "text-xl",
    }

    return (
        <Tag className={`${baseStyle[as]} ${className}`}>
            {children}
        </Tag>
    )
}