import { ReactNode } from "react"
import { Link, LinkProps } from "react-router-dom"
import { classNames } from "shared/lib/classNames/classNames"

interface AppLinkProps extends LinkProps {
    children: ReactNode
    className?: string
}

export function AppLink(props: AppLinkProps) {
    const { to, children, className, ...otherProps } = props
    return (
        <Link to={to} className={classNames(styles.link, {}, [className])} {...otherProps}>
            {children}
        </Link>
    )
}
