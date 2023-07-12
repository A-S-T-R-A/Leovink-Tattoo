import { classNames } from "shared/lib/classNames/classNames"
import styles from "./NavigationList.module.css"
import { AppLink } from "shared/ui/AppLink/AppLink"
import { reformatAndSortObjectValuesToArray } from "shared/const/firebaseVariables"

export function NavigationList(props: {
    closeClickHandler?: () => void
    className?: string
    data: { [key: number]: { link: string; text: string } }
}) {
    const { closeClickHandler, className, data } = props

    const arrayData = reformatAndSortObjectValuesToArray(data)

    return (
        <ul className={classNames(styles.list, {}, [className])}>
            {arrayData.map(item => {
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
