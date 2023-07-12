import { classNames } from "shared/lib/classNames/classNames"

export function ArrowDownIcon({ className }: { className?: string }) {
    return (
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            className={classNames("", {}, [className])}
        >
            <path
                d="M1 1L14 14M14 14V1.52M14 14H1.52"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
