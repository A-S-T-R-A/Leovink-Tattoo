import { useAuth } from "features/authByGoogle"
import styles from "./Sidebar.module.scss"
import { Link } from "react-router-dom"

export function Sidebar() {
    const user = useAuth()
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link to="/">Home</Link>
                {!!user && <Link to="/portfolio">Portfolio</Link>}
            </div>
        </div>
    )
}
