import styles from "./TriggerRefetchBtn.module.scss"

export function TriggerRefetchBtn({ triggerRefetch }: { triggerRefetch: () => void }) {
    return (
        <button className={styles.btn} onClick={triggerRefetch}>
            Refresh content ↻
        </button>
    )
}
