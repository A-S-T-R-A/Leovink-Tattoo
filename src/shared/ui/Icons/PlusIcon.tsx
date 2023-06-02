import { classNames } from "shared/lib/classNames/classNames"

export function PlusIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className={classNames("", {}, [className])}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    )
}
