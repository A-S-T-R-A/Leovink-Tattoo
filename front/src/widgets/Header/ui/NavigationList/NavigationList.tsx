import { classNames } from "shared/lib/classNames/classNames"
import { menuData } from "../../const/data"
import styles from "./NavigationList.module.css"
import { AppLink } from "shared/ui/AppLink/AppLink"
import type { NavlistType } from "shared/const/firebaseVariables"

export function NavigationList(props: {
    closeClickHandler?: () => void
    className?: string
    data: NavlistType
}) {
    const { closeClickHandler, className, data } = props

    return (
        <ul className={classNames(styles.list, {}, [className])}>
            {data?.map(item => {
                return (
                    <li className={styles.item} onClick={closeClickHandler}>
                        <AppLink to={item.link} className={styles.undreline}>
                            {item.text}
                        </AppLink>
                    </li>
                )
            })}
        </ul>
    )
}
