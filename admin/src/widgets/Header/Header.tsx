import { AuthComponent2 } from "features/authByGoogle"
import styles from "./Header.module.scss"
import { useLocation } from "react-router-dom"
import { routes } from "shared/config/routes"
import { PortfolioIcon } from "shared/assets/icons"

export function Header() {
    const { pathname } = useLocation()

    const section = routes.filter(item => pathname === item.path)[0].name

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.portfolioContainer}>
                    <PortfolioIcon className={styles.portfolioIcon} />
                    <h3>{section}</h3>
                </div>
                <div className={styles.sliderContainer}>
                    <AuthComponent2 />
                </div>
            </div>
        </div>
    )
}
