export function LineIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
            className={className}
        >
            <g
                strokeWidth="12"
                stroke="rgb(49, 49, 49)"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeDasharray="30 50"
                transform="matrix(-0.7071067811865475,0.7071067811865476,-0.7071067811865476,-0.7071067811865475,964.685424949238,399.99999999999994)"
            >
                <path
                    d="M127.5 127.5Q380.5 332.5 672.5 672.5 "
                    markerEnd="url(#SvgjsMarker3083)"
                ></path>
            </g>
            <defs>
                <marker
                    markerWidth="1"
                    markerHeight="1"
                    refX="0.5"
                    refY="0.5"
                    viewBox="0 0 1 1"
                    orient="auto"
                    id="SvgjsMarker3083"
                >
                    <polygon points="0.2,1 0,0.5 0.2,0 1,0.5" fill="rgb(49, 49, 49)"></polygon>
                </marker>
            </defs>
        </svg>
    )
}
