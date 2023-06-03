import { classNames } from "shared/lib/classNames/classNames"
import { menuData } from "../../const/data"
import styles from "./NavigationList.module.css"

export function NavigationList(props: { closeClickHandler?: () => void; className?: string }) {
    const { closeClickHandler, className } = props

    return (
        <ul className={classNames(styles.list, {}, [className])}>
            {menuData.map(item => {
                return (
                    <li className={styles.item} key={item.id} onClick={closeClickHandler}>
                        <a href={item.link} className={styles.undreline}>
                            {item.text}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}
