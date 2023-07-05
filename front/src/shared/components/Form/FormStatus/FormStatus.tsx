import styles from "./FormStatus.module.scss"
import { ReactNode } from "react"

export function FormStatus({ icon, text }: { icon: ReactNode; text: string }) {
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>{icon}</div>
            <div className={styles.contentContainer}>{text}</div>
        </div>
    )
}
