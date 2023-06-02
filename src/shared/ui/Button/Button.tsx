import { ReactNode } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Button.module.scss"

interface ButtonProps {
    className?: string
    children: ReactNode
}

export function Button(props: ButtonProps) {
    const { children, className } = props

    return <button className={classNames(styles.btn, {}, [className])}>{children}</button>
}
