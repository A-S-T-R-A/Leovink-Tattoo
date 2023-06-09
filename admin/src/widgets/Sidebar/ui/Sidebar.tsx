import { useUserRole } from "features/authByGoogle"
import styles from "./Sidebar.module.scss"
import { Link, useLocation } from "react-router-dom"
import { classNames } from "shared/lib/classNames/classNames"
import { routes } from "shared/config/routes"

export function Sidebar() {
    const user = useUserRole()
    const { pathname } = useLocation()

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {routes.map((item, index) => {
                    const { Svg } = item
                    if (item.private && user === "none") return null
                    if (item.allowedRoles && !item.allowedRoles?.includes(user)) return null

                    return (
                        <div key={index} className={styles.linkBlock}>
                            <Link
                                className={classNames(styles.link, {
                                    [styles.currentLink]: pathname === item.path,
                                })}
                                to={item.path}
                            >
                                <Svg className={styles.svg} />
                                {item.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
