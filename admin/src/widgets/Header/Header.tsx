import { AuthComponent } from "features/authByGoogle"
import styles from "./Header.module.scss"
import { useLocation } from "react-router-dom"
import { routes } from "shared/config/routes"

export function Header() {
    const { pathname } = useLocation()

    const section = routes.filter(item => pathname === item.path)[0].name

    return (
        <div className={styles.wrapper}>
            <h3>{section}</h3>
            <AuthComponent />
        </div>
    )
}
