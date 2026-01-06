import {Heading} from "../Heading.jsx";

export function ContentHeading({count=0, children}) {
    return (
        <Heading as="h1" className="mb-8">
            {children}
            <sup className="ml-1 text-sm -top-[1rem] text-base-content/50">({count})</sup>
        </Heading>
    )
}