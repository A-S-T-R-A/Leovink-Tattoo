import styles from "./Sidebar.module.scss"
import { Link } from "react-router-dom"

export function Sidebar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link to="/">Home</Link>
                <Link to="/portfolio">Portfolio</Link>
            </div>
        </div>
    )
}
