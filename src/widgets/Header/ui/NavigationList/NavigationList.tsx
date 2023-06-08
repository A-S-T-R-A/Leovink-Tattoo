import { classNames } from "../../../../shared/lib/classNames/classNames"
import { menuData } from "../../const/data"
import styles from "./NavigationList.module.css"
import { AppLink } from "../../../../shared/ui/AppLink/AppLink"

export function NavigationList(props: { closeClickHandler?: () => void; className?: string }) {
    const { closeClickHandler, className } = props

    return (
        <ul className={classNames(styles.list, {}, [className])}>
            {menuData.map(item => {
                return (
                    <li className={styles.item} key={item.id} onClick={closeClickHandler}>
                        <AppLink to={item.link} className={styles.undreline}>
                            {item.text}
                        </AppLink>
                    </li>
                )
            })}
        </ul>
    )
}
