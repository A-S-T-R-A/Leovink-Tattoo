export function TriggerRefetchBtn({ triggerRefetch }: { triggerRefetch: () => void }) {
    return (
        <button
            style={{
                marginLeft: "85%",
                marginRight: "5px",
                lineHeight: "18px",
                color: "red",
                minWidth: "fit-content",
            }}
            onClick={triggerRefetch}
        >
            Refresh ↻
        </button>
    )
}
