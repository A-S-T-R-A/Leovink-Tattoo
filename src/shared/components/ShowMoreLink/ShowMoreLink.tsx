import { AppLink } from "../../ui/AppLink/AppLink"
import { ChevronDownIcon } from "../../ui/Icons"
import styles from "./ShowMoreLink.module.scss"
import { classNames } from "../../lib/classNames/classNames"

export function ShowMoreLink({
    to,
    text,
    className,
}: {
    to: string
    text: string
    className?: string
}) {
    return (
        <AppLink to={to} className={classNames(styles.container, {}, [className])}>
            {text}
            <ChevronDownIcon className={styles.icon} />
        </AppLink>
    )
}
