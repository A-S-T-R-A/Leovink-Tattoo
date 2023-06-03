import { AppLink } from "shared/ui/AppLink/AppLink"
import { ChevronDownIcon } from "shared/ui/Icons"
import styles from "./ShowMoreLink.module.scss"
import { classNames } from "shared/lib/classNames/classNames"

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
