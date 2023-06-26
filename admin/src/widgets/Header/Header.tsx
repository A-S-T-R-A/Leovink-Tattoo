import { AuthComponent } from "features/authByGoogle"
import styles from "./Header.module.scss"

export function Header({ section }: { section: string }) {
    return (
        <div className={styles.wrapper}>
            <h3>{section}</h3>
            <AuthComponent />
        </div>
    )
}
