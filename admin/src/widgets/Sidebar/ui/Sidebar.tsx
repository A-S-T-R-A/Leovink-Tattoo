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
                {!!user && <Link to="/steps">Steps</Link>}
                {!!user && <Link to="/services">Services</Link>}
                {!!user && <Link to="/review">Review</Link>}
                {!!user && <Link to="/artist">Artist</Link>}
            </div>
        </div>
    )
}
