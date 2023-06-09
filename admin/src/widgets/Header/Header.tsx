import { AuthComponent } from "features/authByGoogle"
import styles from "./Header.module.scss"
import { useLocation } from "react-router-dom"
import { routes } from "shared/config/routes"
import { ToFronBtn } from "shared/ui/ToFronBtn/ToFronBtn"

export function Header() {
    const { pathname } = useLocation()

    const { name: section, Svg: SvgComponent } = routes.filter(item => pathname === item.path)[0]

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.sectionContainer}>
                    {SvgComponent && <SvgComponent className={styles.icon} />}
                    <h3 className={styles.section}>{section}</h3>
                </div>
                <div className={styles.btnsContainer}>
                    <ToFronBtn />
                    <AuthComponent />
                </div>
            </div>
        </div>
    )
}
