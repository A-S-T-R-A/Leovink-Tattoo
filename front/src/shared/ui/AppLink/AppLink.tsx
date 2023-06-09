import type { ComponentChildren } from "preact"
import type { HTMLAttributes } from "preact/compat"
import { classNames } from "../../lib/classNames/classNames"
import styles from "./AppLink.module.scss"

interface AppLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    children: ComponentChildren
    to: string
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
