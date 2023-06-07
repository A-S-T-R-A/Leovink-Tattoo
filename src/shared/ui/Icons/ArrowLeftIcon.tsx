import { classNames } from "shared/lib/classNames/classNames"

export function ArrowLeftIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classNames("", {}, [className])}
        >
            <path
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
        </svg>
    )
}
