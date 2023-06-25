import { useUserRole } from "features/authByGoogle"
import styles from "./Sidebar.module.scss"
import { Link } from "react-router-dom"

export function Sidebar() {
    const user = useUserRole()
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link to="/">Home</Link>
                {user !== "none" && <Link to="/portfolio">Portfolio</Link>}
                {user !== "none" && <Link to="/steps">Steps</Link>}
                {user !== "none" && <Link to="/services">Services</Link>}
                {user !== "none" && <Link to="/reviews">Reviews</Link>}
                {user !== "none" && <Link to="/artists">Artists</Link>}
                {user !== "none" && <Link to="/faq">FAQ</Link>}
                {user === "dev" && <Link to="/contacts">Contacts</Link>}
                {user === "dev" && <Link to="/other">Other</Link>}
            </div>
        </div>
    )
}
