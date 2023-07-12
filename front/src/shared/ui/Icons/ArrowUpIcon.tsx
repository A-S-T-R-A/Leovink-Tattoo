import { classNames } from "../../lib/classNames/classNames"
export function ArrowUpIcon({ className }: { className?: string }) {
    return (
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classNames("", {}, [className])}
        >
            <path
                d="M1 14L14 1M14 1V13.48M14 1H1.52"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
