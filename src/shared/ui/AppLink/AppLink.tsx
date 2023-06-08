//import { Link, LinkProps } from "react-router-dom"
import { classNames } from "../../lib/classNames/classNames"
import styles from "./AppLink.module.scss"

interface AppLinkProps {
    children: any
    to?: any
    className?: string
}

export function AppLink(props: AppLinkProps) {
    const { to, children, className, ...otherProps } = props
    return (
        <a href={to} className={classNames(styles.link, {}, [className])} {...otherProps}>
            {children}
        </a>
    )
}
