import { AuthComponent } from "features/authByGoogle"
import styles from "./Header.module.scss"

export function Header() {
    return (
        <div className={styles.wrapper}>
            <h3>Page Title</h3>
            <AuthComponent />
        </div>
    )
}
