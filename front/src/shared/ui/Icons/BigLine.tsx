export function BigLine({ className }: { className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
            className={className}
        >
            <g
                strokeWidth="12"
                stroke="gray"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeDasharray="30 50"
                transform="rotate(135, 400, 400)"
            >
                <path d="M66 66Q639 199 734 734 " markerEnd="url(#SvgjsMarker1666)"></path>
            </g>
            <defs>
                <marker
                    markerWidth="1"
                    markerHeight="1"
                    refX="0.5"
                    refY="0.5"
                    viewBox="0 0 1 1"
                    orient="auto"
                    id="SvgjsMarker1666"
                >
                    <polygon
                        points="0,1 0.3333333333333333,0.5 0,0 1,0.5"
                        fill="rgb(49, 49, 49)"
                    ></polygon>
                </marker>
            </defs>
        </svg>
    )
}
