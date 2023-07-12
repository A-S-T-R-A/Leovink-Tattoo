import styles from "./FormStatus.module.scss"

export function FormStatus({ icon, text }: { icon: any; text: string }) {
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>{icon}</div>
            <div className={styles.contentContainer}>{text}</div>
        </div>
    )
}
